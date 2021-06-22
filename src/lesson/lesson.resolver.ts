
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { StudentService } from '../student/student.service'
import { Lesson } from './lesson.entity'
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input'
import { LessonService } from './lesson.service'
import { LessonType } from "./lesson.type"

@Resolver((_of: LessonType) => LessonType)
export class LessonResolver {

    constructor(
        private readonly lessonService: LessonService,
        private readonly studentService: StudentService
    ) {}

    @Query(_returns => LessonType)
    lesson(@Args('id') id: string) {
        return this.lessonService.getLesson(id)
    }

    @Query(_returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons()
    }

    @Mutation(_returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ) {
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(_returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') { lessonId, studentIds }: AssignStudentsToLessonInput
    ) {
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
    }

    @ResolveField()
    public async students(@Parent() lesson: Lesson) {
        return await this.studentService.getManyStudents(lesson.students)
    }
}
