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

    static get ADDRESS_TYPE_REGULAR() {
        return 'address'
    }

    static get ADDRESS_TYPE_MAILING() {
        return 'mailingAddress'
    }

    static get PLAIN_OBJECT_ADDRESS_TYPES() {
        return [
            Address.ADDRESS_TYPE_REGULAR,
            Address.ADDRESS_TYPE_MAILING
        ]
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