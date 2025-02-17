import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from "class-validator"


@ValidatorConstraint({ name: "isOlderThan", async: false })
export class CustomIsOlderThan implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does not use this
    validate (date: string | null, _args: ValidationArguments): boolean {
        // @TODO if class-validator should be used with validate function, we using ajv
        console.log(date, _args)

        return true
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does not use this
    defaultMessage (_args: ValidationArguments): string {
        return "Must be older than ($value)"
    }
}


export function IsOlderThan(ageInYears: number, validationOptions?: ValidationOptions) {
   return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "isOlderThan",
            target: object.constructor,
            propertyName,
            constraints: [ageInYears],
            options: validationOptions,
            validator: CustomIsOlderThan
        })
   };
}
