import { getStringOrNull } from './helpers.js'

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

    get postalCode() {
        return this._postalCode
    }

    toJSON() {
        let plainObject = {
            recipient: this.recipient,
            street: this.street,
            city: this.city,
            country: this.country,
            postalCode: this.postalCode
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