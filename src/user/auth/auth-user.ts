import { Field, ObjectType } from "@nestjs/graphql"
import { User } from "../entities/user.entity"

@ObjectType()
export class AuthUser{
    @Field(()=>User)
    user: User
    @Field()
    token: string
}