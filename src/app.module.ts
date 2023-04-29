import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    // VaccinationsModule,
    // PatientsModule,
    ClientesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})

export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
