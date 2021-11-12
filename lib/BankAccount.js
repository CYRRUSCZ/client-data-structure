import { getStringOrNull } from './helpers.js'
import { bankCodes } from '@cyrrus/locale-utils'

export default class BankAccount {
    constructor (
        {
            id,
            prefix,
            account,
            code,
            currency,
            iban,
            swift,
            bankNameAddress,
            accountName,
            foreign = false,
            _id = null,
            capitolId = null
        } = {}
    ) {
        this._prefix = getStringOrNull(prefix)
        this._account = getStringOrNull(account)
        this._code = getStringOrNull(code)
        this._currency = getStringOrNull(currency)
        this._iban = getStringOrNull(iban)
        this._swift = getStringOrNull(swift)
        this._bankNameAddress = getStringOrNull(bankNameAddress)
        this._accountName = getStringOrNull(accountName)
        this._foreign = (foreign === true)
        this._id = (id !== undefined && id !== null) ? getStringOrNull(id) : getStringOrNull(_id)
        this._capitolId = capitolId
    }

    static create (
        id,
        prefix,
        account,
        code,
        currency,
        iban,
        swift,
        bankNameAddress,
        accountName,
        foreign = false,
        capitolId = null
    ) {
        const plain = {
            id: id,
            prefix: prefix,
            account: account,
            code: code,
            currency: currency,
            iban: iban,
            swift: swift,
            bankNameAddress: bankNameAddress,
            accountNam: accountName,
            foreign: foreign,
            capitolId: capitolId
        }
        return new BankAccount(plain)
    }

    get id () {
        return this._id
    }

    get prefix () {
        return this._prefix
    }

    get account () {
        return this._account
    }

    get code () {
        return this._code
    }

    get bankNameFromCode () {
        return (Object.prototype.hasOwnProperty.call(bankCodes, `${this._code}`)) ? bankCodes[this._code] : this._code
    }

    get currency () {
        return this._currency
    }

    get iban () {
        return this._iban
    }

    get swift () {
        return this._swift
    }

    get bankNameAddress () {
        return this._bankNameAddress
    }

    get accountName () {
        return this._accountName
    }

    get foreign () {
        return this._foreign
    }

    get capitolId () {
        return this._capitolId
    }

    toJSON () {
        return {
            id: this._id,
            prefix: this._prefix,
            account: this._account,
            code: this._code,
            currency: this._currency,
            iban: this._iban,
            swift: this._swift,
            bankNameAddress: this._bankNameAddress,
            accountName: this._accountName,
            foreign: this._foreign,
            capitolId: this._capitolId
        }
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (plainObject) {
        return new BankAccount(plainObject)
    }
}
