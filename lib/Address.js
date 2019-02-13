export default class Address {
    constructor(recipient, street, city, country, postalCode) {
        this._recipient = typeof recipient === 'undefined' ? null : recipient
        this._street = typeof street === 'undefined' ? null : street
        this._city = typeof city === 'undefined' ? null : city
        this._country = typeof country === 'undefined' ? null : country
        this._postalCode = typeof postalCode === 'undefined' ? null : postalCode
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

    toPlainObject() {
        return {
            recipient: this.recipient,
            street: this.street,
            city: this.city,
            country: this.country,
            postalCode: this.postalCode
        }
    }

    static fromPlainObject(obj) {
        return new Address(
            obj.recipient,
            obj.street,
            obj.city,
            obj.country,
            obj.postalCode
        )
    }
}