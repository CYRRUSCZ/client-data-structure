import { getStringOrNull } from './helpers.js'

export default class ContactInformation {
    constructor(
        {
            email, 
            phoneNumber,
            phonePassword
        } = {}
    ) {
        this._email = getStringOrNull(email)
        this._phoneNumber = getStringOrNull(phoneNumber)
        this._phonePassword = getStringOrNull(phonePassword)
    }

    static create(
        email, 
        phoneNumber,
        phonePassword
    ) {
        const plain = {
            email: email, 
            phoneNumber: phoneNumber,
            phonePassword: phonePassword
        }
        return new ContactInformation(plain)
    }

    get email() {
        return this._email
    }

    get phoneNumber() {
        return this._phoneNumber
    }

    get phonePassword() {
        return this._phonePassword
    }

    toJSON() {
        return {
            email: this._email,
            phoneNumber: this._phoneNumber,
            phonePassword: this._phonePassword
        }
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new ContactInformation(plainObject)
    }
}