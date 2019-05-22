import { getStringOrNull, getValidDate } from './helpers.js'
import { countries } from '@cyrrus/locale-utils'

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

    static create(
        number, 
        issuedBy,
        country,
        validity
    ) {
        let plain = {
            number: number, 
            issuedBy: issuedBy,
            country: country,
            validity: validity          
        }
        return new IdCardInformation(plain)
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

    get countryName() {
        return (countries.hasOwnProperty(this._country)) ? countries[this._country] : this._country
    }

    get validity() {
        return this._validity
    }

    toJSON() {
        return {
            number: this._number,
            issuedBy: this._issuedBy,
            country: this._country,
            validity: this._validity
        }
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new IdCardInformation(plainObject)
    }
}