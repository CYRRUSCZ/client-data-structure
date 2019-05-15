import { getStringOrNull } from './helpers.js'
import { countries } from '@cyrrus/locale-utils'

export default class Address {
    constructor(
        {
            recipient, 
            street, 
            city, 
            country, 
            postalCode
        } = {}
    ) {
        this._recipient = getStringOrNull(recipient)
        this._street = getStringOrNull(street)
        this._city = getStringOrNull(city)
        this._country = getStringOrNull(country)
        this._postalCode = getStringOrNull(postalCode)
    }

    static create(
        recipient, 
        street, 
        city, 
        country, 
        postalCode
    ) {
        let plain = {
            recipient: recipient, 
            street: street, 
            city: city, 
            country: country, 
            postalCode: postalCode
        }
        return new Address(plain)
    }

    get fullAddress() {
         let tmp = [
            this._recipient,
            this._street,
            this._city,
            this._country,
            this._postalCode
         ]
         return (tmp.filter((value, index) => {
             return (value !== null)
         })).join(', ')
    }

    get recipient() {
        return this._recipient
    }

    get street() {
        return this._street
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get countryName() {
        return (countries.hasOwnProperty(this._country)) ? countries[this._country] : this._country
    }

    get postalCode() {
        return this._postalCode
    }

    toJSON() {
        let plainObject = {
            recipient: this._recipient,
            street: this._street,
            city: this._city,
            country: this._country,
            postalCode: this._postalCode
        }
        return plainObject
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new Address(plainObject)
    }
}