import { Address } from './Address'
import { IdCardInformation } from './IdCardInformation'
import { PersonalInformation } from './PersonalInformation'
import { ContactInformation } from './ContactInformation'

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

export interface BaseRepresentativeInterface {
    position: string|null,
    id: string|null,
    _id: string|null,
    isRepresentative: boolean,
    isRealOwner: boolean,
    realOwnerReasonChar: string,
    realOwnerReasonNumber: string,
    capitolId: string,
    capitolContactId: string|null
}

export interface RepresentativeInterfaceInput extends BaseRepresentativeInterface {
    address: Address|Record<string, any>|null,
    personal: PersonalInformation|Record<string, any>|null,
    idCard: IdCardInformation|Record<string, any>|null,
    contact: ContactInformation|Record<string, any>|null,
}

export interface RepresentativeInterfaceOutput extends BaseRepresentativeInterface {
    address: Address,
    personal: PersonalInformation,
    idCard: IdCardInformation,
    contact: ContactInformation,
}
export declare class Representative {
    private _personal: PersonalInformation|Record<string, any>|null
    private _position: string|null
    private _address: Address|Record<string, any>|null
    private _idCard: IdCardInformation|Record<string, any>|null
    private _contact: ContactInformation|Record<string, any>|null
    private _id: string|null
    private _isRealOwner: boolean
    private _realOwnerReasonChar: string|null
    private _realOwnerReasonNumber: string|null
    private _capitolId: string|null
    private _isRepresentative: boolean
    private _capitolContactId: string|null

    constructor (
        input?: RepresentativeInterfaceInput|Record<string, any>|null
    )

    static create (
        personal: PersonalInformation,
        position: string|null,
        address: Address,
        idCard: IdCardInformation,
        id: string|null,
        contact: ContactInformation,
        isRepresentative: boolean,
        isRealOwner: boolean,
        realOwnerReasonChar: string,
        realOwnerReasonNumber: string,
        capitolId: string,
        capitolContactId: string|null
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

    toJSON (): RepresentativeInterfaceOutput

    toPlainObject (): RepresentativeInterfaceOutput

    static fromPlainObject (
        object: RepresentativeInterfaceInput|Record<string, any>|null
    ): Representative
}
