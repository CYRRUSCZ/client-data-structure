import { Ajv } from 'ajv'
import type { ValidationAware } from './Interfaces/ValidationAware'
import type { JSONSchemaAware } from './Interfaces/JsonSchemaAware'

export interface JSONSchema {
    type: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean' | 'null'
    [x: string]: any
    required?: string[]
}

export interface JSONSchemaObject extends JSONSchema {
    type: 'object'
    properties: Record<string, JSONSchema | JSONSchemaObject>
}

export abstract class AbstractBase implements ValidationAware, JSONSchemaAware {
    validate (input?: Record<string, unknown>): void {
        const dataToBeValidated = input ?? this.toJSON()
        const schema = this.toJSONSchema()
        const ajv = new Ajv({ allErrors: true, strict: true })
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
