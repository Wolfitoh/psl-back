import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidDocument', async: false })
export class IsValidDocumentConstraint implements ValidatorConstraintInterface {
    validate(document: string, args: ValidationArguments) {
        const patternDNI = /^\d{8}$/;
        const patternCarnet = /^[A-Z]{1}\d{6}[A-Z0-9]{1}$/;
        const patternPasaporte = /^[A-Z]{2}\d{7}$/;

        if (!patternDNI.test(document) && !patternCarnet.test(document) && !patternPasaporte.test(document)) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'El documento no es válido.';
    }
}