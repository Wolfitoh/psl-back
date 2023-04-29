import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { Repository } from "typeorm";
import { Usuario } from "../../entities/usuario.entity";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
    constructor(@InjectRepository(Usuario) private readonly userRepository: Repository<Usuario>) { }

    async validate(value: string) {
        try {
            await this.userRepository.findOneOrFail({ where: { usuario: value }, withDeleted: true });
            return false;
        } catch (e) {
            return true;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'El usuario ingresado ya existe';
    }
}

export function UserExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'UserExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UserExistsRule,
        });
    };
}


