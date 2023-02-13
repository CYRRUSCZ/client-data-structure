import { InvestmentService, InvestmentServiceInterface } from './InvestmentService'

export interface BaseInvestmentProfileInterface {
    version: string|null
    uid: string|null
    name: string|null
    groupUid: string|null
}

export interface InvestmentProfileInterfaceInput extends BaseInvestmentProfileInterface {
    added: Date|string
    services?: Partial<InvestmentServiceInterface>[]
    weight?: number
}

export interface InvestmentProfileInterfaceOutput extends BaseInvestmentProfileInterface {
    added: Date
    services: InvestmentServiceInterface[]
    weight: number
}

export declare class InvestmentProfile {
    private _version: string|null
    private _uid: string|null
    private _name: string|null
    private _added: Date
    private _groupUid: string|null
    private _services: InvestmentService[]
    private _weight: string|null

    constructor (
        input?: Partial<InvestmentProfileInterfaceInput>
    )

    static create (
        version: string|null,
        uid: string|null,
        name: string|null,
        added: Date|string,
        groupUid: string|null,
        services?: Partial<InvestmentServiceInterface>[],
        weight?: number
    ): InvestmentProfile

    get weight (): number

    get uid (): string|null

    get version (): string|null

    get name (): string|null

    get added (): Date

    get services (): InvestmentService[]

    get groupUid (): string|null

    toJSON (): InvestmentProfileInterfaceOutput

    toPlainObject (): InvestmentProfileInterfaceOutput

    removeService (service: Partial<InvestmentServiceInterface>): void

    addService (service: Partial<InvestmentServiceInterface>): void

    containsService (service: Partial<InvestmentServiceInterface>): boolean

    static fromPlainObject (
        plainObject?: Partial<InvestmentProfileInterfaceInput>
    ): InvestmentProfile
}
