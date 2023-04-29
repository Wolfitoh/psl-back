import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { Repository } from "typeorm";
import { TipoIdentificacion } from "../../entities/tipo_identificacion.entity";

@ValidatorConstraint({ name: 'TypeIdentificationExists', async: true })
@Injectable()
export class TypeIdentificationExistsRule implements ValidatorConstraintInterface {
    constructor(@InjectRepository(TipoIdentificacion) private readonly tipoIdentificacionRepository: Repository<TipoIdentificacion>) { }

    async validate(value: number) {
        try {
            await this.tipoIdentificacionRepository.findOneOrFail({ where: { id: value } });
            return true;
        } catch (e) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'El tipo de identificación no existe';
    }
}

export function TypeIdentificationExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'TypeIdentificationExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: TypeIdentificationExistsRule,
        });
    };
}


