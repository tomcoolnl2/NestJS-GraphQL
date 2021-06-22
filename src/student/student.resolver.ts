
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateStudentInput } from './student.input'
import { StudentService } from './student.service'
import { StudentType } from "./student.type"

@Resolver((_of: StudentType) => StudentType)
export class StudentResolver {
    
    constructor(
        private readonly studentService: StudentService
    ) {}

    @Query(_returns => StudentType)
    student(@Args('id') id: string) {
        return this.studentService.getStudent(id)
    }

    @Query(_returns => [StudentType])
    students() {
        return this.studentService.getStudents()
    }

    @Mutation(_returns => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ) {
        return this.studentService.createStudent(createStudentInput)
    }
}