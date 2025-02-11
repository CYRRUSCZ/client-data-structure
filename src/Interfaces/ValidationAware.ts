export interface ValidationAware {
    /**
     * Validates instance and returns the validation errors
     *
     * @throws {Error} if instance is not valid
     */
    validate: (data?: Record<string, any>) => void

    /**
     * Returns the JSON schema of the instance with nullable fields set to false
     */
    toStrictJSONSchema: () => Record<string, any>
}
