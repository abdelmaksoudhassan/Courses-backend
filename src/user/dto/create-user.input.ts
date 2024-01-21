import { Field, ID, InputType } from "@nestjs/graphql"
import { IsEmail, IsUUID, MinLength } from "class-validator"

@InputType()
export class CreateUserInput {
    @IsEmail()
    @Field()
    email: string

    @MinLength(10)
    @Field()
    password: string

    @IsUUID()
    @Field(type=>ID)
    role: string
}