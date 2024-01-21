import { InputType, PickType } from "@nestjs/graphql";
import { CreateLessonInput } from "./create-lesson.input";

@InputType()
export class UpdateLessonInput extends PickType(CreateLessonInput,[
    'title'
] as const){}