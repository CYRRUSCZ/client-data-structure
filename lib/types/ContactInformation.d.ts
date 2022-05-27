import { getStringOrNull } from '../helpers.js'

export interface ContactInformationInterface {
    email: string|null,
    phoneNumber: string|null,
    phonePassword: string|null
}

export declare class ContactInformation {
    private _email: string|null
    private _phoneNumber: string|null
    private _phonePassword: string|null

    constructor (
        input?: ContactInformationInterface|Record<string, any>|null
    )

    static create (
        email: string|null,
        phoneNumber: string|null,
        phonePassword: string|null
    ): ContactInformation

    get email (): string|null

    get phoneNumber (): string|null

    get phonePassword (): string|null

    toJSON (): ContactInformationInterface

    toPlainObject (): ContactInformationInterface

    static fromPlainObject (
        plainObject: ContactInformationInterface|Record<string, any>|null
    ): ContactInformation
}
