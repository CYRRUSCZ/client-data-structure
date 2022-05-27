import Address from '../Address'

export type AddressRegularType = 'address'
export type AddressMailingType = 'mailingAddress'

export type PlainObjectAddressTypes = [
    AddressRegularType,
    AddressMailingType
]

export interface AddressInformationInterface {
    address: Address,
    mailingAddress: Address,
    useMailingAddress: boolean
}
export declare class AddressInformation {
    private _address: Address
    private _mailingAddress: Address
    private _useMailingAddress: boolean

    constructor (
        input?: AddressInformationInterface|null|Record<string, any>
    )

    static create (
        address: Address|Record<string,any>|null,
        mailingAddress: Address|Record<string,any>|null,
        useMailingAddress: boolean
    ): AddressInformation

    get address (): Address

    get mailingAddress (): Address

    get useMailingAddress (): boolean

    toJSON (): AddressInformationInterface

    toPlainObject (): AddressInformationInterface

    static fromPlainObject (plainObject: AddressInformationInterface): AddressInformation

    static get ADDRESS_TYPE_REGULAR (): AddressRegularType

    static get ADDRESS_TYPE_MAILING (): AddressMailingType

    static get PLAIN_OBJECT_ADDRESS_TYPES (): PlainObjectAddressTypes
}
