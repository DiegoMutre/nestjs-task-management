import { IsNotEmpty } from 'class-validator';

// Data Transfer Object
export class CreateTaskDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
