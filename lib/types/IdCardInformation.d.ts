interface BaseIdCardInformationInterface {
    number: string|null,
    issuedBy: string|null,
    country: string|null,
    type: string|null,
    scanNotAllowed: boolean
}

interface IdCardInformationInterfaceInput extends BaseIdCardInformationInterface {
    validity: Date|string
}

interface IdCardInformationInterfaceOutput extends BaseIdCardInformationInterface {
    validity: Date
}

export declare class IdCardInformation {
    private _number: string|null
    private _issuedBy: string|null
    private _country: string|null
    private _validity: Date
    private _type: string|null
    private _scanNotAllowed: boolean

    constructor (
        input?: IdCardInformationInterfaceInput|Record<string, any>|null
    )

    static create (
        number: string|null,
        issuedBy: string|null,
        country: string|null,
        validity: Date|string,
        type: string|null,
        scanNotAllowed: boolean
    ): IdCardInformation

    get number (): string|null

    get issuedBy (): string|null

    get country (): string|null

    get countryName (): string|null

    get validity (): Date

    get type (): string|null

    get scanNotAllowed (): boolean

    toJSON (): IdCardInformationInterfaceOutput

    toPlainObject (): IdCardInformationInterfaceOutput

    static fromPlainObject (
        plainObject: IdCardInformationInterfaceInput|Record<string, any>|null
    ): IdCardInformation
}
