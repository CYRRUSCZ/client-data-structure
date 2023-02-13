export interface AddressInterface {
    recipient: string|null
    street: string|null
    streetNumber: string|null
    city: string|null
    country: string|null
    postalCode: string|null
}

export declare class Address {
    private _recipient: string|null
    private _street: string|null
    private _city: string|null
    private _country: string|null
    private _postalCode: string|null
    private _streetNumber: string|null

    constructor (
        input?: Partial<AddressInterface>
    )

    static create (
        recipient: string|null,
        street: string|null,
        streetNumber: string|null,
        city: string|null,
        country: string|null,
        postalCode: string|null
    ): Address

    get fullAddress (): string

    get recipient (): string|null

    get street (): string|null

    get streetNumber (): string|null

    get city (): string|null

    get country (): string|null

    get countryName (): string|null

    get postalCode (): string|null

    localizedCountryName (locale: string): string|null

    localizedFullAddress (locale: string): string

    toJSON (): AddressInterface

    toPlainObject (): AddressInterface

    static fromPlainObject (
        plainObject?: Partial<AddressInterface>
    ): Address

}
