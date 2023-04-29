import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from "src/modules/users/entities/usuario.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Usuario> {
        const { uuid } = payload;

        const user = await this.userRepository.findOne({
            where: { uuid },
            relations: { tipo_usuario: true }
        });

        if (!user)
            throw new UnauthorizedException(['Token no válido'])

        return user;
    }
}