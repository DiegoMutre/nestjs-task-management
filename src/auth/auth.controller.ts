import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDTO: AuthCredentialsDTO) {
        return this.authService.signUp(authCredentialsDTO);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDTO: AuthCredentialsDTO) {
        return this.authService.signIn(authCredentialsDTO);
    }
}
