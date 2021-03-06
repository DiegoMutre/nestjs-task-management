import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filters.dto';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDTO: GetTaskFilterDTO) {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status }); // &&
        }

        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` }, // The `%search%` is to match either be incompleted or completed, example: `create` === `crea`
            );
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDTO; // This only works when the class is defined as a type

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);

        return task;
    }

    async deleteTaskById(id: string) {
        const result = await this.delete(id);

        // Check if the task exists
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found`);
        }
    }
}
