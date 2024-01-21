import { Field, ID, ObjectType } from "@nestjs/graphql";
import { join } from "path";
import { deleteFile } from "src/helpers/helpers";
import { BeforeRemove, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Media {
    @PrimaryGeneratedColumn('uuid')
    @Field(type=>ID)
    id: string

    @Column()
    @Field()
    url: string

    @BeforeRemove()
    remove(){
        console.log(join('./src/media/uploads', this.url))
        deleteFile(join('./src/media/uploads', this.url))
    }
}