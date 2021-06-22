
import { v4 as uuid } from 'uuid'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Student } from './student.entity'
import { CreateStudentInput } from './student.input'


@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) 
        private readonly studentRepository: Repository<Student>
    ) {}

    public async getStudent(id: string): Promise<Student> {
        return await this.studentRepository.findOne({ id }) // curly braces otherwise it will search for mongo's _id
    }

    public async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find()
    }

    public async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {

        const student = this.studentRepository.create({
            id: uuid(),
            ...createStudentInput
        })

        return await this.studentRepository.save(student)
    }

    public async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return await this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds
                }
            }
        })
    }
}
