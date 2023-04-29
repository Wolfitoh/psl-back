import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/modules/auth/decorators';
import { ValidRoles } from 'src/modules/auth/interfaces/valid-roles';
import { HttpStatus } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteService } from '../services/cliente.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get()
    @Auth(ValidRoles.Administrador)
    getClients(): Promise<Cliente[]> {
        return this.clienteService.getClients();
    }

    @Post()
    @Auth(ValidRoles.Administrador)
    createClient(@Body() createClient: CreateClientDto): Promise<Cliente> {
        return this.clienteService.createClient(createClient);
    }

    @Delete(':id')
    @Auth(ValidRoles.Administrador)
    deleteClient(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, })) id: number): Promise<Object> {
        return this.clienteService.deleteClient(id);
    }

    @Patch()
    @Auth(ValidRoles.Administrador)
    updateClient(@Body() client: UpdateClientDto): Promise<Cliente> {
        return this.clienteService.updateClient(client);
    }
}
