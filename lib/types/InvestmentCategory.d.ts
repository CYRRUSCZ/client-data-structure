export interface BaseInvestmentCategoryInterface {
    version: string|null,
    uid: string|null,
    name: string|null,
}

export interface InvestmentCategoryInterfaceInput extends BaseInvestmentCategoryInterface {
    added: Date|string
}

export interface InvestmentCategoryInterfaceOutput extends BaseInvestmentCategoryInterface {
    added: Date
}

export declare class InvestmentCategory {
    private _version: string|null
    private _uid: string|null
    private _name: string|null
    private _added: Date

    constructor (
        input?: InvestmentCategoryInterfaceInput|Record<string, any>|null
    )

    static create (
        version: string|null,
        uid: string|null,
        name: string|null,
        added: Date|string
    ): InvestmentCategory

    get uid (): string|null

    get version (): string|null

    get name (): string|null

    get added (): Date

    toJSON (): InvestmentCategoryInterfaceOutput

    toPlainObject (): InvestmentCategoryInterfaceOutput

    static fromPlainObject (
        plainObject: InvestmentCategoryInterfaceInput
    ): InvestmentCategory
}
