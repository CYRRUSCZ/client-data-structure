import { getStringOrNull, getNormalizedDate } from './helpers'
import { countries } from '@cyrrus/locale-utils'

/**
 * Input of the IdCardInformation class that is used to create the object
 */
export interface IdCardInformationInput {
    number: string | null | undefined
    issuedBy: string | null | undefined
    country: string | null | undefined
    validity: Date | string | null | undefined
    type: string | null | undefined
    scanNotAllowed?: boolean
}

/**
 * Output of the IdCardInformation class that is used to serialize the object to JSON
 */
export interface IdCardInformationOutput {
    number: string | null
    issuedBy: string | null
    country: string | null
    validity: Date | null
    type: string | null
    scanNotAllowed: boolean
}

/**
 * Class that represents an identification card information
 */
export class IdCardInformation {
    readonly #number: string | null = null
    readonly #issuedBy: string | null = null
    readonly #country: string | null = null
    readonly #validity: Date | null = null
    readonly #type: string | null = null
    readonly #scanNotAllowed: boolean = false

    constructor (
        input: Partial<IdCardInformationInput> = {}
    ) {
        const {
            number,
            issuedBy,
            country,
            validity,
            type,
            scanNotAllowed = false
        } = input
        this.#number = getStringOrNull(number)
        this.#issuedBy = getStringOrNull(issuedBy)
        this.#country = getStringOrNull(country)
        this.#validity = getNormalizedDate(validity)
        this.#type = getStringOrNull(type)
        this.#scanNotAllowed = scanNotAllowed
    }

    /**
     * Create a new instance of the IdCardInformation class using positional arguments
     *
     * @param number identification card number
     * @param issuedBy the authority that issued the identification card
     * @param country the country code of the identification card
     * @param validity the validity of the identification card
     * @param type the type of the identification card
     * @param scanNotAllowed if the identification card cannot be scanned
     */
    static create (
        number: string | null | undefined,
        issuedBy: string | null | undefined,
        country: string | null | undefined,
        validity: Date | string | null | undefined,
        type: string | null | undefined,
        scanNotAllowed: boolean | undefined = false
    ): IdCardInformation {
        const plain: Partial<IdCardInformationInput> = {
            number,
            issuedBy,
            country,
            validity,
            type,
            scanNotAllowed
        }
        return new IdCardInformation(plain)
    }

    /**
     * Identification card number
     */
    get number (): string | null {
        return this.#number
    }

    /**
     * The authority that issued the identification card
     */
    get issuedBy (): string | null {
        return this.#issuedBy
    }

    /**
     * The country code of the identification card
     */
    get country (): string | null {
        return this.#country
    }

    /**
     * The validity of the identification card
     */
    get countryName (): string | null {
        if (this.#country === null) {
            return null
        }
        return countries[this.#country] ?? this.#country
    }

    /**
     * The validity of the identification card
     */
    get validity (): Date | null {
        return this.#validity
    }

    /**
     * The type of the identification card
     */
    get type (): string | null {
        return this.#type
    }

    /**
     * Flag indicating that identification card cannot be scanned
     */
    get scanNotAllowed (): boolean {
        return this.#scanNotAllowed
    }

    /**
     * Converts the IdCardInformation object to a plain object
     */
    toJSON (): IdCardInformationOutput {
        return {
            number: this.#number,
            issuedBy: this.#issuedBy,
            country: this.#country,
            validity: this.#validity,
            type: this.#type,
            scanNotAllowed: this.#scanNotAllowed
        }
    }

    /**
     * Converts the IdCardInformation object to a plain object
     */
    toPlainObject (): IdCardInformationOutput {
        return this.toJSON()
    }

    /**
     * Converts a plain object to an IdCardInformation object
     */
    static fromPlainObject (plainObject: Partial<IdCardInformationOutput>): IdCardInformation {
        return new IdCardInformation(plainObject)
    }
}
