import { Address, AddressInterface } from './Address'

export type AddressRegularType = 'address'
export type AddressMailingType = 'mailingAddress'

export type PlainObjectAddressTypes = [
    AddressRegularType,
    AddressMailingType
]

export interface AddressInformationInterfaceInput {
    address: Partial<AddressInterface>
    mailingAddress: Partial<AddressInterface>
    useMailingAddress?: boolean
}

export interface AddressInformationInterfaceOutput {
    address: AddressInterface
    mailingAddress: AddressInterface
    useMailingAddress: boolean
}

export declare class AddressInformation {
    private _address: Address
    private _mailingAddress: Address
    private _useMailingAddress: boolean

    constructor (
        input?: Partial<AddressInformationInterfaceInput>
    )

    static create (
        address: Partial<AddressInterface>,
        mailingAddress: Partial<AddressInterface>,
        useMailingAddress?: boolean
    ): AddressInformation

    get address (): Address

    get mailingAddress (): Address

    get useMailingAddress (): boolean

    toJSON (): AddressInformationInterfaceOutput

    toPlainObject (): AddressInformationInterfaceOutput

    static fromPlainObject (
        plainObject?: Partial<AddressInformationInterfaceInput>
    ): AddressInformation

    static get ADDRESS_TYPE_REGULAR (): AddressRegularType

    static get ADDRESS_TYPE_MAILING (): AddressMailingType

    static get PLAIN_OBJECT_ADDRESS_TYPES (): PlainObjectAddressTypes
}
