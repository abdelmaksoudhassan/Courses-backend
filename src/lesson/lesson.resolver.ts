import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';
import { CurrentUser } from 'src/user/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/user/auth/decorators/roles.decorator';
import { role_title } from 'src/user/auth/role.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/user/auth/guards/role.guard';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { PubSub } from 'graphql-subscriptions';

const pubSup = new PubSub()
@Resolver()
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(returns=> Lesson)
  lesson(@Args('id') id: string){
    return this.lessonService.getLesson(id)
  }

  @Mutation(returns=>Lesson,{ name: "NewLesson" })
  @Roles(role_title.instructor)
  @UseGuards(JwtAuthGuard,RoleGuard)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
    @Args('courseId') courseId: string,
    @Args('mediaId') mediaId: string,
    @CurrentUser() user: User
  ){
    const createdLesson = this.lessonService.createLesson(createLessonInput,mediaId,courseId,user)
    pubSup.publish('LessonCreated', { lessonAdded: createdLesson })
    return createdLesson
  }

  @Mutation(returns=>Lesson,{ name: "DeleteLesson" })
  @Roles(role_title.instructor)
  @UseGuards(JwtAuthGuard,RoleGuard)
  deleteLesson(
    @Args('id') id: string,
    @CurrentUser() user: User
  ){
    return this.lessonService.deleteLesson(id,user)
  }

  @Mutation(returns=>Lesson,{ name: "UpdateLesson" })
  @Roles(role_title.instructor)
  @UseGuards(JwtAuthGuard,RoleGuard)
  updateLesson(
    @Args('id') id: string,
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
    @CurrentUser() user: User
  ){
    return this.lessonService.updateLesson(id,user,updateLessonInput)
  }

  @Subscription(returns=>Lesson)
  lessonAdded(){
    return pubSup.asyncIterator('LessonCreated')
  }
}