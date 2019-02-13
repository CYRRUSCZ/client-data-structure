export default class BankingInformation {
    constructor(prefix, account, code, currency, iban, swift, bankNameAdress, accountName) {
        this._prefix = typeof prefix === 'undefined' ? null : prefix
        this._account = typeof account === 'undefined' ? null : account
        this._code = typeof code === 'undefined' ? null : code
        this._currency = typeof currency === 'undefined' ? null : currency
        this._iban = typeof iban === 'undefined' ? null : iban
        this._swift = typeof swift === 'undefined' ? null : swift
        this._bankNameAddress = typeof bankNameAdress === 'undefined' ? null : bankNameAdress
        this._accountName = typeof accountName === 'undefined' ? null : accountName
    }

    get prefix() {
        return this._prefix
    }

    get account() {
        return this._account
    }

    get code() {
        return this._code
    }

    get currency() {
        return this._currency
    }

    get iban() {
        return this._iban
    }

    get swift() {
        return this._swift
    }

    get bankNameAddress() {
        return this._bankNameAddress
    }

    get accountName() {
        return this._accountName
    }

    toPlainObject() {
        return {
            prefix: this.prefix,
            account: this.account,
            code: this.code,
            currency: this.currency,
            iban: this.iban,
            swift: this.swift,
            bankNameAddress: this.bankNameAddress,
            accountName: this.accountName
        }
    }

    static fromPlainObject(obj) {
        return new BankingInformation(
            obj.prefix,
            obj.account,
            obj.code,
            obj.currency,
            obj.iban,
            obj.swift,
            obj.bankNameAddress,
            obj.accountName
        )
    }
}
