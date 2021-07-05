import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTaskFilterDTO {
    @IsOptional()
    @IsEnum(TaskStatus, {
        each: false,
    })
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}
