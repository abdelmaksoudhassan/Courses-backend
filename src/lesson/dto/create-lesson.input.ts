import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateLessonInput {
    @MinLength(5)
    @MaxLength(30)
    @Field()
    title: string
}