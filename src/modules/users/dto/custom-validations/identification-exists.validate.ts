// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

// import { Repository } from "typeorm";
// import { Identificacion } from "../../entities/identificacion.entity";

// @ValidatorConstraint({ name: 'IdentificationExists', async: true })
// @Injectable()
// export class IdentificationExistsRule implements ValidatorConstraintInterface {
//     constructor(@InjectRepository(Identificacion) private readonly userRepository: Repository<Identificacion>) { }

//     async validate(value: string, validationArguments: ValidationArguments) {
//         const ifExists = validationArguments.constraints[0];
//         try {
//             const awa = await this.userRepository.findOneOrFail({ where: { valor: value }, withDeleted: true });
//             return ifExists ? false : true;
//         } catch (e) {
//             return ifExists ? true : false;
//         }
//     }

//     defaultMessage(args: ValidationArguments) {
//         return 'La identificación ingresada ya pertenece a un usuario';
//     }
// }

// export function IdentificationExists(ifExists: boolean, validationOptions?: ValidationOptions) {
//     return function (object: any, propertyName: string) {
//         registerDecorator({
//             name: 'IdentificationExists',
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [ifExists],
//             validator: IdentificationExistsRule,
//         });
//     };
// }


