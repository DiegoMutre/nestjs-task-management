import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filters.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks') // 'apiURL/tasks
export class TasksController {
    // Inject tasks service
    constructor(private tasksService: TasksService) {}

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTasksById(id);
    }

    @Post()
    createTask(
        // Dummy example before the good approach
        // @Body('title') title: string, // param : 'title' - arg name: title - arg type: string
        @Body() createTaskDTO: CreateTaskDTO,
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO);
    }

    // ! Old Code
    // @Get()
    // getTasks(@Query() filterDTO: GetTaskFilterDTO): Task[] {
    //     // If we have any filters defined, call tasksService.getTasksWithFilters
    //     // otherwise, just get all tasks
    //     if (Object.keys(filterDTO).length) {
    //         return this.tasksService.getTasksWithFilters(filterDTO);
    //     }

    //     return this.tasksService.getAllTasks();
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): Task[] {
    //     return this.tasksService.deleteTaskById(id);
    // }

    // @Patch('/:id/status')
    // updateTaskById(
    //     @Param('id') id: string,
    //     @Body() updateTaskDTO: UpdateTaskStatusDTO,
    // ) {
    //     const { status } = updateTaskDTO;
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
}
