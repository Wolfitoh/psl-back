import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, SearchUserByUDto, UpdateUserDto } from '../../dto';

import * as bcrypt from 'bcrypt'
import { Usuario } from '../../entities/usuario.entity';
import { TipoUsuario } from '../../entities/tipo_usuario.entity';

interface UserImg {
    path: string;
    sexo: string;
}

@Injectable()
export class UserService {

    users_img: Array<UserImg> = [
        { path: 'assets/images/user/user1.png', sexo: 'Femenino' },
        { path: 'assets/images/user/user2.png', sexo: 'Masculino' },
        { path: 'assets/images/user/user3.png', sexo: 'Femenino' },
        { path: 'assets/images/user/user4.png', sexo: 'Masculino' },
        { path: 'assets/images/user/user5.png', sexo: 'Masculino' },
        { path: 'assets/images/user/user6.png', sexo: 'Femenino' },
        { path: 'assets/images/user/user7.png', sexo: 'Masculino' },
    ];

    constructor(
        @InjectRepository(Usuario) private readonly userRepository: Repository<Usuario>,
        @InjectRepository(TipoUsuario) private readonly roleRepository: Repository<TipoUsuario>,

    ) { }

    async getUsers(): Promise<Usuario[]> {
        const users = await this.userRepository.find({
            relations: {
                tipo_usuario: true,
            },
            order: {
                apellidos: 'asc',
                nombres: 'asc'
            }
        });

        //Mensaje para cuando salga mal la consulta
        if (!users) throw new NotFoundException("Algo salió mal.");

        //Mensaje para cuando no se encuentren registros
        if (users && users.length == 0) throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'No hay usuarios para mostrar.',
        }, HttpStatus.NOT_FOUND)

        return users;
    }

    async getUser({ username }: SearchUserByUDto): Promise<Usuario> {
        const user_response = await this.userRepository.findOne({ where: { usuario: username }, });
        //Mensaje para cuando salga mal la consulta
        if (!user_response) throw new NotFoundException("Algo salió mal.");

        //Mensaje para cuando no se encuentren registros
        if (user_response && user_response == null) throw new HttpException({
            status: HttpStatus.ACCEPTED,
            error: 'El usuario no existe.',
        }, HttpStatus.ACCEPTED)

        return user_response;
    }

    async createUser(createUserDto: CreateUserDto): Promise<Usuario> {
        const { contrasena, tipo_usuario, ...userData } = createUserDto;
        const frole = await this.roleRepository.findOne({ where: { id: tipo_usuario }, });

        const filteredArray = this.users_img.filter((element) => element.sexo == userData.sexo);
        const randomElement = filteredArray[Math.floor(Math.random() * filteredArray.length)];

        const newUser = this.userRepository.create({
            ...userData,
            imagen: randomElement.path,
            tipo_usuario: frole, contrasena: bcrypt.hashSync(contrasena, 10)
        });

        return this.userRepository.save(newUser).catch((e) => {
            this.handleDBErrors(e)
        });
    }

    async deleteUser(uid: string): Promise<Object> {
        const deleteResponse = await this.userRepository.softDelete(uid);
        if (!deleteResponse.affected) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        return {
            status: HttpStatus.ACCEPTED,
            message: 'Usuario eliminado exitosamente.',
        }
    }

    async updateUser(updateUserDto: UpdateUserDto) {
        const { contrasena, tipo_usuario, ...userData } = updateUserDto;
        const role_user = await this.roleRepository.findOne({ where: { id: tipo_usuario }, });

        let userUpdate: Usuario;

        if (contrasena) {
            if (contrasena.length < 6) throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'La contraseña debe contener como mínimo 6 caracteres.',
            }, HttpStatus.ACCEPTED)
            userUpdate = await this.userRepository.preload({
                ...userData, tipo_usuario: role_user, contrasena: bcrypt.hashSync(contrasena, 10)
            });
        } else {
            userUpdate = await this.userRepository.preload({
                ...userData, tipo_usuario: role_user
            });
        }

        if (!userUpdate) {
            throw new NotFoundException('Usuario no encontrado.')
        }

        await this.userRepository.save(userUpdate).catch((e) => {
            const errors = [];
            if (/(usuario)[\s\S]+(already exists)/.test(e.detail)) throw new BadRequestException(errors)
            return e;
        });

        return await this.userRepository.findOne({
            where: { uuid: userUpdate.uuid },
            relations: {
                tipo_usuario: true,
            },
        });

    }

    private handleDBErrors(error: any): never {
        if (error.code === '23505')
            throw new BadRequestException(error.detail);
        console.log(error)
        throw new InternalServerErrorException('Please check server logs');
    }

}
