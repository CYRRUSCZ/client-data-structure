import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
    isISO8601
} from "class-validator"


@ValidatorConstraint({ name: "dateOrStringOrNull", async: false })
export class CustomDateOrStringOrNull implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does not use this
    validate (text: Date | string | null, _args: ValidationArguments): boolean {
        return text === null || isISO8601(text) || typeof text === 'string' && text.length > 0 || text instanceof Date
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does not use this
    defaultMessage (_args: ValidationArguments): string {
        return "Text ($value) must be string or null or date or date string"
    }
}


export function DateOrStringOrNull(validationOptions?: ValidationOptions) {
   return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "dateOrStringOrNull",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: CustomDateOrStringOrNull
        })
   };
}
