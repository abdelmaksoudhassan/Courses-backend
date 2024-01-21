import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string

    @Column()
    @Field()
    title: string

    @OneToMany(type=>User,user=>user.role)
    @Field(type=>[User])
    users: User[]
}