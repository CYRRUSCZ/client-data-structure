export default class Address {
    constructor(recipient, streetName, houseNumber, city, country, postalCode) {
        this._recipient = typeof recipient === 'undefined' ? null : recipient
        this._streetName = typeof streetName === 'undefined' ? null : streetName
        this._houseNumber = typeof houseNumber === 'undefined' ? null : houseNumber
        this._city = typeof city === 'undefined' ? null : city
        this._country = typeof country === 'undefined' ? null : country
        this._postalCode = typeof postalCode === 'undefined' ? null : postalCode
    }

    get recipient() {
        return this._recipient
    }

    get streetName() {
        return this._streetName
    }

    get houseNumber() {
        return this._houseNumber
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
            streetName: this.streetName,
            houseNumber: this.houseNumber,
            city: this.city,
            country: this.country,
            postalCode: this.postalCode
        }
    }

    static fromPlainObject(obj) {
        return new Address(
            obj.recipient,
            obj.streetName,
            obj.houseNumber,
            obj.city,
            obj.country,
            obj.postalCode
        )
    }
}