import { getStringOrNull, getValidDate } from './helpers.js'

export default class InvestmentProfile {
    constructor(
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

    static create(
        version,
        uid,
        name,
        added
    ) {
        let plain = {
            version: version,
            uid: uid,
            name: name,
            added: added
        }
        return new InvestmentProfile(plain)
    }

    get uid() {
        return this._uid
    }

    get version() {
        return this._version
    }

    get name() {
        return this._name
    }

    get added() {
        return this._added
    }

    toJSON() {
        let plainObject = {
            version: this._version,
            uid: this._uid,
            name: this._name,
            added: this._added
        }
        return plainObject
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new InvestmentProfile(plainObject)
    }
}