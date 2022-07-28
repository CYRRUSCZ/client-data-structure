import { getStringOrNull, getValidDate } from './helpers'

export class InvestmentParameter {
    constructor (
        {
            version,
            uid,
            name,
            added,
            value,
            isInvestmentCategory
        } = {}
    ) {
        this._version = getStringOrNull(version)
        this._uid = getStringOrNull(uid)
        this._name = getStringOrNull(name)
        this._added = getValidDate(added)
        this._value = getStringOrNull(value)
        this._isInvestmentCategory = isInvestmentCategory === true
    }

    static create (
        version,
        uid,
        name,
        added,
        value,
        isInvestmentCategory
    ) {
        const plain = {
            version,
            uid,
            name,
            added,
            value,
            isInvestmentCategory
        }
        return new InvestmentParameter(plain)
    }

    get uid () {
        return this._uid
    }

    get version () {
        return this._version
    }

    get name () {
        return this._name
    }

    get added () {
        return this._added
    }

    get value () {
        return this._value
    }

    get isInvestmentCategory () {
        return this._isInvestmentCategory
    }

    toJSON () {
        const plainObject = {
            version: this.version,
            uid: this.uid,
            name: this.name,
            added: this.added,
            value: this.value,
            isInvestmentCategory: this.isInvestmentCategory
        }
        return plainObject
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (plainObject) {
        return new InvestmentParameter(plainObject)
    }
}
