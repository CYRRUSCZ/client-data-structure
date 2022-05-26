import { getStringOrNull, getValidDate } from './helpers.js'

interface InvestmentServiceInterface {
    uid: string|null,
    name: string|null,
    added: string|null
}

export declare class InvestmentService {
    constructor (
        input?: InvestmentServiceInterface|Record<string, any>|null
    )

    static create (
        uid: string|null,
        name: string|null,
        added: string|null
    ): InvestmentService

    get uid (): string|null

    get name (): string|null

    get added (): string|null

    toJSON (): InvestmentServiceInterface

    toPlainObject (): InvestmentServiceInterface

    static fromPlainObject (
        plainObject: InvestmentServiceInterface|Record<string, any>|null
    ): InvestmentService
}
