import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Course } from "src/course/entities/course.entity";
@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string

    @Column()
    @Field()
    email: string

    @Column()
    @Field()
    password: string

    @ManyToOne(type=>Role,role=>role.users)
    @Field(type=>Role)
    role: Role

    @OneToMany(type=>Course,course=>course.user)
    @Field(type=>[Course])
    courses: Course[]

    @ManyToMany(type=>Course,course=>course.students)
    @Field(type=>[Course])
    @JoinTable({ name: 'enrollment' })
    enrolls: Course[]

    async comparePassword(password){
        return await bcrypt.compare(password, this.password)
    }
}