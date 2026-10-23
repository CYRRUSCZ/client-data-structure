import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { getIso2CountryOrNull, getLegalIdOrNull, getNormalizedDate, getStringOrNull, transformDataBeforeValidation } from './helpers'
import { validateMod11_10 } from './validateMod11_10'
import { countriesLocalized, country2ToCountry3 } from '@cyrrus/locale-utils'
import { AvailableLanguages, SupportedGenderOptions } from './enums'
import { ClientDataDifference } from './ClientData'
import { PartialDeep } from 'type-fest'

/**
 * Input of the PersonalInformation class that is used to create the object
 */
export interface PersonalInformationInput {
    prenominal: string | null
    firstName: string | null
    lastName: string | null
    postnominal: string | null
    birthNumber: string | null
    dateOfBirth: Date | string | null
    noBirthNumber: boolean
    birthNumberCountry: string | null
    taxDomicile: string | null
    placeOfBirth: string | null
    citizenship: string | null
    gender: string | null
}

/**
 * Output of the PersonalInformation class that is used to serialize the object to JSON
 */
export interface PersonalInformationOutput {
    prenominal: string | null
    firstName: string | null
    lastName: string | null
    postnominal: string | null
    birthNumber: string | null
    dateOfBirth: Date | null
    noBirthNumber: boolean
    birthNumberCountry: string | null
    taxDomicile: string | null
    placeOfBirth: string | null
    citizenship: string | null
    gender: string | null
}

export interface PersonalInformationJSONSchema extends JSONSchemaObject {
    type: 'object'
    properties: {
        prenominal: JSONSchema
        firstName: JSONSchema
        lastName: JSONSchema
        postnominal: JSONSchema
        birthNumber?: JSONSchema
        dateOfBirth: JSONSchema
        noBirthNumber: JSONSchema
        birthNumberCountry: JSONSchema
        taxDomicile: JSONSchema
        placeOfBirth: JSONSchema
        citizenship: JSONSchema
        gender: JSONSchema
    }
    if: {
        properties: {
            noBirthNumber: JSONSchema
        }
    }
    then: {
        properties: {
            birthNumber: JSONSchema
        }
        allOf: Array<{
            if: JSONSchema
            then: {
                properties: {
                    birthNumber: JSONSchema
                }
            }
        }>
        required: string[]
    }
    required: string[]
}

/**
 * Class that represents personal information of a person
 */
export class PersonalInformation extends AbstractBase {
    readonly #prenominal: string | null = null
    readonly #firstName: string | null = null
    readonly #lastName: string | null = null
    readonly #postnominal: string | null = null
    readonly #birthNumber: string | null = null
    readonly #dateOfBirth: Date | null = null
    readonly #noBirthNumber: boolean = false
    readonly #birthNumberCountry: string | null = null
    readonly #taxDomicile: string | null = null
    readonly #placeOfBirth: string | null = null
    readonly #citizenship: string | null = null
    readonly #gender: string | null = null

    constructor(
        input: PartialDeep<PersonalInformationInput> = {}
    ) {
        super()
        const {
            prenominal,
            firstName,
            lastName,
            postnominal,
            birthNumber,
            dateOfBirth,
            noBirthNumber,
            birthNumberCountry,
            taxDomicile,
            placeOfBirth,
            citizenship,
            gender
        } = input
        this.#prenominal = getStringOrNull(prenominal)
        this.#firstName = getStringOrNull(firstName)
        this.#lastName = getStringOrNull(lastName)
        this.#postnominal = getStringOrNull(postnominal)
        this.#birthNumber = getLegalIdOrNull(birthNumber)
        this.#dateOfBirth = getNormalizedDate(dateOfBirth)
        this.#noBirthNumber = (noBirthNumber === true)
        this.#birthNumberCountry = getIso2CountryOrNull(birthNumberCountry)
        this.#taxDomicile = getIso2CountryOrNull(taxDomicile)
        this.#placeOfBirth = getStringOrNull(placeOfBirth)
        this.#citizenship = getIso2CountryOrNull(citizenship)
        this.#gender = getStringOrNull(gender)
    }

    /**
     * Creates a new instance of the PersonalInformation class using positional arguments
     *
     * @param prenominal prenominal title of the person
     * @param firstName first name of the person
     * @param lastName last name of the person
     * @param postnominal postnominal title of the person
     * @param birthNumber birth number of the person
     * @param dateOfBirth date of birth of the person
     * @param noBirthNumber flag that indicates if the birth number is not available
     * @param birthNumberCountry country of the birth number
     * @param taxDomicile country of the tax domicile
     * @param placeOfBirth place of birth of the person
     * @param citizenship country of the citizenship
     */
    static create(
        prenominal: string | null | undefined,
        firstName: string | null | undefined,
        lastName: string | null | undefined,
        postnominal: string | null | undefined,
        birthNumber: string | null | undefined,
        dateOfBirth: Date | string | null | undefined,
        noBirthNumber: boolean | undefined,
        birthNumberCountry: string | null | undefined,
        taxDomicile: string | null | undefined,
        placeOfBirth: string | null | undefined,
        citizenship: string | null | undefined,
        gender: string | null | undefined
    ): PersonalInformation {
        const plain: PartialDeep<PersonalInformationInput> = {
            prenominal,
            firstName,
            lastName,
            postnominal,
            birthNumber,
            dateOfBirth,
            noBirthNumber,
            birthNumberCountry,
            taxDomicile,
            placeOfBirth,
            citizenship,
            gender
        }
        return new PersonalInformation(plain)
    }

    /**
     * Full name of the person
     */
    get fullName(): string {
        const parts = [
            this.prenominal,
            this.firstName,
            this.lastName,
            this.postnominal
        ]
        return parts.map(item => typeof item === 'string' ? item.trim() : item).filter(item => item).join(' ')
    }

    /**
     * Prenominal title of the person
     */
    get prenominal(): string | null {
        return this.#prenominal
    }

    /**
     * First name of the person
     */
    get firstName(): string | null {
        return this.#firstName
    }

    /**
     * Last name of the person
     */
    get lastName(): string | null {
        return this.#lastName
    }

    /**
     * Postnominal title of the person
     */
    get gender(): string | null {
        return this.#gender
    }

    /**
     * Postnominal title of the person
     */
    get postnominal(): string | null {
        return this.#postnominal
    }

    /**
     * Birth number of the person
     */
    get birthNumber(): string | null {
        return this.#birthNumber
    }

    /**
     * Date of birth of the person
     */
    get dateOfBirth(): Date | null {
        return this.#dateOfBirth
    }

    /**
     * Flag that indicates if the birth number is not available
     */
    get noBirthNumber(): boolean {
        return this.#noBirthNumber
    }

    /**
     * Country of the birth number
     */
    get birthNumberCountry(): string | null {
        return this.#birthNumberCountry
    }

    /**
     * Country of the birth number
     */
    get birthNumberCountryName(): string | null {
        if (!this.#birthNumberCountry) {
            return null
        }
        if (typeof this.#birthNumberCountry !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#birthNumberCountry)
        if (countryAlpha3 !== null && countryAlpha3 in countriesLocalized.cs_CZ) {
            return countriesLocalized.cs_CZ[countryAlpha3]
        }
        return this.#birthNumberCountry ?? null
    }

    /**
     * Country of the birth number in the specified locale
     * @param locale - string that represents the locale
     */
    localizedBirthNumberCountryName(locale: AvailableLanguages): string | null {
        if (!this.#birthNumberCountry) {
            return null
        }
        if (typeof this.#birthNumberCountry !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#birthNumberCountry)
        if (locale in countriesLocalized && countryAlpha3 !== null && countryAlpha3 in countriesLocalized[locale]) {
            return countriesLocalized[locale][countryAlpha3]
        }
        return this.#birthNumberCountry ?? null
    }

    /**
     * Country of the tax domicile
     */
    get taxDomicile(): string | null {
        return this.#taxDomicile
    }

    /**
     * Country of the tax domicile
     */
    get taxDomicileCountryName(): string | null {
        if (!this.#taxDomicile) {
            return null
        }
        if (typeof this.#taxDomicile !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#taxDomicile)
        if (countryAlpha3 !== null && countryAlpha3 in countriesLocalized.cs_CZ) {
            return countriesLocalized.cs_CZ[countryAlpha3]
        }
        return this.#taxDomicile ?? null
    }

    /**
     * Country of the tax domicile in the specified locale
     * @param locale - string that represents the locale
     */
    localizedTaxDomicileCountryName(locale: AvailableLanguages): string | null {
        if (!this.#taxDomicile) {
            return null
        }
        if (typeof this.#taxDomicile !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#taxDomicile)
        if (locale in countriesLocalized && countryAlpha3 !== null && countryAlpha3 in countriesLocalized[locale]) {
            return countriesLocalized[locale][countryAlpha3]
        }
        return this.#taxDomicile ?? null
    }

    /**
     * Place of birth of the person
     */
    get placeOfBirth(): string | null {
        return this.#placeOfBirth
    }

    /**
     * Country of the citizenship
     */
    get citizenship(): string | null {
        return this.#citizenship
    }

    /**
     * Country of the citizenship
     */
    get citizenshipCountryName(): string | null {
        if (!this.#citizenship) {
            return null
        }
        if (typeof this.#citizenship !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#citizenship)
        if (countryAlpha3 !== null && countryAlpha3 in countriesLocalized.cs_CZ) {
            return countriesLocalized.cs_CZ[countryAlpha3]
        }
        return this.#citizenship ?? null
    }

    /**
     * Country of the citizenship in the specified locale
     * @param locale - string that represents the locale
     */
    localizedCitizenshipCountryName(locale: AvailableLanguages): string | null {
        if (!this.#citizenship) {
            return null
        }
        if (typeof this.#citizenship !== 'string') {
            return null
        }
        const countryAlpha3 = country2ToCountry3(this.#citizenship)
        if (locale in countriesLocalized && countryAlpha3 !== null && countryAlpha3 in countriesLocalized[locale]) {
            return countriesLocalized[locale][countryAlpha3]
        }
        return this.#citizenship ?? null
    }

    validate(input?: Record<string, any>): boolean {
        // Reset previous errors before validation
        this._errors = []
        const validate = this.bootstrapValidator()
        const dataToBeValidated = transformDataBeforeValidation(input ?? this.toJSON())

        // Only validate birth number when using instance data (not an externally provided POJO),
        // and only when all required fields are present and noBirthNumber is false.
        const birthNumberToValidate = input === undefined ? this.#birthNumber : null
        const birthNumberCountryToValidate = input === undefined ? this.#birthNumberCountry : null
        const skipBirthNumberValidation = this.#noBirthNumber
            || birthNumberToValidate === null
            || birthNumberCountryToValidate === null

        if (!skipBirthNumberValidation) {
            try {
                PersonalInformation.validateBirthNumber(String(birthNumberToValidate), String(birthNumberCountryToValidate))
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Invalid birth number'
                const errorObject = {
                    instancePath: '/birthNumber',
                    keyword: 'birthNumber',
                    schemaPath: '',
                    params: {},
                    message: errorMessage
                }
                this._errors.push(errorObject)

                throw new Error(errorMessage, { cause: error })
            }
        }

        const isValid = validate(dataToBeValidated)
        if (!isValid) {
            const { errors } = validate
            let errorsAsString = ''
            if (errors && errors.length > 0) {
                errorsAsString = errors.map(error => `${error.instancePath} ${error.message}`).join('\n')
                this._errors.push(...errors)
            }

            throw new Error(errorsAsString, { cause: this._errors })
        }

        return isValid
    }

    static validateBirthNumber(birthNumber: string, birthNumberCountryCode: string): boolean {
        const countryCode = getIso2CountryOrNull(String(birthNumberCountryCode).trim().toUpperCase())
        if (countryCode === null) {
            throw new Error('Invalid birth number country code')
        }
        birthNumberCountryCode = countryCode

        if (birthNumberCountryCode === 'HR') {
            const numericValue = birthNumber.replace(/\D/ig, '')
            // HRV OIB must be exactly 11 digits
            if (numericValue.length !== 11) {
                throw new Error('Invalid HRV birth number - must be 11 digits')
            }
            const isOIBValid = validateMod11_10(numericValue)
            if (!isOIBValid) {
                throw new Error('Invalid HRV birth number - checksum failed')
            }

            return true
        }

        if (birthNumberCountryCode === 'CZ' || birthNumberCountryCode === 'SK') {
            if (birthNumber === '') {
                throw new Error('Invalid CZ/SK birth number')
            }

            const numericValue = birthNumber.replace(/\D/ig, '')
            if (numericValue.length < 9) {
                throw new Error('Invalid CZ/SK birth number')
            }
            let year = parseInt(numericValue.substring(0, 2))
            let month = parseInt(numericValue.substring(2, 4))
            const day = parseInt(numericValue.substring(4, 6))
            const c = (numericValue.length === 9) ? null : parseInt(numericValue.substring(numericValue.length - 1))

            if (c === null) {
                year += year < 54 ? 1900 : 1800
            } else {
                let mod = parseInt(numericValue.substring(0, 9)) % 11
                if (mod === 10) {
                    mod = 0
                }
                if (mod !== c) {
                    throw new Error('Invalid CZ/SK birth number')
                }

                year += year < 54 ? 2000 : 1900
            }

            if (month > 70 && year > 2003) {
                month -= 70
            } else if (month > 50) {
                month -= 50
            } else if (month > 20 && year > 2003) {
                month -= 20
            }

            const date = new Date(year, month - 1, day)
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                throw new Error('Invalid CZ/SK birth number')
            }

            return true
        }

        return true
    }

    /**
     * Returns the personal information as a JSON object
     */
    toJSON(): PersonalInformationOutput {
        return {
            prenominal: this.#prenominal,
            firstName: this.#firstName,
            lastName: this.#lastName,
            postnominal: this.#postnominal,
            birthNumber: this.#birthNumber,
            dateOfBirth: this.#dateOfBirth,
            noBirthNumber: this.#noBirthNumber,
            birthNumberCountry: this.#birthNumberCountry,
            taxDomicile: this.#taxDomicile,
            placeOfBirth: this.#placeOfBirth,
            citizenship: this.#citizenship,
            gender: this.#gender
        }
    }

    toJSONSchema(): PersonalInformationJSONSchema {
        return {
            type: 'object',
            properties: {
                prenominal: {
                    type: ['string', 'null']
                },
                firstName: {
                    type: 'string'
                },
                lastName: {
                    type: 'string'
                },
                postnominal: {
                    type: ['string', 'null']
                },
                dateOfBirth: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Checks only if birth date is in the past',
                    formatMaximum: (() => {
                        const now = new Date()
                        const year = now.getUTCFullYear() - 1
                        const month = now.getUTCMonth()
                        const day = now.getUTCDate()
                        return new Date(Date.UTC(year, month, day, 12, 0, 0, 0)).toISOString()
                    })()
                },
                noBirthNumber: {
                    type: 'boolean'
                },
                birthNumberCountry: {
                    type: 'string'
                },
                taxDomicile: {
                    type: 'string'
                },
                placeOfBirth: {
                    type: 'string'
                },
                citizenship: {
                    type: 'string'
                },
                gender: {
                    type: 'string',
                    enum: Object.values(SupportedGenderOptions)
                }
            },
            if: {
                properties: {
                    noBirthNumber: {
                        const: false
                    }
                }
            },
            // A birth number format is known only for CZ, SK and HR, any other country accepts any value.
            // oxlint-disable-next-line no-thenable
            then: {
                properties: {
                    birthNumber: {
                        type: 'string'
                    }
                },
                allOf: [
                    {
                        if: {
                            properties: {
                                birthNumberCountry: {
                                    enum: ['HR', 'HRV']
                                }
                            },
                            required: ['birthNumberCountry']
                        },
                        // oxlint-disable-next-line no-thenable
                        then: {
                            properties: {
                                birthNumber: {
                                    type: 'string',
                                    pattern: '^\\d{11}$'
                                }
                            }
                        }
                    },
                    {
                        if: {
                            properties: {
                                birthNumberCountry: {
                                    enum: ['CZ', 'CZE', 'SK', 'SVK']
                                }
                            },
                            required: ['birthNumberCountry']
                        },
                        // oxlint-disable-next-line no-thenable
                        then: {
                            properties: {
                                birthNumber: {
                                    type: 'string',
                                    pattern: '^\\s*\\d{6}[ /]*\\d{3,4}\\s*$'
                                }
                            }
                        }
                    }
                ],
                required: ['birthNumber']
            },
            required: [
                'firstName',
                'lastName',
                'dateOfBirth',
                'birthNumberCountry',
                'taxDomicile',
                'citizenship',
                'placeOfBirth',
                'gender'
            ]
        }
    }

    /**
     * Converts the personal information to a plain object
     */
    toPlainObject(): PersonalInformationOutput {
        return this.toJSON()
    }

    /**
     * Converts a plain object to a PersonalInformation instance
     */
    static fromPlainObject(plainObject: PartialDeep<PersonalInformationInput> = {}): PersonalInformation {
        return new PersonalInformation(plainObject)
    }

    compareWith(personalInformation: PartialDeep<PersonalInformationOutput>): ClientDataDifference[] {
        const differences: ClientDataDifference[] = []
        const ownKeys = Object.keys(this.toJSON())
        const currentEntries = Object.entries(this.toJSON())
        const passedEntries = Object.entries(personalInformation).filter(([key, value]) => value !== undefined && ownKeys.includes(key))
        for (const [modifiedKey, modifiedValue] of passedEntries) {
            const current = currentEntries.find(([currentKey]) => currentKey === modifiedKey)
            if (current) {
                const [, currentValue] = current
                if (modifiedKey === 'dateOfBirth' && typeof modifiedValue !== 'boolean') {
                    const currentDate = getNormalizedDate(currentValue)
                    const modifiedDate = getNormalizedDate(modifiedValue)
                    if (currentDate.getTime() !== modifiedDate.getTime()) {
                        differences.push({
                            path: modifiedKey,
                            originalValue: currentValue,
                            changedValue: modifiedValue
                        })
                    }
                    continue
                }
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
}
