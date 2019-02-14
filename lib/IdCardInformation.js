import { getStringOrNull, getValidDate } from './helpers.js'

export default class IdCardInformation {
    constructor(
        {
            number, 
            issuedBy,
            country,
            validity
        } = {}
    ) {
        this._number = getStringOrNull(number)
        this._issuedBy = getStringOrNull(issuedBy)
        this._country = getStringOrNull(country)
        this._validity = getValidDate(validity)
    }

    get number() {
        return this._number
    }

    get issuedBy() {
        return this._issuedBy
    }

    get country() {
        return this._country
    }

    get validity() {
        return this._validity
    }

    static get PLAIN_OBJECT_KEY() {
        return 'idCard'
    }

    toJSON() {
        return {
            number: this.number, 
            issuedBy: this.issuedBy,
            country: this.country,
            validity: this.validity
        }
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new IdCardInformation(plainObject)
    }
}