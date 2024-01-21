import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>){}

    async getRole(id: string): Promise<Role>{
        const role = await this.roleRepository.findOne({where:{id},relations: { users: true }})
        if(! role){
            throw new NotFoundException(`role with id ${id} not found`)
        }
        return role
    }

    async getRoles(): Promise<Role[]>{
        const roles = await this.roleRepository.find()
        return roles
    }

    async createNewRole(createRoleInput: CreateRoleInput): Promise<Role>{
        const {title} = createRoleInput
        const _role = await this.roleRepository.findOne({where:{title}})
        if(_role){
            throw new ForbiddenException(`role with title ${title} already exist`)
        }
        const newRole = await this.roleRepository.create({ title: title.toUpperCase() })
        return this.roleRepository.save(newRole)
    }
}