export interface JSONSchemaAware {
    /**
     * Return JSON schema representation of the instance
     *
     * @returns {Record<string, any>} the instance JSON schema
     */
    toJSONSchema: () => Record<string, any>
}
