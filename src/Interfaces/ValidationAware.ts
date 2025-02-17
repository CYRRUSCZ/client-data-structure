export interface ValidationAware {
    /**
     * Validate the object or input object
     *
     * @throws {Error} Throws a validation error if the object is not valid
     * @returns {void}
     */
    validate: (input: Record<string, any>) => void
}
