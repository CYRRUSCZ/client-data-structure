import { getStringOrNull, getValidDate } from './helpers'

export class InvestmentCategory {
    constructor (
        {
            version,
            uid,
            name,
            added
        } = {}
    ) {
        this._version = getStringOrNull(version)
        this._uid = getStringOrNull(uid)
        this._name = getStringOrNull(name)
        this._added = getValidDate(added)
    }

    static create (
        version,
        uid,
        name,
        added
    ) {
        const plain = {
            version: version,
            uid: uid,
            name: name,
            added: added
        }
        return new InvestmentCategory(plain)
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

    toJSON () {
        const plainObject = {
            version: this.version,
            uid: this.uid,
            name: this.name,
            added: this.added
        }
        return plainObject
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (plainObject) {
        return new InvestmentCategory(plainObject)
    }
}
