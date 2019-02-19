import { getStringOrNull } from './helpers.js'

export default class BankingInformation {
    constructor(
        {
            prefix, 
            account, 
            code, 
            currency, 
            iban, 
            swift, 
            bankNameAdress, 
            accountName,
            foreign = false
        } = {}
    ) {
        this._prefix = getStringOrNull(prefix)
        this._account = getStringOrNull(account)
        this._code = getStringOrNull(code)
        this._currency = getStringOrNull(currency)
        this._iban = getStringOrNull(iban)
        this._swift = getStringOrNull(swift)
        this._bankNameAddress = getStringOrNull(bankNameAdress)
        this._accountName = getStringOrNull(accountName)
        this._foreign = (foreign === true)
    }

    static create(
        prefix, 
        account, 
        code, 
        currency, 
        iban, 
        swift, 
        bankNameAdress, 
        accountName,
        foreign = false
    ) {
        let plain = {
            prefix: prefix, 
            account: account, 
            code: code, 
            currency: currency, 
            iban: iban, 
            swift: swift, 
            bankNameAdress: bankNameAdress, 
            accountNam: accountName,
            foreign: foreign
        }
        return new BankingInformation(plain)
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

    get foreign() {
        return this._foreign
    }

    toJSON() {
        return {
            prefix: this.prefix(),
            account: this.account(),
            code: this.code(),
            currency: this.currency(),
            iban: this.iban(),
            swift: this.swift(),
            bankNameAddress: this.bankNameAddress(),
            accountName: this.accountName(),
            foreign: this.foreign()
        }
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new BankingInformation(plainObject)
    }
}
