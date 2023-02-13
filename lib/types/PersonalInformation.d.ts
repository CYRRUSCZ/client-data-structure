export interface BasePersonalInformationInterface {
    prenominal: string|null
    firstName: string|null
    lastName: string|null
    postnominal: string|null
    birthNumber: string|null
    noBirthNumber: boolean
    birthNumberCountry: string|null
    taxDomicile: string|null
    placeOfBirth: string|null
    citizenship: string|null
    gender: string|null
    politician: boolean
}

export interface PersonalInformationInterfaceInput extends BasePersonalInformationInterface {
    dateOfBirth: Date|string|null
}

export interface PersonalInformationInterfaceOutput extends BasePersonalInformationInterface {
    dateOfBirth: Date
}

export declare class PersonalInformation {
    private _prenominal: string|null
    private _firstName: string|null
    private _lastName: string|null
    private _postnominal: string|null
    private _birthNumber: string|null
    private _dateOfBirth: Date
    private _noBirthNumber: boolean
    private _birthNumberCountry: string|null
    private _taxDomicile: string|null
    private _placeOfBirth: string|null
    private _citizenship: string|null
    private _fullName: string|null
    private _gender: string|null
    private _politician: boolean

    constructor (
        input?: Partial<PersonalInformationInterfaceInput>
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

    toJSON (): PersonalInformationInterfaceOutput

    toPlainObject (): PersonalInformationInterfaceOutput

    static fromPlainObject (
        plainObject?: Partial<PersonalInformationInterfaceInput>
    ): PersonalInformation
}
