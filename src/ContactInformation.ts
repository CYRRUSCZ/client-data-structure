import { getStringOrNull } from './helpers'

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

/**
 * Class that represents a contact information
 */
export class ContactInformation {
    readonly #email: string | null = null
    readonly #phoneNumber: string | null = null
    readonly #phonePassword: string | null = null

    constructor (
        input: Partial<ContactInformationInput> = {}
    ) {
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
