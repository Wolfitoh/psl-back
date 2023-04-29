import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserExists } from "./custom-validations";
import { TypeUserExists } from "./custom-validations/validate-type-user-id";

export class CreateUserDto {
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
    @UserExists()
    @IsNotEmpty({
        message: 'El campo usuario es requerido',
    })
    readonly usuario: string;

    //Validando el campo sexo
    @IsString({
        message: 'El sexo es inválido',
    })
    @IsNotEmpty({
        message: 'El campo sexo es requerido',
    })
    readonly sexo: string;

    //Validando el campo email
    @IsEmail({}, {
        message: 'El correo ingresado es inválido',
    })
    @IsOptional()
    readonly email: string;

    //Validando el campo tipo de usuario
    @IsNumber()
    @IsNotEmpty({
        message: 'El rol es requerido',
    })
    @TypeUserExists()
    readonly tipo_usuario: number;

    //Validando el campo contraseña
    @IsNotEmpty({
        message: 'El campo contraseña es requerido',
    })
    @MinLength(6, {
        message: 'La contraseña debe contener 6 caracteres como mínimo',
    })
    @MaxLength(20, {
        message: 'La contraseña solo puede contener 20 caracteres como máximo',
    })
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ0-9 ]+$'), { message: 'La contraseña solo puede contener solo letras y números.' })
    readonly contrasena: string;
}