import { getStringOrNull, getValidDate } from './helpers.js'
import { countries } from '@cyrrus/locale-utils'

export default class IdCardInformation {
    constructor (
        {
            number,
            issuedBy,
            country,
            validity,
            type,
            scanNotAllowed = false
        } = {}
    ) {
        this._number = getStringOrNull(number)
        this._issuedBy = getStringOrNull(issuedBy)
        this._country = getStringOrNull(country)
        this._validity = getValidDate(validity)
        this._type = getStringOrNull(type)
        this._scanNotAllowed = (scanNotAllowed === true)
    }

    static create (
        number,
        issuedBy,
        country,
        validity,
        type,
        scanNotAllowed = false
    ) {
        const plain = {
            number: number,
            issuedBy: issuedBy,
            country: country,
            validity: validity,
            type: type,
            scanNotAllowed: (scanNotAllowed === true)
        }
        return new IdCardInformation(plain)
    }

    get number () {
        return this._number
    }

    get issuedBy () {
        return this._issuedBy
    }

    get country () {
        return this._country
    }

    get countryName () {
        return (Object.prototype.hasOwnProperty.call(countries, `${this._country}`)) ? countries[this._country] : this._country
    }

    get validity () {
        return this._validity
    }

    get type () {
        return this._type
    }

    get scanNotAllowed () {
        return this._scanNotAllowed
    }

    toJSON () {
        return {
            number: this._number,
            issuedBy: this._issuedBy,
            country: this._country,
            validity: this._validity,
            type: this._type,
            scanNotAllowed: this._scanNotAllowed
        }
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (plainObject) {
        return new IdCardInformation(plainObject)
    }
}
