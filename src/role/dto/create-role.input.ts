import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateRoleInput {
    @MinLength(4)
    @MaxLength(30)
    @Field()
    title: string
}