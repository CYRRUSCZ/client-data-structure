import { type AvailableLanguages, getStringOrNull } from './helpers'
import { countriesLocalized } from '@cyrrus/locale-utils'
import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'

/**
 * Input of the Address class that is used to create the object
 */
export interface AddressInput {
    /** The name of the recipient */
    recipient: string | null

    /** The street name */
    street: string | null

    /** The street number */
    streetNumber: string | number | null

    /** The city name */
    city: string | null

    /** The country name */
    country: string | null

    /** The postal code */
    postalCode: string | number | null
}

/**
 * Output of the Address class that is used to serialize the object to JSON
 */
export interface AddressOutput extends AddressInput {

    /** The street number */
    streetNumber: string | null

    /** The postal code of address */
    postalCode: string | null
}

export interface AddressJSONSchema extends JSONSchemaObject {
    properties: {
        recipient: JSONSchema
        street: JSONSchema
        streetNumber: JSONSchema
        city: JSONSchema
        country: JSONSchema
        postalCode: JSONSchema
    },
    required: string[]
}

/**
 * Address class that represents a postal or residency address
 */
export class Address extends AbstractBase {
    readonly #recipient: string | null = null
    readonly #street: string | null = null
    readonly #streetNumber: string | null = null
    readonly #city: string | null = null
    readonly #country: string | null = null
    readonly #postalCode: string | null = null

    /**
     * Constructor of the Address class
     *
     * @param input object that is used to create the Address object
     */
    constructor (input: Partial<AddressInput> = {}) {
        super()
        const {
            recipient,
            street,
            streetNumber,
            city,
            country,
            postalCode
        } = input
        this.#recipient = getStringOrNull(recipient)
        this.#street = getStringOrNull(street)
        this.#city = getStringOrNull(city)
        this.#country = getStringOrNull(country)
        this.#postalCode = getStringOrNull(postalCode)
        this.#streetNumber = getStringOrNull(streetNumber)
    }

    /**
     * Static method that creates an Address object from positional parameters
     *
     * @param recipient
     * @param street
     * @param streetNumber
     * @param city
     * @param country
     * @param postalCode
     */
    static create (
        recipient: string | null| undefined,
        street: string | null | undefined,
        streetNumber: string | number | null | undefined,
        city: string | null | undefined,
        country: string | null | undefined,
        postalCode: string | number | null | undefined
    ): Address {
        const plain: Partial<AddressInput> = {
            recipient,
            street,
            streetNumber,
            city,
            country,
            postalCode
        }
        return new Address(plain)
    }

    /**
     * Getter that returns the full address as a string
     */
    get fullAddress (): string {
        const tmp = [
            this.#recipient,
            [this.#street, this.#streetNumber].filter(entry => entry).join(' '),
            this.#city,
            this.countryName,
            this.#postalCode
        ]
        return tmp.map(entry => typeof entry === 'string' ? entry.trim() : entry).filter(entry => entry).join(', ')
    }

    /**
     * Getter that returns the recipient of the address
     */
    get recipient (): string | null {
        return this.#recipient
    }

    /**
     * Getter that returns the street of the address
     */
    get street (): string | null {
        return this.#street
    }

    /**
     * Getter that returns the street number of the address
     */
    get streetNumber (): string | null {
        return this.#streetNumber
    }

    /**
     * Getter that returns the city of the address
     */
    get city (): string | null {
        return this.#city
    }

    /**
     * Getter that returns the country code of the address
     */
    get country (): string | null {
        return this.#country
    }

    /**
     * Getter that returns country name of the address in Czech
     */
    get countryName (): string | null {
        if (!this.#country) {
            return null
        }
        return countriesLocalized.cs_CZ[this.#country] ?? this.#country ?? null
    }

    /**
     * Getter that returns the postal code of the address
     */
    get postalCode (): string | null {
        return this.#postalCode
    }

    /**
     * Method that returns the postal code of the address in the specified locale
     * @param locale - string that represents the locale - e.g. 'cs_CZ', 'en_US'
     */
    localizedCountryName (locale: AvailableLanguages): string | null {
        if (!this.#country) {
            return null
        }
        return countriesLocalized[locale][this.#country] ?? this.#country ?? null
    }

    /**
     * Method that returns the full address in the specified locale
     * @param locale string that represents the locale - e.g. 'cs_CZ', 'en_US'
     */
    localizedFullAddress (locale: AvailableLanguages): string {
        const tmp = [
            this.#recipient,
            [this.#street, this.#streetNumber].filter(entry => entry).join(' '),
            this.#city,
            this.localizedCountryName(locale),
            this.#postalCode
        ]
        return tmp.map(entry => typeof entry === 'string' ? entry.trim() : entry).filter(entry => entry).join(', ')
    }

    /**
     * Method that returns the address as a plain object
     */
    toJSON (): AddressOutput {
        return {
            recipient: this.#recipient,
            street: this.#street,
            streetNumber: this.#streetNumber,
            city: this.#city,
            country: this.#country,
            postalCode: this.#postalCode
        }
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- This method is required by the AbstractBase class
    toJSONSchema (): AddressJSONSchema {
        return {
            type: 'object',
            properties: {
                recipient: {
                    type: 'string'
                },
                street: {
                    type: 'string'
                },
                streetNumber: {
                    type: 'string'
                },
                city: {
                    type: 'string'
                },
                country: {
                    type: 'string'
                },
                postalCode: {
                    type: 'string'
                }
            },
            required: [
                'recipient',
                'street',
                'streetNumber',
                'city',
                'country',
                'postalCode'
            ]
        }
    }

    /**
     * Method that returns the address as a plain object
     */
    toPlainObject (): AddressOutput {
        return this.toJSON()
    }

    /**
     * Static method that creates an Address object from a plain object
     *
     * @param plainObject - Partial<AddressInput> object that is used to create the Address instance
     */
    static fromPlainObject (plainObject: Partial<AddressInput>): Address {
        return new Address(plainObject)
    }
}
