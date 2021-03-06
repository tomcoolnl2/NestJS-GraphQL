
import { Field, ID, InputType } from '@nestjs/graphql'
import { IsDateString, IsUUID, MinLength } from 'class-validator'


@InputType()
export class CreateLessonInput {

    @MinLength(1)
    @Field()
    name: string

    @IsDateString()
    @Field()
    startDate: string

    @IsDateString()
    @Field()
    endDate: string

    @IsUUID('4', { each: true })
    @Field(() => [ID], { defaultValue: [] })
    students: string[]
}

@InputType()
export class AssignStudentsToLessonInput {
    
    @IsUUID()
    @Field(_type => ID)
    lessonId: string

    @IsUUID('4', { each: true })
    @Field(_type => [ID])
    studentIds: string[]
}