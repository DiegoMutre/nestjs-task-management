import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid') // use uuid as id generator instead '1, 2, 3...'
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
