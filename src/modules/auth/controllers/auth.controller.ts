import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from 'src/modules/users/dto';
import { Usuario } from 'src/modules/users/entities/usuario.entity';
import { Auth, GetUser } from '../decorators';
import { AuthService } from '../services/auth.service';
import { ValidRoles } from '../interfaces/valid-roles';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<Object> {
        return this.authService.login(loginDto);
    }

    @Get('check-status')
    @Auth(ValidRoles.Administrador, ValidRoles.Usuario)
    checkAuthStatus() {
        return true;
    }
}
