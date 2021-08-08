import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    signUp(authCredentialsDTO: AuthCredentialsDTO) {
        return this.usersRepository.createUser(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO) {
        const { username, password } = authCredentialsDTO;

        // Find the user in the DB
        const user = await this.usersRepository.findOne({ username });

        // Check if the password is correct and the user exists
        if (user && (await compare(password, user.password))) {
            // Create access token with jwt service
            const payload: JwtPayload = { username };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        }

        throw new UnauthorizedException('Please check your login credentials');
    }
}
