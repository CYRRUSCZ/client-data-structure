import { Address } from './Address'

interface AddressInformationInterface {
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
        address: any,
        mailingAddress: any,
        useMailingAddress: boolean
    ): AddressInformation

    get address (): Address

    get mailingAddress (): Address

    get useMailingAddress (): boolean

    toJSON (): AddressInformationInterface

    toPlainObject (): AddressInformationInterface

    static fromPlainObject (plainObject: AddressInformationInterface): AddressInformation

    static get ADDRESS_TYPE_REGULAR (): string

    static get ADDRESS_TYPE_MAILING (): string

    static get PLAIN_OBJECT_ADDRESS_TYPES (): string[]
}
