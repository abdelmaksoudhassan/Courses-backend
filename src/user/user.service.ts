import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';
import { LoginUserInput } from './dto/login-user.input';
import  * as jwt from 'jsonwebtoken'
import { Payload } from './auth/payload';
import { AuthUser } from './auth/auth-user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        @InjectRepository(Role) private readonly roleRepository:Repository<Role>
    ){}

    async createNewUser(createUserInput: CreateUserInput): Promise<User>{
        const {email,password,role} = createUserInput
        const _role = await this.roleRepository.findOne({where:{id: role}})
        if(! _role){
            throw new NotFoundException(`role with id ${role} not found`)
        }
        const user = await this.userRepository.findOneBy({email: email.toLowerCase()})
        if(user){
            throw new ForbiddenException(`email ${email} registered before`)
        }
        const hashedPassword = await this.hashPassword(password,10)
        const newUser = await this.userRepository.create({ email: email.toLowerCase(),password: hashedPassword,role: _role })
        return this.userRepository.save(newUser)
    }

    async getUser(id: string): Promise<User>{
        const user = await this.userRepository.findOne({where:{id},relations:{role: true}})
        if(! user){
            throw new NotFoundException(`user with id ${id} not found`)
        }
        return user
    }

    async hashPassword(_password, _salt): Promise<string>{
        const salt = await bcrypt.genSalt(_salt)
        const password = await bcrypt.hash(_password,salt)
        return password
    }

    async login(loginUserInput: LoginUserInput): Promise<AuthUser>{
        const { email, password } = loginUserInput
        const user = await this.userRepository.findOne({where: { email: email.toLowerCase() },relations: { role: true }})
        if(! user){
            throw new NotFoundException(`user with email ${email} not found`)
        }
        const equaled = await user.comparePassword(password)
        if(! equaled){
            throw new UnauthorizedException('wrong password')
        }
        const payload = { id: user.id, email: user.email }
        const token = this.generateToken(payload,"this is secret key")
        return { user, token}
    }
    generateToken(payload: Payload, secret: string){
        return jwt.sign(payload, secret)
    }

    async validateUser(payload: Payload): Promise<User>{
        const {id, email} = payload
        const user = await this.userRepository.findOne({where: {id, email},relations:{ role: true }})
        if(! user){
            throw new NotFoundException(`user with id ${id} not found`)
        }
        return user
    }
}