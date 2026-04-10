import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, isNumber, IsOptional, IsPositive, IsString, Length, Matches, MinLength } from 'class-validator';
import { StartsWith } from '../decorators/starts-with.decorator';

export enum TaskTag {
    WORK = 'work',
    STUDY = 'study',
    HOME = 'home',
}

export class CreateTaskDto {
    @IsString()
    @StartsWith('Task:')
    @IsNotEmpty()
    @Length(3, 40)
    @IsOptional()
    title!: string;

    @IsString({message: 'Description must be a string'})
    @IsOptional()
    description!: string;

    @IsInt( { message: 'Priority must be a number' })
    @IsPositive({ message: 'Priority must be a positive number' })
    @IsOptional()
    priority!: number;

    @IsOptional()
    @IsEnum(TaskTag, { message: 'Each tag must be a string', each: true})
    @IsArray({ message: 'Tags must be an array' })
    tags!: TaskTag[];
}