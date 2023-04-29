import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';

import { UserController } from './controllers/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExistsRule } from './dto/custom-validations/user-name-exists.validate';
import { AuthModule } from '../auth/auth.module';
import { TypeUserExistsRule } from './dto/custom-validations/validate-type-user-id';
import { Usuario } from './entities/usuario.entity';
import { TipoUsuario } from './entities/tipo_usuario.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Usuario, TipoUsuario])],
  controllers: [UserController],
  providers: [UserService, UserExistsRule, TypeUserExistsRule]
})
export class UsersModule { }
