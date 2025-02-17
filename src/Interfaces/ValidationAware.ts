export interface ValidationAware {
    /**
     * Validates instance and returns the validation errors
     *
     * @throws {Error} if instance is not valid
     */
    validate: (options: { strictMode?: boolean, data?: Record<string, any> }) => void
}
