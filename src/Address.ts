import { getIso2CountryOrNull, getStringOrNull } from './helpers'
import { countriesLocalized, country2ToCountry3 } from '@cyrrus/locale-utils'
import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { AvailableLanguages } from './enums'
import { ClientDataDifference } from './ClientData'
import { PartialDeep } from 'type-fest'

/**
 * Input of the Address class that is used to create the object
 */
export interface AddressInput {
    /** The unique identifier for the address in cytron */
    cytronId?: string | null

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
        cytronId: JSONSchema
        street: JSONSchema
        streetNumber: JSONSchema
        city: JSONSchema
        country: JSONSchema
        postalCode: JSONSchema
    }
    required: string[]
}

/**
 * Address class that represents a postal or residency address
 */
export class Address extends AbstractBase {
    readonly #cytronId: string | null = null
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
    constructor(input: PartialDeep<AddressInput> = {}) {
        super()
        const {
            cytronId,
            street,
            streetNumber,
            city,
            country,
            postalCode
        } = input
        this.#cytronId = getStringOrNull(cytronId)
        this.#street = getStringOrNull(street)
        this.#city = getStringOrNull(city)
        this.#country = getIso2CountryOrNull(country)
        this.#postalCode = getStringOrNull(postalCode)
        this.#streetNumber = getStringOrNull(streetNumber)
    }

    /**
     * Static method that creates an Address object from positional parameters
     *
     * @param cytronId
     * @param street
     * @param streetNumber
     * @param city
     * @param country
     * @param postalCode
     */
    static create(
        cytronId: string | null | undefined,
        street: string | null | undefined,
        streetNumber: string | number | null | undefined,
        city: string | null | undefined,
        country: string | null | undefined,
        postalCode: string | number | null | undefined
    ): Address {
        const plain: PartialDeep<AddressInput> = {
            cytronId,
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
    get fullAddress(): string {
        const tmp = [
            [this.#street, this.#streetNumber].filter(entry => entry).join(' '),
            this.#city,
            this.countryName,
            this.#postalCode
        ]
        return tmp.map(entry => typeof entry === 'string' ? entry.trim() : entry).filter(entry => entry).join(', ')
    }

    /**
     * Getter that returns the cytronId of the address
     */
    get cytronId(): string | null {
        return this.#cytronId
    }

    /**
     * Getter that returns the street of the address
     */
    get street(): string | null {
        return this.#street
    }

    /**
     * Getter that returns the street number of the address
     */
    get streetNumber(): string | null {
        return this.#streetNumber
    }

    /**
     * Getter that returns the city of the address
     */
    get city(): string | null {
        return this.#city
    }

    /**
     * Getter that returns the country code of the address
     */
    get country(): string | null {
        return this.#country
    }

    /**
     * Getter that returns country name of the address in Czech
     */
    get countryName(): string | null {
        if (!this.#country) {
            return null
        }
        if (typeof this.#country !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#country)
        if (countryAlpha3 !== null && countryAlpha3 in countriesLocalized.cs_CZ) {
            return countriesLocalized.cs_CZ[countryAlpha3]
        }
        return this.#country ?? null
    }

    /**
     * Getter that returns the postal code of the address
     */
    get postalCode(): string | null {
        return this.#postalCode
    }

    /**
     * Method that returns the postal code of the address in the specified locale
     * @param locale - string that represents the locale - e.g. 'cs_CZ', 'en_US'
     */
    localizedCountryName(locale: AvailableLanguages): string | null {
        if (!this.#country) {
            return null
        }
        if (typeof this.#country !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#country)
        if (locale in countriesLocalized && countryAlpha3 !== null && countryAlpha3 in countriesLocalized[locale]) {
            return countriesLocalized[locale][countryAlpha3]
        }
        return this.#country ?? null
    }

    /**
     * Method that returns the full address in the specified locale
     * @param locale string that represents the locale - e.g. 'cs_CZ', 'en_US'
     */
    localizedFullAddress(locale: AvailableLanguages): string {
        const tmp = [
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
    toJSON(): AddressOutput {
        return {
            cytronId: this.#cytronId,
            street: this.#street,
            streetNumber: this.#streetNumber,
            city: this.#city,
            country: this.#country,
            postalCode: this.#postalCode
        }
    }

    compareWith(address: PartialDeep<AddressOutput>): ClientDataDifference[] {
        const differences: ClientDataDifference[] = []
        const ownKeys = Object.keys(this.toJSON())
        const currentEntries = Object.entries(this.toJSON())
        const passedEntries = Object.entries(address).filter(([key, value]) => value !== undefined && ownKeys.includes(key))
        for (const [modifiedKey, modifiedValue] of passedEntries) {
            const current = currentEntries.find(([currentKey]) => currentKey === modifiedKey)
            if (current) {
                const [, currentValue] = current
                if (currentValue !== modifiedValue) {
                    differences.push({
                        path: modifiedKey,
                        originalValue: currentValue,
                        changedValue: modifiedValue
                    })
                }
            }
        }
        return differences
    }

    toJSONSchema(): AddressJSONSchema {
        return {
            type: 'object',
            properties: {
                cytronId: {
                    type: 'string',
                    nullable: true
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
    toPlainObject(): AddressOutput {
        return this.toJSON()
    }

    /**
     * Static method that creates an Address object from a plain object
     *
     * @param plainObject - PartialDeep<AddressInput> object that is used to create the Address instance
     */
    static fromPlainObject(plainObject: PartialDeep<AddressInput>): Address {
        return new Address(plainObject)
    }
}
