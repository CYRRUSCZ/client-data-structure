export interface JSONSchemaAware {
    /**
     * Return JSON schema representation of the object
     *
     * @returns {Record<string, any>} the JSON schema
     */
    toJSONSchema: () => Record<string, any>
}
