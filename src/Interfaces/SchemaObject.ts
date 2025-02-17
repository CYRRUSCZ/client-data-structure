import type { SchemaObject as AjvSchemaObject } from 'ajv'

export interface SchemaObjectProperty {
    [x: string]: string | boolean | number | Record<string, SchemaObjectProperty | SchemaObjectProperty[]> | SchemaObjectProperty[]
}

export interface SchemaObject extends AjvSchemaObject {
    type?: 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'null'
    [x: string]: any
}

export interface SchemaObjectWithProperties extends SchemaObject {
    type: 'object'
    properties: Record<string, SchemaObjectProperty>
}
