import { InputType, PickType } from "@nestjs/graphql";
import { CreateCourseInput } from "./create-course.input";

@InputType()
export class UpdateCourseInput extends PickType(CreateCourseInput,[
    'title' as const
]){}