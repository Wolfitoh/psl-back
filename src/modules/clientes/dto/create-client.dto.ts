import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { TypeIdentificationExists } from "./custom-validation/validate-type-identification-id";
import { IsValidDocumentConstraint } from "./custom-validation/validate-identification";

export class CreateClientDto {
    //Validando el campo para nombres
    @MinLength(2, {
        message: 'El campo nombres debe contener 3 caracteres como mínimo',
    })
    @MaxLength(50, {
        message: 'El campo nombres solo puede contener 50 caracteres como máximo',
    })
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'), { message: 'El campo nombres solo puede contener letras' })
    @IsNotEmpty({
        message: 'El campo nombres es requerido',
    })
    readonly nombres: string;

    //Validando el campo para apellidos
    @MinLength(6, {
        message: 'El campo apellidos debe contener 6 caracteres como mínimo',
    })
    @MaxLength(50, {
        message: 'El campo apellidos solo puede contener 50 caracteres como máximo',
    })
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'), { message: 'El campo apellidos solo puede contener letras' })
    @IsNotEmpty({
        message: 'El campo apellidos es requerido',
    })
    readonly apellidos: string;

    //Validando el campo para usuario
    @MinLength(6, {
        message: 'El campo nombre de usuario debe contener 6 caracteres como mínimo',
    })
    @MaxLength(20, {
        message: 'El campo nombre de usuario solo puede contener 20 caracteres como máximo',
    })
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'El campo nombre de usuario debe contener solo letras y números' })
    @IsOptional()
    readonly usuario: string;

    //Validando el campo sexo
    @IsString({
        message: 'El sexo es inválido',
    })
    @IsNotEmpty({
        message: 'El campo sexo es requerido',
    })
    readonly sexo: string;

    //Validando el campo sexo
    @IsPhoneNumber('PE') // Código de país para Perú
    @IsNotEmpty({
        message: 'El campo teléfono es requerido',
    })
    readonly telefono: string;

    //Validando el campo sexo

    @IsString({
        message: 'El campo pais es inválido',
    })
    @IsNotEmpty({
        message: 'El campo pais es requerido',
    })
    readonly pais: string;

    @IsString({
        message: 'El campo ciudad es inválido',
    })
    @IsNotEmpty({
        message: 'El campo ciudad es requerido',
    })
    readonly ciudad: string;

    //Validando el campo email
    @IsEmail({}, {
        message: 'El correo ingresado es inválido',
    })
    @IsOptional()
    readonly email: string;

    //Validando el campo tipo de usuario
    @TypeIdentificationExists()
    @IsNumber({}, {
        message: 'El tipo de identificación ingresado es inválido',
    })
    @IsOptional()
    readonly identificacion: number;

    //validando valor de identificacion
    @Validate(IsValidDocumentConstraint)
    @IsOptional()
    readonly value_identification: string;
}