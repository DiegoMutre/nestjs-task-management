import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks') // 'apiURL/tasks
export class TasksController {
    // Inject tasks service
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
}
