import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions} from "class-validator"


@ValidatorConstraint({ name: "stringOrNull", async: false })
export class CustomStringOrNull implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does not use this
    validate (text: string | null, _args: ValidationArguments): boolean {
        return text === null || typeof text === 'string' && text.length > 0
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does not use this
    defaultMessage (_args: ValidationArguments): string {
        return "Text ($value) must be string or null"
    }
}


export function StringOrNull(validationOptions?: ValidationOptions) {
   return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "stringOrNull",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: CustomStringOrNull
        })
   };
}
