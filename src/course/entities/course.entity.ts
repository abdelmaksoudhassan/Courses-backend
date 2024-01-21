import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Lesson } from "src/lesson/entities/lesson.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    @Field(type=>ID)
    id: string

    @Column()
    @Field()
    title: string

    @OneToMany(type=>Lesson,lesson=>lesson.course)
    @Field(type=>[Lesson])
    lessons: Lesson[]

    @ManyToOne(type=>User,user=>user.courses)
    @Field(type=>User)
    user: User

    @ManyToMany(type=>User,user=>user.enrolls)
    @Field(type=>[User])
    students: User[]
}