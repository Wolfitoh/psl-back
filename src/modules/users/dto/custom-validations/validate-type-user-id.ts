import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { Repository } from "typeorm";
import { TipoUsuario } from "../../entities/tipo_usuario.entity";

@ValidatorConstraint({ name: 'TypeUserExists', async: true })
@Injectable()
export class TypeUserExistsRule implements ValidatorConstraintInterface {
    constructor(@InjectRepository(TipoUsuario) private readonly roleRepository: Repository<TipoUsuario>) { }

    async validate(value: number) {
        try {
            await this.roleRepository.findOneOrFail({ where: { id: value } });
            return true;
        } catch (e) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'El tipo de usuario no existe';
    }
}

export function TypeUserExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'TypeUserExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: TypeUserExistsRule,
        });
    };
}


