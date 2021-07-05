import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filters.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(private taskRepository: TaskRepository) {}

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

    // ! Old Code
    // private tasks: Task[] = [];
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    // getTasksWithFilters(filterDTO: GetTaskFilterDTO): Task[] {
    //     const { search, status } = filterDTO;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = this.tasks.filter(task => task.status === status);
    //     }
    //     if (search) {
    //         tasks = this.tasks.filter(task => {
    //             if (
    //                 task.title.toLowerCase().includes(search.toLowerCase()) ||
    //                 task.description
    //                     .toLowerCase()
    //                     .includes(search.toLowerCase())
    //             ) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    //     return tasks;
    // }

    // deleteTaskById(id: string): Task[] {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    //     return this.tasks;
    // }
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
