import { getInstanceOfClass, getStringOrNull } from './helpers.js'
import { Address } from './Address.js'
import { IdCardInformation } from './IdCardInformation.js'
import { PersonalInformation } from './PersonalInformation.js'
import { ContactInformation } from './ContactInformation.js'

interface RepresentativeInterface {
    personal: PersonalInformation,
    position: string|null,
    address: Address,
    idCard: IdCardInformation,
    id: string|null,
    contact: ContactInformation,
    _id: string|null,
    isRepresentative: boolean,
    isRealOwner: boolean,
    realOwnerReasonChar: string,
    realOwnerReasonNumber: string,
    capitolId: string,
    capitolContactId: string|null
}

export declare class Representative {
    private _personal: PersonalInformation
    private _position: string|null
    private _address: Address
    private _idCard: IdCardInformation
    private _contact: ContactInformation
    private _id: string|null
    private _isRealOwner: boolean
    private _realOwnerReasonChar: string
    private _realOwnerReasonNumber: string
    private _capitolId: string
    private _isRepresentative: boolean
    private _capitolContactId: string|null

    constructor (
        input?: RepresentativeInterface|Record<string, any>|null
    )

    static create (
        personal: PersonalInformation|Record<string, any>|null,
        position: string|null,
        address: Address|Record<string, any>|null,
        idCard: IdCardInformation|Record<string, any>|null,
        id: string|null,
        contact: ContactInformation|Record<string, any>|null,
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

    get realOwnerReasonChar (): string

    get realOwnerReasonNumber (): string

    get capitolId (): string

    get capitolContactId (): string|null

    get isRepresentative (): boolean

    toJSON (): RepresentativeInterface

    toPlainObject (): RepresentativeInterface

    static fromPlainObject (
        object: RepresentativeInterface|Record<string, any>|null
    ): Representative
}
