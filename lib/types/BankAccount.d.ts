export interface BankAccountInterface {
    id: string|null,
    prefix: string|null,
    account: string|null,
    code: string|null,
    currency: string|null,
    iban: string|null,
    swift: string|null,
    bankNameAddress: string|null,
    accountName: string|null,
    foreign: boolean,
    _id: string|null,
    capitolId: string|null
}

export declare class BankAccount {
    private _prefix: string|null
    private _account: string|null
    private _code: string|null
    private _currency: string|null
    private _iban: string|null
    private _swift: string|null
    private _bankNameAddress: string|null
    private _accountName: string|null
    private _foreign: boolean
    private _id: string|null
    private _capitolId: string|null

    constructor (
        input?: BankAccountInterface|null|Record<string, any>
    )

    static create (
        id: any,
        prefix: any,
        account: any,
        code: any,
        currency: any,
        iban: any,
        swift: any,
        bankNameAddress: any,
        accountName: any,
        foreign: boolean,
        capitolId: any
    ): BankAccount

    get id (): string|null

    get prefix (): string|null

    get account (): string|null

    get code (): string|null

    get bankNameFromCode (): string|null

    get currency (): string|null

    get iban (): string|null

    get swift (): string|null

    get bankNameAddress (): string|null

    get accountName (): string|null

    get foreign (): boolean

    get capitolId (): string|null

    toJSON (): BankAccountInterface

    toPlainObject (): BankAccountInterface

    static fromPlainObject (plainObject): BankAccount
}
