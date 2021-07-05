import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // Inject tasks service
  constructor(private tasksService: TasksService) {}
}
