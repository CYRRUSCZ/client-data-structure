export interface JSONSchemaAware {
    /**
     * Return JSON schema representation of the instance
     *
     * Callable without instantiation via "Class.prototype.toJSONSchema()"
     *
     * @returns {Record<string, any>} the instance JSON schema
     */
    toJSONSchema: () => Record<string, any>
}
