import type { JSONSchema } from './AbstractBase'
import { mod11_10 as mod1110 } from 'cdigit'
import type { InvestmentProfile, ContactInformation, IdCardInformation, PersonalInformation, Representative, AddressInformation, Address, CompanyInformation, ClientInformation, BankAccount, InvestmentParameter } from "./index"

export function getValidDate (inputDate: Date | string | null | undefined, throwInvalid = false): Date {
    if (inputDate instanceof Date) {
        return inputDate
    } else if (typeof inputDate === 'string') {
        const date = new Date(inputDate)
        if (date instanceof Date && !isNaN(date.valueOf())) {
            return date
        }
    }
    if (throwInvalid) {
        throw new Error('Input date is invalid')
    }
    return new Date()
}

export function getNormalizedDate (inputDate: Date | string | null | undefined, throwInvalid = false): Date {
    if (inputDate instanceof Date) {
        return new Date(`${inputDate.getFullYear()}-${inputDate.getMonth() + 1 < 10 ? '0' : ''}${inputDate.getMonth() + 1}-${inputDate.getDate() < 10 ? '0' : ''}${inputDate.getDate()}T12:00:00.000Z`)
    } else if (typeof inputDate === 'string') {
        if (/^(\d{4}-\d{2}-\d{2})$/ig.test(inputDate.replace(/\s/ig, ''))) {
            inputDate = `${inputDate.replace(/\s/ig, '')}T12:00:00.000Z`
        }
        if (inputDate.length === 24) {
            inputDate = `${inputDate.split('T')[0]}T12:00:00.000Z`
        }
        const date = new Date(inputDate)
        if (date instanceof Date && !isNaN(date.valueOf())) {
            return date
        }
    }
    if (throwInvalid) {
        throw new Error('Input date is invalid')
    }
    return new Date()
}

export function getStringOrNull (input: unknown): string | null {
    if (input === undefined || input === null) {
        return null
    }
    if (input instanceof Date) {
        return input.toISOString()
    }
    if (typeof input === 'object') {
        return JSON.stringify(input)
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- we know what we are doing
    const output = `${input}`.trim()
    return (output.length > 0) ? output : null
}

export function isESClass (input: unknown): boolean {
    return (
        (typeof input === 'function') &&
        (typeof input.constructor === 'function')
    )
}

export type SupportedClasses = Address | AddressInformation | ContactInformation | IdCardInformation | PersonalInformation | Representative | CompanyInformation | ClientInformation | BankAccount | InvestmentParameter | InvestmentProfile

export function getInstanceOfClass<T extends SupportedClasses> (input: unknown, ClassInstancePrototype: any): T {
    if (input === undefined || input === null) {
        return new ClassInstancePrototype() as T
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- we know what we are doing
    if (isESClass(input) && (input.constructor.name === ClassInstancePrototype.prototype.constructor.name)) {
        return input as T
    }

    if (input instanceof ClassInstancePrototype) {
        return input as T
    }

    return new ClassInstancePrototype(input)
}

export function generateBirthNumberJSONSchema (birthNumber: string, birthNumberCountryCode: string): JSONSchema {
    const schema: JSONSchema & { birthNumber: { anyOf: JSONSchema[] } } = {
        birthNumber: {
            anyOf: []
        }
    }

    const randomString = Math.random().toString(36).substring(7)
    if (birthNumberCountryCode === 'HRV') {
        const invalidSchema: JSONSchema = {
            type: 'string',
            description: 'Invalid HRV birth number guard',
            pattern: `^Internally validated, invalid HRV birth number guard (${randomString})$`
        }

        const numericValue = birthNumber.replace(/\D/ig, '')
        const isOIBValid = mod1110.validate(numericValue)
        if (numericValue.length === 11 && !isOIBValid) {
            schema.birthNumber.anyOf.push(invalidSchema)

            return schema
        }

        schema.birthNumber.anyOf.push({
            type: 'string',
            description: 'Birth number HRV',
            pattern: '^\\d{11}$'
        })

        return schema
    }

    if (birthNumberCountryCode === 'CZE' || birthNumberCountryCode === 'SVK') {
        const invalidSchema: JSONSchema = {
            type: 'string',
            description: 'Invalid CZE/SVK birth number guard',
            pattern: `^Internally validated, invalid CZE/SVK birth number guard (${randomString})$`
        }

        if (!birthNumber) {
            schema.birthNumber.anyOf.push(invalidSchema)

            return schema
        }

        const numericValue = birthNumber.replace(/\D/ig, '')
        if (numericValue.length < 9) {
            schema.birthNumber.anyOf.push(invalidSchema)

            return schema
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
                return invalidSchema
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
            schema.birthNumber.anyOf.push(invalidSchema)

            return schema
        }

        schema.birthNumber.anyOf.push({
            type: 'string',
            description: 'Internally validated birth number CZE/SVK, in schema liberally validated, https://phpfashion.com/cs/jak-overit-platne-ic-a-rodne-cislo',
            pattern: '^\\s*\\d{6}[ /]*\\d{3,4}\\s*$'
        })

        return schema
    }

    return schema
}

export enum AvailableLanguages {
    cs_CZ = 'cs_CZ',
    sk_SK = 'sk_SK',
    en_US = 'en_US',
    hr_HR = 'hr_HR'
}
