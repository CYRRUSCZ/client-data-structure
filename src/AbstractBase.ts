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
    validate (input?: Record<string, unknown>): boolean {
        const ajv = new Ajv({ allErrors: true, strict: true })
        addFormats(ajv, { formats: ['date', 'date-time', 'time', 'email'], keywords: true })

        function transformData (data: Record<string, any>): Record<string, any> {
            return Object
                .entries(data)
                .reduce<Record<string, unknown>>((acc, [key, value]: [string, unknown]) => {
                    if (value && Array.isArray(value)) {
                        value = value.map((item) => {
                            if (item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date)) {
                                return transformData(item as Record<string, unknown>)
                            }

                            if (item instanceof Date) {
                                return item.toISOString()
                            }

                            return item
                        })
                    }

                    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
                        value = transformData(value)
                    }

                    if (value instanceof Date) {
                        value = value.toISOString()
                    }

                    return Object.assign(acc, { [key]: value })
                }, {})
        }

        const dataToBeValidated = transformData(input ?? this.toJSON())
        const schema = this.toJSONSchema()
        const validate = ajv.compile(schema)
        const isValid = validate(dataToBeValidated)
        if (!isValid) {
            const errorsAsString = validate.errors?.map((error) => `${error.instancePath} ${error.message}`).join('\n')
            throw new Error(errorsAsString)
        }

        return isValid
    }

    abstract toJSON (): Record<string, any>

    abstract toJSONSchema (): JSONSchemaObject
}
