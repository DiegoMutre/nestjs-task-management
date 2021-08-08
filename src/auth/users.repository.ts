import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { genSalt, hash } from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDTO;

        // Hash password
        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        const user = this.create({
            username,
            password: hashedPassword,
        });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                // duplicate value error code
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
