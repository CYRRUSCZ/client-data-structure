import type { SchemaObject } from 'ajv'

export interface WithJsonSchema {
    /**
     * Returns the JSON schema of the object
     */
    toJSONSchema: () => SchemaObject
}
