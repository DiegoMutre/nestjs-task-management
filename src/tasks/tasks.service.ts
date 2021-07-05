import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filters.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDTO: GetTaskFilterDTO): Task[] {
        const { search, status } = filterDTO;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = this.tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = this.tasks.filter(task => {
                if (
                    task.title.toLowerCase().includes(search.toLowerCase()) ||
                    task.description
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        // Try to get a task
        const found = this.tasks.find(task => task.id === id);
        // If not found, throw an 404 error
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`); // The message is optional
        }

        // otherwise,  return the found task
        return found;
    }

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO; // This only works when the class is defined as a type

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    deleteTaskById(id: string): Task[] {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
