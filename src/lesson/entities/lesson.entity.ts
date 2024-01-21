import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Course } from "src/course/entities/course.entity";
import { Media } from "src/media/entities/media.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Lesson {
    @PrimaryGeneratedColumn('uuid')
    @Field(type=>ID)
    id: string

    @Column()
    @Field()
    title: string

    @OneToOne(type=>Media, { onDelete:'CASCADE' })
    @JoinColumn()
    media: Media

    @ManyToOne(type=>Course,course=>course.lessons,{ onDelete: 'CASCADE' })
    @Field(type=>Course)
    course: Course
}