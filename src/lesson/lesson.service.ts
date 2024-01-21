import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from './dto/create-lesson.input';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Media } from 'src/media/entities/media.entity';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
        @InjectRepository(Media) private readonly mediaRepository: Repository<Media>
    ){}

    async getLesson(id: string): Promise<Lesson>{
        const lesson = await this.lessonRepository.findOne({where:{id},relations: { course: true }})
        if(! lesson){
            throw new NotFoundException(`lesson with id ${id} not found`)
        }
        return lesson
    }

    async createLesson(createLessonInput: CreateLessonInput,mediaId: string,courseId: string, user: User){
        const { title } = createLessonInput
        const course = await this.courseRepository.findOne({where:{id: courseId,user: user}})
        if(! course){
            throw new NotFoundException(`course with id ${courseId} not found`)
        }
        const media = await this.mediaRepository.findOne({where:{id: mediaId}})
        if(! media){
            throw new NotFoundException(`course with id ${mediaId} not found`)
        }
        const lesson = this.lessonRepository.create({ title, course, media })
        return this.lessonRepository.save(lesson)
    }

    async deleteLesson(id: string,user: User): Promise<string>{
        const lesson = await this.lessonRepository.findOne({where: {id}, relations:{ course:{user:true},media: true }})
        if(! lesson){
            throw new NotFoundException(`lesson with id ${id} not found`)
        }
        if(lesson.course.user.id != user.id){
            throw new UnauthorizedException('this lesson not belongs to you')
        }
        await this.mediaRepository.remove(lesson.media)
        return 'lesson deleted'
    }

    async updateLesson(id: string,user: User,updateLessonInput: UpdateLessonInput): Promise<Lesson>{
        const lesson = await this.lessonRepository.findOne({where: {id}, relations:{ course:{user:true} }})
        if(! lesson){
            throw new NotFoundException(`lesson with id ${id} not found`)
        }
        if(lesson.course.user.id != user.id){
            throw new UnauthorizedException('this lesson not belongs to you')
        }
        const { title } = updateLessonInput
        lesson.title = title
        return this.lessonRepository.save(lesson)
    }
}