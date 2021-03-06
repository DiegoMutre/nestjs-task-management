import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filters.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(private taskRepository: TaskRepository) {}

    async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO);
    }

    async getTasksById(id: string): Promise<Task> {
        // Try to get a task
        const found = await this.taskRepository.findOne(id);

        // If not found, throw an 404 error
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`); // The message is optional
        }
        // otherwise,  return the found task
        return found;
    }

    createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    deleteTaskById(id: string) {
        return this.taskRepository.deleteTaskById(id);
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTasksById(id);

        task.status = status;
        this.taskRepository.save(task);

        return task;
    }
}
