import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Media } from 'src/media/entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Course, Lesson, Media ])],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}