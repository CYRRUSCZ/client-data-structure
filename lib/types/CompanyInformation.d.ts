import { Address } from './Address'
import { Representative } from './Representative'

export type PlainObjectKeyIcType = 'ic'
export type PlainObjectKeyDicType = 'dic'
export type PlainObjectKeyLei = 'lei'
type PlainObjectKeyRepresentativesType = 'representatives'
export type PlainObjectKeyNameType = 'name'
export type PlainObjectKeyTaxDomicileType = 'taxDomicile'

declare const PLAIN_OBJECT_KEY_IC: PlainObjectKeyIcType
declare const PLAIN_OBJECT_KEY_DIC: PlainObjectKeyDicType
declare const PLAIN_OBJECT_KEY_LEI: PlainObjectKeyLei
declare const PLAIN_OBJECT_KEY_REPRESENTATIVES: PlainObjectKeyRepresentativesType
declare const PLAIN_OBJECT_KEY_NAME: PlainObjectKeyNameType
declare const PLAIN_OBJECT_KEY_TAX_DOMICILE: PlainObjectKeyTaxDomicileType

export interface BaseCompanyInformationInterface {
    ic: string|null,
    dic: string|null,
    lei: string|null,
    taxDomicile: string|null,
    name: string|null
}

export interface CompanyInterfaceInterfaceInput extends BaseCompanyInformationInterface {
    representatives: Representative[]|Array<Record<string, any>>
}

export interface CompanyInterfaceInterfaceOutput extends BaseCompanyInformationInterface {
    representatives: Representative[]
}

export declare class CompanyInformation {
    private _ic: string|null
    private _dic: string|null
    private _lei: string|null
    private _name: string|null
    private _taxDomicile: string|null
    private _representatives: Representative[]

    constructor (
        input?: CompanyInterfaceInterfaceInput|Record<string, any>|null
    )

    static create (
        ic: string|null,
        dic: string|null,
        lei: string|null,
        taxDomicile: string|null,
        representatives: Representative[]|Array<Record<string, any>>,
        name: string|null
    ): CompanyInformation

    get ic (): string|null

    get dic (): string|null

    get lei (): string|null

    get address (): Address

    get taxDomicile (): string|null

    get representatives (): Representative[]

    get name (): string|null

    toJSON (): CompanyInterfaceInterfaceOutput

    toPlainObject (): CompanyInterfaceInterfaceOutput

    static fromPlainObject (
        object: CompanyInterfaceInterfaceInput|Record<string, any>|null
    ): CompanyInformation
}
