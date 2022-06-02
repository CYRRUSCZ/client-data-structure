import { AddressInformation } from './AddressInformation'
import { ContactInformation } from './ContactInformation'
import { PersonalInformation } from './PersonalInformation'
import { IdCardInformation } from './IdCardInformation'
import { CompanyInformation } from './CompanyInformation'
import { AddressMailingType, AddressRegularType } from './AddressInformation'
import {
    ClientInformation,
    ClientCompanyType,
    ClientOriginCapitolType,
    ClientOriginCrmType,
    ClientOriginInternalType,
    ClientOriginsType,
    ClientOriginWebType,
    ClientPersonType,
    ClientSelfEmployedType,
    ClientTypes
} from './ClientInformation'
import { BankAccount } from './BankAccount'

export type PlainObjectKeyClientType = 'client'
export type PlainObjectKeyPersonalType = 'personal'
export type PlainObjectKeyIdCardType = 'idCard'
export type PlainObjectKeyContactType = 'contact'
export type PlainObjectKeyBankAccountsType = 'bankAccounts'
export type PlainObjectKeyAddressType = 'address'
export type PlainObjectKeyCompanyType = 'company'
export type PlainObjectKeyRepresentativesType = 'representatives'

declare const PLAIN_OBJECT_KEY_CLIENT: PlainObjectKeyClientType
declare const PLAIN_OBJECT_KEY_PERSONAL: PlainObjectKeyPersonalType
declare const PLAIN_OBJECT_KEY_ID_CARD: PlainObjectKeyIdCardType
declare const PLAIN_OBJECT_KEY_CONTACT: PlainObjectKeyContactType
declare const PLAIN_OBJECT_KEY_BANK_ACCOUNTS: PlainObjectKeyBankAccountsType
declare const PLAIN_OBJECT_KEY_ADDRESS: PlainObjectKeyAddressType
declare const PLAIN_OBJECT_KEY_COMPANY: PlainObjectKeyCompanyType
declare const PLAIN_OBJECT_KEY_REPRESENTATIVES: PlainObjectKeyRepresentativesType

export type PlainObjectKeysType = [
    PlainObjectKeyClientType,
    PlainObjectKeyPersonalType,
    PlainObjectKeyIdCardType,
    PlainObjectKeyContactType,
    PlainObjectKeyBankAccountsType,
    PlainObjectKeyAddressType,
    PlainObjectKeyCompanyType,
    PlainObjectKeyRepresentativesType
]

declare const PLAIN_OBJECT_KEYS: PlainObjectKeysType

declare const ADDRESS_TYPE_REGULAR: AddressRegularType
declare const ADDRESS_TYPE_MAILING: AddressMailingType
declare const CLIENT_TYPE_PERSON: ClientPersonType
declare const CLIENT_TYPE_COMPANY: ClientCompanyType
declare const CLIENT_TYPE_SELFEMPLOYED: ClientSelfEmployedType
declare const CLIENT_ORIGIN_INTERNAL: ClientOriginInternalType
declare const CLIENT_ORIGIN_CAPITOL: ClientOriginCapitolType
declare const CLIENT_ORIGIN_CRM: ClientOriginCrmType
declare const CLIENT_ORIGIN_WEB: ClientOriginWebType
declare const CLIENT_TYPES: ClientTypes
declare const CLIENT_ORIGINS: ClientOriginsType

export interface ClientDataInterfaceInput {
    client: ClientInformation|Record<string, any>|null,
    personal: PersonalInformation|Record<string, any>|null,
    idCard: IdCardInformation|Record<string, any>|null,
    address: AddressInformation|Record<string, any>|null,
    contact: ContactInformation|Record<string, any>|null,
    bankAccounts: BankAccount[]|Array<Record<string,any >>,
    company: CompanyInformation|Record<string, any>|null
}

export interface ClientDataInterfaceOutput {
    client: ClientInformation,
    personal: PersonalInformation,
    idCard: IdCardInformation,
    address: AddressInformation,
    contact: ContactInformation,
    bankAccounts: BankAccount[],
    company: CompanyInformation
}

export declare class ClientData {
    private _client: ClientInformation
    private _personal: PersonalInformation
    private _address: AddressInformation
    private _idCard: IdCardInformation
    private _contact: ContactInformation
    private _bankAccounts: BankAccount[]
    private _company: CompanyInformation

    constructor (
        input?: ClientDataInterfaceInput|Record<string, any>|null
    )

    static create (
        client: ClientInformation|Record<string, any>|null,
        personal: PersonalInformation|Record<string, any>|null,
        idCard: IdCardInformation|Record<string, any>|null,
        address: AddressInformation|Record<string, any>|null,
        contact: ContactInformation|Record<string, any>|null,
        bankAccounts: BankAccount[]|Array<Record<string,any >>,
        company: CompanyInformation|Record<string, any>|null
    ): ClientData

    get client (): ClientInformation

    get personal (): PersonalInformation

    get idCard (): IdCardInformation

    get address (): AddressInformation

    get contact (): ContactInformation

    get company (): CompanyInformation

    get bankAccounts (): BankAccount[]

    get fullAddress (): string

    get email (): string|null

    get fullName (): string|null

    get companyName (): string|null

    get dataOriginName (): string

    get typeName (): string

    get dataOriginId (): string|null

    get dataOrigin (): string|null

    get type (): string|null

    get isCompany (): boolean

    get isPerson (): boolean

    get isSelfemployed (): boolean

    toJSON (): ClientDataInterfaceOutput

    toPlainObject (): ClientDataInterfaceOutput

    static fromPlainObject (
        plainObject: ClientDataInterfaceInput|Record<string, any>|null
    ): ClientData

    static get PLAIN_OBJECT_KEY_CLIENT (): PlainObjectKeyClientType

    static get PLAIN_OBJECT_KEY_PERSONAL (): PlainObjectKeyPersonalType

    static get PLAIN_OBJECT_KEY_ID_CARD (): PlainObjectKeyIdCardType

    static get PLAIN_OBJECT_KEY_CONTACT (): PlainObjectKeyContactType

    static get PLAIN_OBJECT_KEY_BANK_ACCOUNTS (): PlainObjectKeyBankAccountsType

    static get PLAIN_OBJECT_KEY_ADDRESS (): PlainObjectKeyAddressType

    static get PLAIN_OBJECT_KEY_COMPANY (): PlainObjectKeyCompanyType

    static get ADDRESS_TYPE_MAILING (): AddressMailingType

    static get ADDRESS_TYPE_REGULAR (): AddressRegularType

    static get CLIENT_TYPE_PERSON (): ClientPersonType

    static get CLIENT_TYPE_COMPANY (): ClientCompanyType

    static get CLIENT_TYPE_SELFEMPLOYED (): ClientSelfEmployedType

    static get CLIENT_ORIGIN_INTERNAL (): ClientOriginInternalType

    static get CLIENT_ORIGIN_CAPITOL (): ClientOriginCapitolType

    static get CLIENT_ORIGIN_CRM (): ClientOriginCrmType

    static get CLIENT_ORIGIN_WEB (): ClientOriginWebType

    static get CLIENT_TYPES (): ClientTypes

    static get CLIENT_ORIGINS (): ClientOriginsType
}
