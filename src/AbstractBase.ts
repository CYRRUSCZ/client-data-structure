import { Ajv, type ValidateFunction, type ErrorObject } from 'ajv'
import addFormats from 'ajv-formats'

import { transformDataBeforeValidation } from './helpers'
import type { ValidationAware } from './Interfaces/ValidationAware'
import type { JSONSchemaAware } from './Interfaces/JsonSchemaAware'

export type JSONSchemaType = 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean' | 'null'
export interface JSONSchema {
    type?: JSONSchemaType | JSONSchemaType[]
    required?: string[]
    [x: string]: any
}

export interface JSONSchemaObject extends JSONSchema {
    type: 'object'
    properties: Record<string, JSONSchema | JSONSchemaObject>
}

export abstract class AbstractBase implements ValidationAware, JSONSchemaAware {
    _errors: ErrorObject[] = []

    validate(input?: Record<string, any>): boolean {
        this._errors = []
        const validate = this.bootstrapValidator()
        const dataToBeValidated = transformDataBeforeValidation(input ?? this.toJSON())
        const isValid = validate(dataToBeValidated)
        if (!isValid) {
            const { errors } = validate
            let errorsAsString = ''
            if (errors && errors.length > 0) {
                errorsAsString = errors.map(error => `${error.instancePath} ${error.message}`).join('\n')
                this._errors.push(...errors)
            }

            throw new Error(errorsAsString, { cause: this._errors })
        }

        return isValid
    }

    protected bootstrapValidator(): ValidateFunction {
        const schema = this.toJSONSchema()
        const ajv = new Ajv({ allErrors: true, strict: true })
        addFormats(ajv, { formats: ['date', 'date-time', 'time', 'email'], keywords: true })
        const validate = ajv.compile(schema)

        return validate
    }

    getValidationErrors(): ErrorObject[] {
        return this._errors
    }

    abstract toJSON(): Record<string, any>
    abstract toJSONSchema(): JSONSchemaObject
}
