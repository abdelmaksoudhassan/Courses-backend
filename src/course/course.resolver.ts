import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { Roles } from 'src/user/auth/decorators/roles.decorator';
import { role_title } from 'src/user/auth/role.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/user/auth/guards/role.guard';
import { CurrentUser } from 'src/user/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UpdateCourseInput } from './dto/update-course.input';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(returns=>Course,{ name: 'GetCourse' })
  course(@Args('id') id: string){
    return this.courseService.getCourse(id)
  }

  @Query(returns=>[Course],{ name: 'GetCourses' })
  courses(){
    return this.courseService.getCourses()
  }

  @Mutation(returns=>Course,{ name: 'NewCourse' })
  @Roles(role_title.instructor)
  @UseGuards(JwtAuthGuard,RoleGuard)
  createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput, @CurrentUser() user: User){
    return this.courseService.createCourse(createCourseInput,user)
  }

  @Mutation(returns=>Course,{ name: "Enroll" })
  @Roles(role_title.student)
  @UseGuards(JwtAuthGuard,RoleGuard)
  enrollCourse(@Args('id') id: string, @CurrentUser() user: User){
    return this.courseService.enrollCourse(user,id)
  }

  @Mutation(returns=>Course,{ name: "DeleteCourse" })
  @Roles(role_title.instructor)
  @UseGuards(JwtAuthGuard,RoleGuard)
  deleteCourse(
    @Args('id') id: string,
    @CurrentUser() user: User
  ){
    return this.courseService.deleteCourse(id,user)
  }

  @Mutation(returns=>Course,{ name: "UpdateCourse" })
  @Roles(role_title.instructor)
  @UseGuards(JwtAuthGuard,RoleGuard)
  updateCourse(
    @Args('id') id: string,
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
    @CurrentUser() user: User
  ){
    return this.courseService.updateCourse(id,user,updateCourseInput)
  }
}
