import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks') // 'apiURL/tasks
export class TasksController {
    // Inject tasks service
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        // Dummy example before the good approach
        // @Body('title') title: string, // param : 'title' - arg name: title - arg type: string
        @Body() createTaskDTO: CreateTaskDTO,
    ): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Task[] {
        return this.tasksService.deleteTaskById(id);
    }
}
