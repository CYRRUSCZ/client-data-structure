import { Ajv, type SchemaObject } from 'ajv'
import type { ValidationAware } from './Interfaces/ValidationAware'
import type { WithJsonSchema } from './Interfaces/WithJsonSchema'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export abstract class AbstractValidationAware implements ValidationAware, WithJsonSchema {
    get className (): string {
        return this.constructor.name.replace('_', '')
    }

    /**
     * Validates the object and returns the validation errors
     *
     * @throws {ValidationError} if the object is not valid
     */
    validate (data?: Record<string, any>): void {
        const dataToBeValidated = data ?? this.toJSON()
        const jsonSchema = this.toJSONSchema()
        const validateFn = new Ajv({ allErrors: true, strictTypes: true, strictSchema: true, strictRequired: true }).compile(jsonSchema)
        const isValid = validateFn(dataToBeValidated)
        const errors = validateFn.errors ?? []
        if (!isValid) {
            throw new Error(errors.map(error => `${error.instancePath}: ${error.message}`).join('\n'))
        }
    }

    /**
     * Method that returns the JSON schema of the object
     */
    toJSONSchema (): SchemaObject {
        const schemas = validationMetadatasToSchemas({
            additionalConverters: {
                stringOrNull: {
                    type: 'string',
                    nullable: true
                }
            }
        })
        // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- Accessing schema by dynamic key
        const jsonSchema = schemas[`${this.className}Validation`]

        return jsonSchema
    }

    /**
     * Returns the JSON schema of the instance with nullable fields set to false
     */
    toStrictJSONSchema (): Record<string, any> {
        const schema = this.toJSONSchema()
        if (schema.type !== 'object') {
            return schema
        }

        const { properties } = schema
        if (typeof properties !== 'object' || properties === null) {
            return schema
        }

        const propsEntries = Object.entries(properties as Record<string, any>)
        const strictSchema = {
            ...schema,
            properties: propsEntries.reduce((acc, [key, property]) => {
                if (typeof properties !== 'object' || properties === null) {
                    return acc
                }

                return Object.assign(acc, {
                    [key]: {
                        ...property as Record<string, any>,
                        nullable: false
                    }
                })
            }, {})
        }

        return strictSchema
    }

    /**
     * Method that returns instance as a plain object
     */
    abstract toJSON (): Record<string, any>
}
