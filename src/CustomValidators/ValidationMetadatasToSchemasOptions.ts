import type { ReferenceObject } from 'openapi3-ts'
import type { IOptions } from 'class-validator-jsonschema/build/options'
import type { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata'

import type { SchemaObject, SchemaObjectProperty } from '../Interfaces/SchemaObject'

interface ExtendedSchemaObject extends SchemaObject {
    if?: { properties: Record<string, SchemaObjectProperty> }
    then?: { properties: Record<string, SchemaObjectProperty> }
}

export type SchemaConverter = (meta: ValidationMetadata, options: IOptions) => ReferenceObject | ExtendedSchemaObject

export const validationMetadatasToSchemasOptions: { additionalConverters: Record<string, SchemaConverter | ExtendedSchemaObject> } = {
    additionalConverters: {
        stringOrNull: {
            type: 'string',
            nullable: true
        },
        dateOrStringOrNull: (options) => {
            const { groups } = options
            const normal = {
                anyOf: [
                    { type: 'string', pattern: '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d.\\d+Z?' },
                    { type: 'string', format: 'date-time' },
                    { type: 'string', nullable: true }
                ]
            }

            switch (true) {
                case groups.includes('mergeToAllOf'):
                    return {
                        mergeDateOrStringOrNull: { allOf: normal.anyOf }
                    }
                case groups.includes('mergeToOneOf'):
                    return {
                        mergeDateOrStringOrNull: { oneOf: normal.anyOf }
                    }
                case groups.includes('mergeToAnyOf'):
                    return {
                        mergeDateOrStringOrNull: { anyOf: normal.anyOf }
                    }
                default:
                    return normal
            }
        },
        isOlderThan: (meta) => {
            const { constraints, groups } = meta
            const [ageInYears] = constraints as [number]
            const today = new Date()
            today.setHours(12, 0, 0, 0)
            const yearsAgoDate = new Date(today)
            yearsAgoDate.setFullYear(today.getFullYear() - ageInYears)
            const result = yearsAgoDate.toISOString()
            const normal = { type: 'string', format: 'date-time', formatMaximum: result }

            switch (true) {
                case groups.includes('mergeToAllOf'):
                    return {
                        mergeIsOlderThan: { allOf: [normal] }
                    }
                case groups.includes('mergeToOneOf'):
                    return {
                        mergeIsOlderThan: { oneOf: [normal] }
                    }
                case groups.includes('mergeToAnyOf'):
                    return {
                        mergeIsOlderThan: { anyOf: [normal] }
                    }
                default:
                    return normal
            }
        }
    }
}

export default validationMetadatasToSchemasOptions
