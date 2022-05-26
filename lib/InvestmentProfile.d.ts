import { getStringOrNull, getValidDate, getInstanceOfClass } from './helpers.js'
import InvestmentService from './InvestmentService.js'

interface InvestmentProfileInterface {
    version: string|null,
    uid: string|null,
    name: string|null,
    added: Date|string,
    groupUid: string|null,
    services: InvestmentService[],
    weight: number
}

export declare class InvestmentProfile {
    constructor (
        input?: InvestmentProfileInterface|Record<string, any>|null
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

    toJSON (): InvestmentProfileInterface

    toPlainObject (): InvestmentProfileInterface

    removeService (service: InvestmentService|Record<string, any>|null): void

    addService (service: InvestmentService|Record<string, any>|null): void

    containsService (service: InvestmentService|Record<string, any>|null): boolean

    static fromPlainObject (
        plainObject: InvestmentProfileInterface|Record<string, any>|null
    ): InvestmentProfile
}
