export interface ContactInformationInterface {
    email: string|null
    phoneNumber: string|null
    phonePassword: string|null
}

export declare class ContactInformation {
    private _email: string|null
    private _phoneNumber: string|null
    private _phonePassword: string|null

    constructor (
        input?: Partial<ContactInformationInterface>
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
        plainObject?: Partial<ContactInformationInterface>
    ): ContactInformation
}
