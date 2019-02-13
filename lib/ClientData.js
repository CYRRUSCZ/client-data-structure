import Address from './Address.js'
import ContactInformation from './ContactInformation.js'
import BankingInformation from './BankingInformation.js'

export default class ClientData {
    get firstName() {
        return this._firstName
    }

    get lastName() {
        return this._lastName
    }

    get degree() {
        return this._degree
    }

    get birthNumber() {
        return this._birthNumber
    }

    get dateOfBirth() {
        return this._dateOfBirth
    }

    get mailingAddress() {
        return this._mailingAddress
    }

    get address() {
        return this._address
    }

    get contactInformation() {
        return this._contactInformation
    }

    get bankingInformation() {
        return this._bankingInformation
    }

    constructor(firstName, lastName, degree, birthNumber, dateOfBirth, mailingAddress, address, contactInformation, bankingInformation) {
        this._firstName = typeof firstName === 'undefined' ? null : firstName
        this._lastName = typeof lastName === 'undefined' ? null : lastName
        this._degree = typeof degree === 'undefined' ? null : degree
        this._birthNumber = typeof birthNumber === 'undefined' ? null : birthNumber
        this._dateOfBirth = dateOfBirth instanceof Date ? dateOfBirth : new Date(0)
        this._mailingAddress = mailingAddress instanceof Address ? mailingAddress : new Address()
        this._address = address instanceof Address ? address : new Address()
        this._contactInformation = contactInformation instanceof ContactInformation ? contactInformation : new ContactInformation()
        this._bankingInformation = bankingInformation instanceof BankingInformation ? bankingInformation : new BankingInformation()
    }

    toPlainObject() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            degree: this.degree,
            birthNumber: this.birthNumber,
            dateOfBirth: this.dateOfBirth,
            address: {
                mailingAddress: this.mailingAddress.toPlainObject(),
                address: this.address.toPlainObject()
            },
            contactInformation: this.contactInformation.toPlainObject(),
            bankingInformation: this.bankingInformation.toPlainObject()
        }
    }

    static fromPlainObject(obj) {
        return new ClientData(
            obj.firstName,
            obj.lastName,
            obj.degree,
            obj.birthNumber,
            obj.dateOfBirth instanceof Date ? obj.dateOfBirth : new Date(Date.parse(obj.dateOfBirth)),
            Address.fromPlainObject(obj.address.mailingAddress),
            Address.fromPlainObject(obj.address.address),
            ContactInformation.fromPlainObject(obj.contactInformation),
            BankingInformation.fromPlainObject(obj.bankingInformation)
        )
    }
}