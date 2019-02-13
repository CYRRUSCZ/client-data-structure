export default class ContactInformation {
    constructor(email, phoneNumber) {
        this._email = typeof email === 'undefined' ? null : email
        this._phoneNumber = typeof phoneNumber === 'undefined' ? null : phoneNumber
    }

    get email() {
        return this._email
    }

    get phoneNumber() {
        return this._phoneNumber
    }

    toPlainObject() {
        return {
            email: this.email,
            phoneNumber: this.phoneNumber
        }
    }

    static fromPlainObject(obj) {
        return new ContactInformation(
            obj.email,
            obj.phoneNumber
        )
    }
}