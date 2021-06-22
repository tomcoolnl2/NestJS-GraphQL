
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm'


@Entity()
export class Lesson {

    @ObjectIdColumn()
    _id: string // Mongo internal id

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    startDate: string

    @Column()
    endDate: string

    @Column()
    students: string[]
}