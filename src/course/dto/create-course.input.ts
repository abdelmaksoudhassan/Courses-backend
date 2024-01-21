import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateCourseInput {
    @MinLength(2)
    @MaxLength(30)
    @Field()
    title: string
}