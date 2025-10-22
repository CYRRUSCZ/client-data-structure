import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { getStringOrNull, transformDataBeforeValidation } from './helpers'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

/**
 * Input of the ContactInformation class that is used to create the object
 */
export interface ContactInformationInput {
    email: string | null
    phoneNumber: string | null
}

/**
 * Output of the ContactInformation class that is used to serialize the object to JSON
 */
export interface ContactInformationOutput {
    email: string | null
    phoneNumber: string | null
}

export interface ContactInformationJSONSchema extends JSONSchemaObject {
    type: 'object'
    properties: {
        email: JSONSchema
        phoneNumber: JSONSchema
    }

    required: string[]
}

/**
 * Class that represents a contact information
 */
export class ContactInformation extends AbstractBase {
    readonly #email: string | null = null
    readonly #phoneNumber: string | null = null

    constructor(
        input: Partial<ContactInformationInput> = {}
    ) {
        super()
        const {
            email,
            phoneNumber
        } = input
        this.#email = getStringOrNull(email)
        this.#phoneNumber = getStringOrNull(phoneNumber)
    }

    /**
     * Create a new instance of the ContactInformation class using positional arguments
     *
     * @param email The email address
     * @param phoneNumber The phone number
     */
    static create(
        email: string | null | undefined,
        phoneNumber: string | null | undefined
    ): ContactInformation {
        const plain: Partial<ContactInformationInput> = {
            email,
            phoneNumber
        }
        return new ContactInformation(plain)
    }

    /**
     * The primary email address
     */
    get email(): string | null {
        return this.#email
    }

    /**
     * The primary phone number
     */
    get phoneNumber(): string | null {
        return this.#phoneNumber
    }

    validate(input?: Record<string, any>): boolean {
        // Reset previous errors (bug 4)
        this._errors = []
        const validate = this.bootstrapValidator()
        const dataToBeValidated = transformDataBeforeValidation(input ?? this.toJSON())

        // Only validate phone number format if present (bug 7)
        if (dataToBeValidated.phoneNumber !== null && dataToBeValidated.phoneNumber !== undefined && dataToBeValidated.phoneNumber !== '') {
            try {
                ContactInformation.validatePhoneNumber(String(dataToBeValidated.phoneNumber))
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Invalid phone number'
                const errorObject = {
                    keyword: 'phoneNumber',
                    instancePath: '/phoneNumber',
                    schemaPath: '#/properties/phoneNumber/pattern',
                    params: {},
                    message
                }
                this._errors.push(errorObject)
            }
        }

        const isValid = validate(dataToBeValidated)
        if (!isValid && validate.errors) {
            this._errors.push(...validate.errors)
        }

        if (this._errors.length > 0) {
            const msg = this._errors.map(e => `${e.instancePath} ${e.message}`).join('\n')
            throw new Error(msg, { cause: this._errors })
        }

        return true
    }

    /**
     * Validate the phone number
     *
     * @param {string} phoneNumber The phone number to validate
     *
     * @throws {Error} If the phone number is not valid
     * @returns true if the phone number is valid
     */
    static validatePhoneNumber(phoneNumber: string): boolean {
        if (!phoneNumber) {
            throw new Error('Phone number is required')
        }

        const number = parsePhoneNumberFromString(phoneNumber)
        if (!number?.isValid()) {
            throw new Error('Invalid phone number')
        }

        return true
    }

    /**
     * Serialize the object to JSON
     */
    toJSON(): ContactInformationOutput {
        return {
            email: this.#email,
            phoneNumber: this.#phoneNumber
        }
    }

    toJSONSchema(): ContactInformationJSONSchema {
        return {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    format: 'email'
                },
                phoneNumber: {
                    type: 'string',
                    description: 'The phone number, must be provided with international prefix',
                    pattern: '^(\\()?\\+[0-9\\s]+(\\))?[0-9\\s]+$'
                }
            },
            // Removed non-existent 'phonePassword' from required (bug 2)
            required: ['email', 'phoneNumber']
        }
    }

    /**
     * Serialize the object to a plain object
     */
    toPlainObject(): ContactInformationOutput {
        return this.toJSON()
    }

    /**
     * Create a new instance of the ContactInformation class from a plain object
     */
    static fromPlainObject(plainObject: Partial<ContactInformationOutput>): ContactInformation {
        return new ContactInformation(plainObject)
    }
}
