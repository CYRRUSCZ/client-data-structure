import { getValidDate, getStringOrNull } from './helpers.js'
import { countries } from '@cyrrus/locale-utils'

interface PersonalInformationInterface {
    prenominal: string|null,
    firstName: string|null,
    lastName: string|null,
    postnominal: string|null,
    birthNumber: string|null,
    dateOfBirth: Date|string|null,
    noBirthNumber: boolean,
    birthNumberCountry: string|null,
    taxDomicile: string|null,
    placeOfBirth: string|null,
    citizenship: string|null,
    gender: string|null,
    politician: boolean
}

export declare class PersonalInformation {
    constructor (
        input?: PersonalInformationInterface|Record<string, any>|null
    )

    static create (
        prenominal: string|null,
        firstName: string|null,
        lastName: string|null,
        postnominal: string|null,
        birthNumber: string|null,
        dateOfBirth: Date|string|null,
        noBirthNumber: boolean,
        birthNumberCountry: string|null,
        taxDomicile: string|null,
        placeOfBirth: string|null,
        citizenship: string|null,
        gender: string|null,
        politician: boolean
    ): PersonalInformation

    get fullName (): string

    get prenominal (): string|null

    get firstName (): string|null

    get lastName (): string|null

    get gender (): string|null

    get postnominal (): string|null

    get birthNumber (): string|null

    get dateOfBirth (): Date|null

    get noBirthNumber (): boolean

    get politician (): boolean

    get birthNumberCountry (): string|null

    get birthNumberCountryName (): string|null

    get taxDomicile (): string|null

    get taxDomicileCountryName (): string|null

    get placeOfBirth (): string|null

    get citizenship (): string|null

    get citizenshipCountryName (): string|null

    toJSON (): PersonalInformationInterface

    toPlainObject (): PersonalInformationInterface

    static fromPlainObject (
        plainObject: PersonalInformationInterface|Record<string, any>|null
    ): PersonalInformation
}
