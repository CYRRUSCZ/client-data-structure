import { getStringOrNull, getInstanceOfClass } from '../helpers.js'
import InvestmentProfile from '../InvestmentProfile.js'
import { InvestmentProfileInterfaceInput } from './InvestmentProfile'
import InvestmentService from '../InvestmentService.js'

export type ClientPersonType = 'person'
export type ClientCompanyType = 'company'
export type ClientSelfEmployedType = 'osvc'

export type ClientOriginInternalType = 'internal'
export type ClientOriginCapitolType = 'capitol'
export type ClientOriginCrmType = 'crm'
export type ClientOriginWebType = 'web'

declare const CLIENT_TYPE_PERSON: ClientPersonType
declare const CLIENT_TYPE_COMPANY: ClientCompanyType
declare const CLIENT_TYPE_SELFEMPLOYED: ClientSelfEmployedType
declare const CLIENT_ORIGIN_INTERNAL: ClientOriginInternalType
declare const CLIENT_ORIGIN_CAPITOL: ClientOriginCapitolType
declare const CLIENT_ORIGIN_CRM: ClientOriginCrmType
declare const CLIENT_ORIGIN_WEB: ClientOriginWebType

export enum ClientOriginNames {
    internal = 'Interní DB',
    capitol = 'Capitol',
    crm = 'CRM',
    web = 'Web'
}

declare const CLIENT_ORIGIN_NAMES: ClientOriginNames

export enum ClientTypeNames {
    person = 'Fyzická osoba',
    company = 'Právnická osoba',
    osvc = 'OSVČ'
}

declare const CLIENT_TYPE_NAMES: ClientTypeNames

export type ClientTypes = [ClientPersonType, ClientCompanyType, ClientSelfEmployedType]

declare const CLIENT_TYPES: ClientTypes

export type ClientOriginsType = [
    ClientOriginInternalType,
    ClientOriginCapitolType,
    ClientOriginCrmType,
    ClientOriginWebType
]

declare const CLIENT_ORIGINS: ClientOriginsType

export interface BaseClientInformationInterface {
    type: string|null,
    dataOrigin: string|null,
    dataOriginId: string|null,
    capitolId: string|null,
    crmId: string|null,
    residency: boolean,
    economicalSectorCode: string|null,
    brokerId: string|null,
    externalBrokerCapitolId: string|null,
    externalBrokerAgentCapitolId: string|null,
    legislation: string|null
}

export interface ClientInformationInterfaceInput extends BaseClientInformationInterface {
    investmentProfiles: InvestmentProfile[]|Array<Record<string, any>>,
}
export interface ClientInformationInterfaceOutput extends BaseClientInformationInterface {
    investmentProfiles: InvestmentProfile[],
}

export declare class ClientInformation {
    private _type: string|null
    private _dataOrigin: string|null
    private _dataOriginId: string|null
    private _capitolId: string|null
    private _crmId: string|null
    private _investmentProfiles: InvestmentProfile[]
    private _residency: boolean
    private _economicalSectorCode: string|null
    private _brokerId: string|null
    private _externalBrokerCapitolId: string|null
    private _externalBrokerAgentCapitolId: string|null
    private _legislation: string|null

    constructor (
        input?: ClientInformationInterfaceInput|Record<string, any>|null
    )

    static create (
        type: string|null,
        dataOrigin: string|null,
        dataOriginId: string|null,
        capitolId: string|null,
        crmId: string|null,
        investmentProfiles: InvestmentProfile[],
        residency: boolean,
        economicalSectorCode: string|null,
        brokerId: string|null,
        externalBrokerCapitolId: string|null,
        externalBrokerAgentCapitolId: string|null,
        legislation: string|null
    ): ClientInformation

    get legislation (): string|null

    get externalBrokerCapitolId (): string|null

    get externalBrokerAgentCapitolId (): string|null

    get typeName (): string

    get dataOriginName (): string

    get economicalSectorCode (): string|null

    get type (): string|null

    get dataOrigin (): string|null

    get dataOriginId (): string|null

    get capitolId (): string|null

    get crmId (): string|null

    get investmentProfiles (): InvestmentProfile[]

    get residency (): boolean

    get brokerId (): string|null

    toJSON (): ClientInformationInterfaceOutput

    toPlainObject (): ClientInformationInterfaceOutput

    getProfilesGroup (groupUid: string|null): InvestmentProfile[]

    removeProfilesGroup (groupUid: string|null): InvestmentProfile[]

    replaceProfilesGroup (groupUid: string|null, profilesArray: InvestmentProfile[]): void

    removeProfile (profile: InvestmentProfile|InvestmentProfileInterfaceInput|Record<string, any>): void

    addProfile (profile: InvestmentProfile|InvestmentProfileInterfaceInput|Record<string, any>): void

    containsProfile (profile: InvestmentProfile|InvestmentProfileInterfaceInput|Record<string, any>): boolean

    hasInvestmentService (serviceUid: string|null): boolean

    static fromPlainObject (
        plainObject: ClientInformationInterfaceInput|Record<string, any>|null
    ): ClientInformation

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
