export interface ValidationAware {
    /**
     * Validate the instance or input object
     *
     * @throws {Error} Throws a validation error if the object is not valid
     * @returns {boolean} true if the object is valid
     */
    validate: (input?: Record<string, any>) => boolean
}
