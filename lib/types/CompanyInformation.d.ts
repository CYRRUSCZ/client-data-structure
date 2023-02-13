import { Address } from './Address'
import { Representative, RepresentativeInterfaceInput, RepresentativeInterfaceOutput } from './Representative'

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

export interface CompanyInformationInterfaceBase {
    ic: string|null
    dic: string|null
    lei: string|null
    taxDomicile: string|null
    name: string|null
}

export interface CompanyInformationInterfaceInput extends CompanyInformationInterfaceBase {
    representatives: Partial<RepresentativeInterfaceInput>[]
}

export interface CompanyInformationInterfaceOutput extends CompanyInformationInterfaceBase {
    representatives: RepresentativeInterfaceOutput[]
}

export declare class CompanyInformation {
    private _ic: string|null
    private _dic: string|null
    private _lei: string|null
    private _name: string|null
    private _taxDomicile: string|null
    private _representatives: Representative[]

    constructor (
        input?: Partial<CompanyInformationInterfaceInput>
    )

    static create (
        ic: string|null,
        dic: string|null,
        lei: string|null,
        taxDomicile: string|null,
        representatives: Partial<RepresentativeInterfaceInput>[],
        name: string|null
    ): CompanyInformation

    get ic (): string|null

    get dic (): string|null

    get lei (): string|null

    get address (): Address

    get taxDomicile (): string|null

    get representatives (): Representative[]

    get name (): string|null

    toJSON (): CompanyInformationInterfaceOutput

    toPlainObject (): CompanyInformationInterfaceOutput

    static fromPlainObject (
        object?: Partial<CompanyInformationInterfaceInput>
    ): CompanyInformation
}
