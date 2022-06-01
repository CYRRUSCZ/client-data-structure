import { InvestmentService } from './InvestmentService'

export interface BaseInvestmentProfileInterface {
    version: string|null,
    uid: string|null,
    name: string|null,
    groupUid: string|null,
    weight: number
}

export interface InvestmentProfileInterfaceInput extends BaseInvestmentProfileInterface {
    services: InvestmentService[]|Array<Record<string, any>>,
    added: Date|string,
}

export interface InvestmentProfileInterfaceOutput extends BaseInvestmentProfileInterface {
    services: InvestmentService[]
    added: Date,
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
        input?: InvestmentProfileInterfaceInput|Record<string, any>|null
    )

    static create (
        version: string|null,
        uid: string|null,
        name: string|null,
        added: Date|string,
        groupUid: string|null,
        services: InvestmentService[],
        weight: number
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

    removeService (service: InvestmentService|Record<string, any>|null): void

    addService (service: InvestmentService|Record<string, any>|null): void

    containsService (service: InvestmentService|Record<string, any>|null): boolean

    static fromPlainObject (
        plainObject: InvestmentProfileInterfaceInput|Record<string, any>|null
    ): InvestmentProfile
}
