
import { v4 as uuid } from 'uuid'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lesson } from './lesson.entity'
import { CreateLessonInput } from './lesson.input'


@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson) 
        private readonly lessonRepository: Repository<Lesson>
    ) {}

    public async getLesson(id: string): Promise<Lesson> {
        return await this.lessonRepository.findOne({ id }) // curly braces otherwise it will search for mongo's _id
    }

    public async getLessons(): Promise<Lesson[]> {
        return await this.lessonRepository.find()
    }

    public async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {

        const lesson = this.lessonRepository.create({
            id: uuid(),
            ...createLessonInput
        })

        return await this.lessonRepository.save(lesson)
    }

    public async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.getLesson(lessonId)
        lesson.students = [...lesson.students, ...studentIds]
        return await this.lessonRepository.save(lesson)
    }
}
