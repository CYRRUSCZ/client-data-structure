import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { getStringOrNull, transformDataBeforeValidation } from './helpers'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

/**
 * Input of the RepresentativeContactInformation class that is used to create the object
 */
export interface RepresentativeContactInformationInput {
    email: string | null
    phoneNumber: string | null
}

/**
 * Output of the RepresentativeContactInformation class that is used to serialize the object to JSON
 */
export interface RepresentativeContactInformationOutput {
    email: string | null
    phoneNumber: string | null
}

export interface RepresentativeContactInformationJSONSchema extends JSONSchemaObject {
    type: 'object',
    properties: {
        email: JSONSchema,
        phoneNumber: JSONSchema
    }
    required: string[]
}

/**
 * Class that represents a representative contact information
 */
export class RepresentativeContactInformation extends AbstractBase {
    readonly #email: string | null = null
    readonly #phoneNumber: string | null = null

    constructor (
        input: Partial<RepresentativeContactInformationInput> = {}
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
     * Create a new instance of the RepresentativeContactInformation class using positional arguments
     *
     * @param email The email address
     * @param phoneNumber The phone number
     */
    static create (
        email: string | null | undefined,
        phoneNumber: string | null | undefined,
    ): RepresentativeContactInformation {
        const plain: Partial<RepresentativeContactInformationInput> = {
            email,
            phoneNumber
        }
        return new RepresentativeContactInformation(plain)
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

    validate (input?: Record<string, any>): boolean {
        const validate = this.bootstrapValidator()
        const dataToBeValidated = transformDataBeforeValidation(input ?? this.toJSON())

        try {
            RepresentativeContactInformation.validatePhoneNumber(String(dataToBeValidated.phoneNumber ?? ''))
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

            throw new Error(errorObject.message, { cause: this._errors })
        }

        const isValid = validate(dataToBeValidated)
        if (!isValid) {
            const { errors } = validate
            let errorsAsString = ''
            if (errors && errors.length > 0) {
                errorsAsString = errors.map((error) => `${error.instancePath} ${error.message}`).join('\n')
                this._errors.push(...errors)
            }

            throw new Error(errorsAsString, { cause: this._errors })
        }

        return isValid
    }

    /**
     * Validate the phone number
     *
     * @param {string} phoneNumber The phone number to validate
     *
     * @throws {Error} If the phone number is not valid
     * @returns true if the phone number is valid
     */
    static validatePhoneNumber (phoneNumber: string): boolean {
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
    toJSON (): RepresentativeContactInformationOutput {
        return {
            email: this.#email,
            phoneNumber: this.#phoneNumber
        }
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- This method is required by the AbstractBase class
    toJSONSchema (): RepresentativeContactInformationJSONSchema {
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
            required: ['email', 'phoneNumber']
        }
    }

    /**
     * Serialize the object to a plain object
     */
    toPlainObject (): RepresentativeContactInformationOutput {
        return this.toJSON()
    }

    /**
     * Create a new instance of the RepresentativeContactInformation class from a plain object
     */
    static fromPlainObject (plainObject: Partial<RepresentativeContactInformationOutput>): RepresentativeContactInformation {
        return new RepresentativeContactInformation(plainObject)
    }
}
