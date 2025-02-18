import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { getStringOrNull } from './helpers'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

/**
 * Input of the ContactInformation class that is used to create the object
 */
export interface ContactInformationInput {
    email: string | null
    phoneNumber: string | null
    phonePassword: string | null
}

/**
 * Output of the ContactInformation class that is used to serialize the object to JSON
 */
export interface ContactInformationOutput {
    email: string | null
    phoneNumber: string | null
    phonePassword: string | null
}

export interface ContactInformationJSONSchema extends JSONSchemaObject {
    type: 'object',
    properties: {
        email: JSONSchema,
        phoneNumber: JSONSchema,
        phonePassword: JSONSchema
    }

    required: string[]
}

/**
 * Class that represents a contact information
 */
export class ContactInformation extends AbstractBase {
    readonly #email: string | null = null
    readonly #phoneNumber: string | null = null
    readonly #phonePassword: string | null = null

    constructor (
        input: Partial<ContactInformationInput> = {}
    ) {
        super()
        const {
            email,
            phoneNumber,
            phonePassword
        } = input
        this.#email = getStringOrNull(email)
        this.#phoneNumber = getStringOrNull(phoneNumber)
        this.#phonePassword = getStringOrNull(phonePassword)
    }

    /**
     * Create a new instance of the ContactInformation class using positional arguments
     *
     * @param email The email address
     * @param phoneNumber The phone number
     * @param phonePassword The phone password
     */
    static create (
        email: string | null | undefined,
        phoneNumber: string | null | undefined,
        phonePassword: string | null | undefined
    ): ContactInformation {
        const plain: Partial<ContactInformationInput> = {
            email,
            phoneNumber,
            phonePassword
        }
        return new ContactInformation(plain)
    }

    /**
     * The primary email address
     */
    get email (): string | null {
        return this.#email
    }

    /**
     * The primary phone number
     */
    get phoneNumber (): string | null {
        return this.#phoneNumber
    }

    /**
     * The phone password
     */
    get phonePassword (): string | null {
        return this.#phonePassword
    }

    /**
     * Serialize the object to JSON
     */
    toJSON (): ContactInformationOutput {
        return {
            email: this.#email,
            phoneNumber: this.#phoneNumber,
            phonePassword: this.#phonePassword
        }
    }

    toJSONSchema (): ContactInformationJSONSchema {
        return {
            type: 'object',
            properties: {
                email: {
                    allOf: [
                        { type: 'string', format: 'email' }
                        // @TODO: backend email resolving, resolveMX and so on
                    ]
                },
                phoneNumber: {
                    allOf: [
                        (() => {
                            const randomString = Math.random().toString(36).substring(7)
                            const invalidSchema = {
                                type: 'string',
                                description: 'Invalid phone number guard',
                                pattern: `^Invalid phone number guard, (${randomString})$`
                            }
                            if (this.#phoneNumber === null || this.#phoneNumber === '') {
                                return invalidSchema
                            }
                            const number = parsePhoneNumberFromString(this.#phoneNumber)
                            if (number?.isValid()) {
                                return {
                                    type: 'string',
                                    description: 'Internally validated'
                                }
                            }

                            return invalidSchema
                        })()
                    ]
                },
                phonePassword: {
                    type: 'string',
                    maxLength: 20
                }
            },
            required: ['email', 'phoneNumber', 'phonePassword']
        }
    }

    /**
     * Serialize the object to a plain object
     */
    toPlainObject (): ContactInformationOutput {
        return this.toJSON()
    }

    /**
     * Create a new instance of the ContactInformation class from a plain object
     */
    static fromPlainObject (plainObject: Partial<ContactInformationOutput>): ContactInformation {
        return new ContactInformation(plainObject)
    }
}
