export interface BaseInvestmentParameterInterface {
    version: string|null,
    uid: string|null,
    name: string|null,
    value: string|number|null
    isInvestmentCategory: boolean
}

export interface InvestmentParameterInterfaceInput extends BaseInvestmentParameterInterface {
    added: Date|string
}

export interface InvestmentParameterInterfaceOutput extends BaseInvestmentParameterInterface {
    added: Date
}

export declare class InvestmentParameter {
    private _version: string|null
    private _uid: string|null
    private _name: string|null
    private _added: Date
    private _value: string|number|null
    private _isInvestmentCategory: boolean

    constructor (
        input?: InvestmentParameterInterfaceInput|Record<string, any>|null
    )

    static create (
        version: string|null,
        uid: string|null,
        name: string|null,
        added: Date|string,
        value: string|number|null,
        isInvestmentCategory: boolean
    ): InvestmentParameter

    get uid (): string|null

    get version (): string|null

    get name (): string|null

    get added (): Date

    get value (): string|number|null

    get isInvestmentCategory (): boolean

    toJSON (): InvestmentParameterInterfaceOutput

    toPlainObject (): InvestmentParameterInterfaceOutput

    static fromPlainObject (
        plainObject: InvestmentParameterInterfaceInput
    ): InvestmentParameter
}
