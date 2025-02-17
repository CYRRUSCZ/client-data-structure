import { IsBoolean, IsOptional } from 'class-validator'
import { Address, type AddressInput, type AddressOutput } from './Address'
import { AbstractValidationAware } from './AbstractValidationAware'
import type { SchemaObjectWithProperties } from './Interfaces/SchemaObject'

/**
 * Input of the AddressInformation class that is used to create the object
 */
export interface AddressInformationInput {
    /**
     * The residency address
     */
    address: Address | Partial<AddressInput>

    /**
     * The mailing address
     */
    mailingAddress: Address | Partial<AddressInput>

    /**
     * Flag that indicates if the mailing address should be used as the postal address
     */
    useMailingAddress?: boolean
}

export interface AddressInformationOutput {
    /**
     * The residency address
     */
    address: AddressOutput

    /**
     * The mailing address
     */
    mailingAddress: AddressOutput

    /**
     * Flag that indicates if the mailing address should be used as the postal address
     */
    useMailingAddress: boolean
}

export const ADDRESS_TYPE_REGULAR = 'address'
export const ADDRESS_TYPE_MAILING = 'mailingAddress'

/**
 * Class that represents an postal and residency address information
 */
export class AddressInformation extends AbstractValidationAware {
    readonly #address: Address
    readonly #mailingAddress: Address
    readonly #useMailingAddress: boolean

    constructor (input: Partial<AddressInformationInput> = {}) {
        super()
        const {
            address,
            mailingAddress,
            useMailingAddress = false
        } = input
        this.#address = (address instanceof Address) ? address : new Address(address ?? {})
        this.#mailingAddress = (mailingAddress instanceof Address) ? mailingAddress : new Address(mailingAddress ?? {})
        this.#useMailingAddress = (useMailingAddress)
    }

    /**
     * Creates an AddressInformation object from positional arguments
     *
     * @param address residency address information
     * @param mailingAddress mailing address information
     * @param useMailingAddress flag that indicates if the mailing address should be used as the postal address
     */
    static create (
        address: Address | Partial<AddressInput> | null | undefined,
        mailingAddress: Address | Partial<AddressInput> | null | undefined,
        useMailingAddress = false
    ): AddressInformation {
        const plain: Partial<AddressInformationInput> = {
            useMailingAddress
        }
        plain[ADDRESS_TYPE_REGULAR] = address ?? {}
        plain[ADDRESS_TYPE_MAILING] = mailingAddress ?? {}
        return new AddressInformation(plain)
    }

    /**
     * Returns the JSON schema of the object
     */
    toJSONSchema (): SchemaObjectWithProperties {
        const jsonSchema = super.toJSONSchema()
        const properties = {
            ...jsonSchema.properties,
            [ADDRESS_TYPE_REGULAR]: this.#address.toJSONSchema(),
            [ADDRESS_TYPE_MAILING]: this.#useMailingAddress ? this.#mailingAddress.toStrictJSONSchema() : {}
        }

        return { ...jsonSchema, properties }
    }

    /**
     * The residency address
     */
    get address (): Address {
        return this.#address
    }

    /**
     * The mailing address
     */
    get mailingAddress (): Address {
        return this.#mailingAddress
    }

    /**
     * Flag that indicates if the mailing address should be used as the postal address
     */
    get useMailingAddress (): boolean {
        return this.#useMailingAddress
    }

    /**
     * Converts the AddressInformation object to a plain object
     */
    toJSON (): AddressInformationOutput {
        const plainObject: AddressInformationOutput = {
            [ADDRESS_TYPE_REGULAR]: this.address.toPlainObject(),
            [ADDRESS_TYPE_MAILING]: this.mailingAddress.toPlainObject(),
            useMailingAddress: this.useMailingAddress
        }
        return plainObject
    }

    /**
     * Converts a plain object to an AddressInformation object
     */
    toPlainObject (): AddressInformationOutput {
        return this.toJSON()
    }

    /**
     * Creates an AddressInformation object from a plain object
     *
     * @param plainObject the plain object that is used to create the AddressInformation object
     */
    static fromPlainObject (plainObject: Partial<AddressInformationOutput>): AddressInformation {
        return new AddressInformation(plainObject)
    }

    static get ADDRESS_TYPE_REGULAR (): 'address' {
        return ADDRESS_TYPE_REGULAR
    }

    static get ADDRESS_TYPE_MAILING (): 'mailingAddress' {
        return ADDRESS_TYPE_MAILING
    }

    static get PLAIN_OBJECT_ADDRESS_TYPES (): ['address', 'mailingAddress'] {
        return [
            AddressInformation.ADDRESS_TYPE_REGULAR,
            AddressInformation.ADDRESS_TYPE_MAILING
        ]
    }
}

export class AddressInformationValidation {
    address: Address | Partial<AddressInput> = {}
    mailingAddress: Address | Partial<AddressInput> = {}
    @IsBoolean()
    @IsOptional()
    useMailingAddress?: boolean = false
}
