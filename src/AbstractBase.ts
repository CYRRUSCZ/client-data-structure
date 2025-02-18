import { Ajv } from 'ajv'
import addFormats from 'ajv-formats'
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
    validate (input?: Record<string, unknown>): void {
        const ajv = new Ajv({ allErrors: true, strict: true })
        addFormats(ajv, { formats: ['date', 'date-time', 'time', 'email'], keywords: true })

        const dataToBeValidated = Object
            .entries(input ?? this.toJSON())
            .reduce<Record<string, unknown>>((acc, [key, value]: [string, unknown]) => {
                if (value instanceof Date) {
                    value = value.toISOString()
                }

                return Object.assign(acc, { [key]: value })
            }, {})
        const schema = this.toJSONSchema()
        const validate = ajv.compile(schema)
        const isValid = validate(dataToBeValidated)
        if (!isValid) {
            const errorsAsString = validate.errors?.map((error) => `${error.instancePath} ${error.message}`).join('\n')
            throw new Error(errorsAsString)
        }
    }

    abstract toJSON (): Record<string, any>

    abstract toJSONSchema (): JSONSchemaObject
}
