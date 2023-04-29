import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cliente } from './entities/cliente.entity';
import { Identificacion } from './entities/identificacion.entity';
import { TipoIdentificacion } from './entities/tipo_identificacion.entity';
import { ClienteController } from './controllers/cliente.controller';
import { ClienteService } from './services/cliente.service';
import { TypeIdentificationExistsRule } from './dto/custom-validation/validate-type-identification-id';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Cliente, Identificacion, TipoIdentificacion])],
  controllers: [ClienteController],
  providers: [ClienteService, TypeIdentificationExistsRule]
})
export class ClientesModule { }
