import { Address, AddressInterface } from './Address'
import { IdCardInformation, IdCardInformationInterfaceInput, IdCardInformationInterfaceOutput } from './IdCardInformation'
import { PersonalInformation, PersonalInformationInterfaceInput, PersonalInformationInterfaceOutput } from './PersonalInformation'
import { ContactInformation, ContactInformationInterface } from './ContactInformation'
import { AddressInformationInterfaceInput, AddressInformationInterfaceOutput } from './AddressInformation'

type PlainObjectKeyPersonalType = 'personal'
export type PlainObjectKeyPositionType = 'position'
type PlainObjectKeyAddressType = 'address'
type PlainObjectKeyIdCardType = 'idCard'
type PlainObjectKeyContactType = 'contact'
export type PlainObjectKeyIdType = 'id'

declare const PLAIN_OBJECT_KEY_PERSONAL: PlainObjectKeyPersonalType
declare const PLAIN_OBJECT_KEY_POSITION: PlainObjectKeyPositionType
declare const PLAIN_OBJECT_KEY_ADDRESS: PlainObjectKeyAddressType
declare const PLAIN_OBJECT_KEY_ID_CARD: PlainObjectKeyIdCardType
declare const PLAIN_OBJECT_KEY_CONTACT: PlainObjectKeyContactType
declare const PLAIN_OBJECT_KEY_ID: PlainObjectKeyIdType
export interface RepresentativeInterfaceInput {
    position: string|null
    id: string|null
    address: Partial<AddressInformationInterfaceInput>
    personal: Partial<PersonalInformationInterfaceInput>
    idCard: Partial<IdCardInformationInterfaceInput>
    contact: Partial<ContactInformationInterface>
    _id?: string|null
    isRepresentative?: boolean
    isRealOwner?: boolean
    hasPowerOfAttorney?: boolean
    realOwnerReasonChar?: string|null
    realOwnerReasonNumber?: string|null
    capitolId?: string|null
    capitolContactId?: string|null
}

export interface RepresentativeInterfaceOutput {
    position: string|null
    id: string|null
    address: AddressInterface
    personal: PersonalInformationInterfaceOutput
    idCard: IdCardInformationInterfaceOutput
    contact: ContactInformationInterface
    isRepresentative: boolean
    isRealOwner: boolean
    hasPowerOfAttorney: boolean
    realOwnerReasonChar: string|null
    realOwnerReasonNumber: string|null
    capitolId: string|null
    capitolContactId: string|null
}
export declare class Representative {
    private _personal: PersonalInformation
    private _position: string|null
    private _address: AddressInterface
    private _idCard: IdCardInformation
    private _contact: ContactInformation
    private _id: string|null
    private _isRealOwner: boolean
    private _realOwnerReasonChar: string|null
    private _realOwnerReasonNumber: string|null
    private _capitolId: string|null
    private _isRepresentative: boolean
    private _capitolContactId: string|null
    private _hasPowerOfAttorney: boolean

    constructor (
        input?: Partial<RepresentativeInterfaceInput>
    )

    static create (
        personal: Partial<PersonalInformationInterfaceInput>,
        position: string|null,
        address: Partial<AddressInterface>,
        idCard: Partial<IdCardInformationInterfaceInput>,
        id: string|null,
        contact: Partial<ContactInformationInterface>,
        isRepresentative?: boolean,
        isRealOwner?: boolean,
        realOwnerReasonChar?: string|null,
        realOwnerReasonNumber?: string|null,
        capitolId?: string|null,
        capitolContactId?: string|null,
        hasPowerOfAttorney?: boolean
    ): Representative

    get personal (): PersonalInformation

    get position (): string|null

    get idCard (): IdCardInformation

    get id (): string|null

    get address (): Address

    get contact (): ContactInformation

    get isRealOwner (): boolean

    get realOwnerReasonChar (): string|null

    get realOwnerReasonNumber (): string|null

    get capitolId (): string|null

    get capitolContactId (): string|null

    get isRepresentative (): boolean

    get hasPowerOfAttorney (): boolean

    toJSON (): RepresentativeInterfaceOutput

    toPlainObject (): RepresentativeInterfaceOutput

    static fromPlainObject (
        object?: Partial<RepresentativeInterfaceInput>
    ): Representative
}
