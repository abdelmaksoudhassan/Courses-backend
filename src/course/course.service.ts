import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseInput } from './dto/create-course.input';
import { User } from 'src/user/entities/user.entity';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CourseService {
    constructor(@InjectRepository(Course) private readonly courseRepository:Repository<Course>){}

    async getCourse(id: string): Promise<Course>{
        const course = await this.courseRepository.findOne({where:{id},relations: { lessons: true }})
        if(! course){
            throw new NotFoundException(`course with id ${id} not found`)
        }
        return course
    }

    async getCourses(): Promise<Course[]>{
        const courses = await this.courseRepository.find()
        return courses
    }

    async createCourse(createCourseInput: CreateCourseInput, user: User): Promise<Course>{
        const { title } = createCourseInput
        const course = this.courseRepository.create({ title, user })
        return this.courseRepository.save(course)
    }

    async enrollCourse(user: User, id: string): Promise<Course>{
        const course = await this.courseRepository.findOne({where:{ id }, relations:{ students: true }})
        if(! course){
            throw new NotFoundException(`course with id ${id} not found`)
        }
        course.students.push(user)
        this.courseRepository.save(course)
        return course
    }

    async deleteCourse(id: string,user: User): Promise<Course>{
        const course = await this.courseRepository.findOne({where: {id}, relations:{ user:true} })
        if(! course){
            throw new NotFoundException(`course with id ${id} not found`)
        }
        if(course.user.id != user.id){
            throw new UnauthorizedException('this course not belongs to you')
        }
        return await this.courseRepository.remove(course)
    }

    async updateCourse(id: string,user: User,updateCourseInput: UpdateCourseInput): Promise<Course>{
        const course = await this.courseRepository.findOne({where: {id}, relations:{ user:true }})
        if(! course){
            throw new NotFoundException(`course with id ${id} not found`)
        }
        if(course.user.id != user.id){
            throw new UnauthorizedException('this course not belongs to you')
        }
        const { title } = updateCourseInput
        course.title = title
        return this.courseRepository.save(course)
    }
}