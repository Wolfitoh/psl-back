import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { Cliente } from '../entities/cliente.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { TipoIdentificacion } from '../entities/tipo_identificacion.entity';
import { Identificacion } from '../entities/identificacion.entity';
import { UpdateClientDto } from '../dto/update-client.dto';


interface UserImg {
    path: string;
    sexo: string;
}

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
        @InjectRepository(TipoIdentificacion) private readonly tipoIdentificacionRepository: Repository<TipoIdentificacion>,
        @InjectRepository(Identificacion) private readonly identificacionRepository: Repository<Identificacion>,
    ) { }

    async getClients(): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.find({
            relations: {
                identificacion: { tipo_identificacion: true },
            },
            order: {
                apellidos: 'asc',
                nombres: 'asc'
            }
        });

        //Mensaje para cuando salga mal la consulta
        if (!clientes) throw new NotFoundException("Algo salió mal.");

        //Mensaje para cuando no se encuentren registros
        if (clientes && clientes.length == 0) throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'No hay clientes para mostrar.',
        }, HttpStatus.NOT_FOUND)

        return clientes;
    }

    async createClient({ identificacion, value_identification, ...userData }: CreateClientDto): Promise<Cliente> {

        const ftipoIdentificacion = await this.tipoIdentificacionRepository.findOne({ where: { id: identificacion }, });

        const identification = this.identificacionRepository.create({ tipo_identificacion: ftipoIdentificacion, valor: value_identification });
        const createIdentification = await this.identificacionRepository.save(identification);

        const newCliente = this.clienteRepository.create({
            ...userData, identificacion: createIdentification
        });

        return this.clienteRepository.save(newCliente).catch((e) => {
            this.handleDBErrors(e)
        });
    }

    async updateClient({ id_cliente, identificacion, value_identification, id_identificacion, ...clientData }: UpdateClientDto) {
        const ftipoIdentificacion = await this.tipoIdentificacionRepository.findOne({ where: { id: identificacion }, });

        const identification = await this.identificacionRepository.preload({ id: identificacion, tipo_identificacion: ftipoIdentificacion, valor: value_identification });

        if (!identification) {
            throw new NotFoundException('Identificación no encontrada.')
        }

        const updateClient = await this.identificacionRepository.save(identification);

        await this.clienteRepository.save(updateClient).catch((e) => {
            const errors = [];
            if (/(value_identification)[\s\S]+(already exists)/.test(e.detail)) throw new BadRequestException(errors);

            return e;
        });

        return await this.clienteRepository.findOne({
            where: { id: updateClient.id },
            relations: {
                identificacion: { tipo_identificacion: true },
            },
        });

    }

    async deleteClient(id: number): Promise<Object> {
        const deleteResponse = await this.clienteRepository.softDelete(id);
        if (!deleteResponse.affected) {
            throw new NotFoundException('Cliente no encontrado.');
        }

        return {
            status: HttpStatus.ACCEPTED,
            message: 'Cliente eliminado exitosamente.',
        }
    }

    private handleDBErrors(error: any): never {
        if (error.code === '23505')
            throw new BadRequestException(error.detail);
        console.log(error)
        throw new InternalServerErrorException('Please check server logs');
    }

}
