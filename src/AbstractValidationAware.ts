import { Ajv } from 'ajv'
import addFormats from 'ajv-formats'
import type { ValidationAware } from './Interfaces/ValidationAware'
import type { WithJsonSchema } from './Interfaces/WithJsonSchema'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import type { SchemaObjectProperty, SchemaObjectWithProperties } from './Interfaces/SchemaObject'
import validationsToSchemasOptions from './CustomValidators/ValidationMetadatasToSchemasOptions'

export abstract class AbstractValidationAware implements ValidationAware, WithJsonSchema {
    get className (): string {
        return this.constructor.name.replace('_', '')
    }

    /**
     * Validates the object and returns the validation errors
     *
     * @param options.strictMode - Flag that indicates if the validation should be strict, adds nullable: false to all properties
     * @param options.data - Data to be validated if you want validate data directly
     *
     * @throws {ValidationError} if the object is not valid
     */
    validate (options: { strictMode?: boolean, data?: Record<string, any> }): void {
        const dataToBeValidated = options.data ?? this.toJSON()
        const normalizedData = Object.entries(dataToBeValidated).reduce((acc, [key, value]) => {
            if (value instanceof Date) {
                value = value.toISOString()
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Does not matter what value is
            return Object.assign(acc, { [key]: value })
        }, {})
        const jsonSchema = options.strictMode === true ? this.toStrictJSONSchema() : this.toJSONSchema()
        const ajv = new Ajv({ allErrors: true, strictTypes: true, strictSchema: true, strictRequired: true })
        addFormats(ajv, { formats: ['date', 'date-time', 'time', 'email'], keywords: true })
        const validateFn = ajv.compile(jsonSchema)
        const isValid = validateFn(normalizedData)
        const errors = validateFn.errors ?? []
        if (!isValid) {
            throw new Error(errors.map(error => `${error.instancePath}: ${error.message}`).join('\n'))
        }
    }

    /**
     * Method that returns the JSON schema of the object
     */
    toJSONSchema (): SchemaObjectWithProperties {
        const schemas = validationMetadatasToSchemas(validationsToSchemasOptions)
        const jsonSchema = compileIntoSchemaObject(schemas[`${this.className}Validation`] as SchemaObjectWithProperties)

        return jsonSchema
    }

    /**
     * Returns the JSON schema of the instance with nullable fields set to false
     */
    toStrictJSONSchema (): SchemaObjectWithProperties {
        const schemas = validationMetadatasToSchemas(validationsToSchemasOptions)
        const schema = compileIntoSchemaObject(schemas[`${this.className}Validation`] as SchemaObjectWithProperties)

        if (schema.type !== 'object') {
            return schema
        }

        const { properties } = schema
        if (typeof properties !== 'object' || properties === null) {
            return schema
        }

        const propsEntries = Object.entries(properties)
        const strictSchema = {
            ...schema,
            properties: propsEntries.reduce((acc, [key, property]) => {
                if (typeof properties !== 'object' || properties === null) {
                    return acc
                }

                return Object.assign(acc, {
                    [key]: {
                        ...property,
                        ...(Object.keys(property).some(propKey => ['allOf', 'oneOf', 'anyOf'].includes(propKey)) ? {} : { nullable: false })
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

/**
 * Function that returns instance with properties which has merged definitions
 */
function compileIntoSchemaObject (schema: SchemaObjectWithProperties): SchemaObjectWithProperties {
    const { properties } = schema
    if (typeof properties !== 'object') {
        return schema
    }

    const propsEntries = Object.entries(properties)
    const mergedProperties = propsEntries.reduce((acc, [key, property]) => {
        if (typeof property !== 'object') {
            return acc
        }

        const { allOf, anyOf, oneOf } = mergeSchemaPropDefinitions(property)
        const hasMergedProps = [...allOf, ...anyOf, ...oneOf].length > 0
        // Precedence: allOf > oneOf > anyOf
        const mergedPropsObj = allOf.length > 0 ? { allOf } : oneOf.length > 0 ? { oneOf } : { anyOf }
        return Object.assign(acc, {
            [key]: {
                ...(hasMergedProps ? mergedPropsObj : { ...property, nullable: true })
            }
        })
    }, {})

    return {
        ...schema,
        properties: mergedProperties
    }
}

type MergedSchemaProperty = SchemaObjectProperty | Record<string, SchemaObjectProperty>
interface MergedSchemaProperties {
    allOf: MergedSchemaProperty[]
    anyOf: MergedSchemaProperty[]
    oneOf: MergedSchemaProperty[]
}
function mergeSchemaPropDefinitions (prop: SchemaObjectProperty): MergedSchemaProperties {
    const propsEntries = Object.entries(prop)
    const mergedProperties = propsEntries.reduce<MergedSchemaProperties>((acc, [key, property]) => {
        if (typeof property !== 'object' || !key.startsWith('merge') || Array.isArray(property)) {
            return acc
        }

        for (const [key, item] of Object.entries(property)) {
            const value = Array.isArray(item) ? [...item] : [item]
            switch (key) {
                case 'allOf':
                    acc.allOf.push(...value)
                    break
                case 'anyOf':
                    acc.anyOf.push(...value)
                    break
                case 'oneOf':
                    acc.oneOf.push(...value)
                    break
            }
        }

        return acc
    }, { allOf: [], anyOf: [], oneOf: [] })

    return mergedProperties
}
