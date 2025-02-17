import type { SchemaObject } from './SchemaObject'

export interface WithJsonSchema {
    /**
     * Returns the JSON schema of the object
     */
    toJSONSchema: () => SchemaObject

    /**
     * Returns the JSON schema of the instance with nullable fields set to false
     */
    toStrictJSONSchema: () => SchemaObject
}
