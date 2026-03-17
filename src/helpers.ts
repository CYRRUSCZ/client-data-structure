import type { ContactInformation, IdCardInformation, PersonalInformation, Representative, AddressInformation, Address, CompanyInformation, ClientInformation, BankAccount, InvestmentParameter } from './index'
import { country3ToCountry2, country2ToCountry3 } from '@cyrrus/locale-utils'

export function getValidDate(inputDate: Date | string | null | undefined, throwInvalid = false): Date {
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

export function getNormalizedDate(inputDate: Date | string | null | undefined, throwInvalid = false): Date {
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

export function getStringOrNull(input: unknown): string | null {
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

export function getLegalIdOrNull(input: unknown): string | null {
    if (typeof input !== 'string') {
        return null
    }
    const sanitized = input.trim().toUpperCase().replace(/[^\dA-Z]/ig, '')
    return sanitized.length > 0 ? sanitized : null
}

export function getIso2CountryOrNull(input: unknown): string | null {
    if (typeof input === 'string') {
        const sanitized = input.trim().toUpperCase()
        if (/^[A-Z]{2}$/ig.test(sanitized) && country2ToCountry3(sanitized) !== null) {
            return sanitized
        }
        if (sanitized.length > 2) {
            return country3ToCountry2(sanitized)
        }
    }
    return null
}

export function isESClass(input: unknown): boolean {
    return (
        (typeof input === 'function')
        && (typeof input.constructor === 'function')
    )
}

export type SupportedClasses = Address | AddressInformation | ContactInformation | IdCardInformation | PersonalInformation | Representative | CompanyInformation | ClientInformation | BankAccount | InvestmentParameter

export function getInstanceOfClass<T extends SupportedClasses>(input: unknown, ClassInstancePrototype: any): T {
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

export function transformDataBeforeValidation(data: Record<string, any>): Record<string, any> {
    return Object
        .entries(data)
        .reduce<Record<string, unknown>>((acc, [key, value]: [string, unknown]) => {
            if (value && Array.isArray(value)) {
                value = value.map((item) => {
                    if (item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date)) {
                        return transformDataBeforeValidation(item as Record<string, unknown>)
                    }

                    if (item instanceof Date) {
                        return item.toISOString()
                    }

                    return item
                })
            }

            if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
                value = transformDataBeforeValidation(value)
            }

            if (value instanceof Date) {
                value = value.toISOString()
            }

            return Object.assign(acc, { [key]: value })
        }, {})
}
