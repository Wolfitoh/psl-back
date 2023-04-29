import { Injectable } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/modules/users/dto';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt'
import { Usuario } from 'src/modules/users/entities/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario) private readonly userRepository: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<Object> {
        const { contrasena, usuario } = loginDto;
        console.log(loginDto)
        const user_response = await this.userRepository.findOne({
            where: { usuario },
            relations: { tipo_usuario: true },
            select: { usuario: true, contrasena: true, imagen: true, uuid: true, nombres: true, apellidos: true, tipo_usuario: { id: true, name: true } } //! OJO!
        });

        if (!user_response)
            throw new BadRequestException(['Las credenciales son incorrectas']);

        if (!bcrypt.compareSync(contrasena, user_response.contrasena))
            throw new BadRequestException(['Las credenciales son incorrectas']);

        const { uuid, nombres, imagen, apellidos, tipo_usuario } = user_response;

        return {
            user: { uuid, nombres, apellidos, imagen, tipo_usuario },
            token: this.getJwtToken({ uuid: user_response.uuid })
        };
    }

    async checkAuthStatus(user: Usuario) {
        return {
            ...user,
            token: this.getJwtToken({ uuid: user.uuid })
        };
    }

    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
}
