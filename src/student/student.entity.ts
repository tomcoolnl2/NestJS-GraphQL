
import { ObjectIdColumn, PrimaryColumn, Column, Entity } from 'typeorm'


@Entity()
export class Student {
    
    @ObjectIdColumn()
    _id: string // Mongo internal id

    @PrimaryColumn()
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string
}