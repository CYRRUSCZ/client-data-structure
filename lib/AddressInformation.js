import Address from './Address.js'

export default class AddressInformation {
    constructor(
        {
            address, 
            mailingAddress,
            useMailingAddress = false
        } = {}
    ) {
        this._address = new Address(address)
        this._mailingAddress = new Address(mailingAddress)
        this._useMailingAddress = (useMailingAddress === true)
    }

    get address() {
        return this._address
    }

    get mailingAddress() {
        return this._mailingAddress
    }

    get useMailingAddress() {
        return this._useMailingAddress
    }

    toJSON() {
        let plainObject = {
            useMailingAddress: this.useMailingAddress
        }
        plainObject[AddressInformation.ADDRESS_TYPE_REGULAR] = this.address
        plainObject[AddressInformation.ADDRESS_TYPE_MAILING] = this.mailingAddress
        return plainObject
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new AddressInformation(plainObject)
    }

    static get ADDRESS_TYPE_REGULAR() {
        return 'address'
    }

    static get ADDRESS_TYPE_MAILING() {
        return 'mailingAddress'
    }

    static get PLAIN_OBJECT_ADDRESS_TYPES() {
        return [
            AddressInformation.ADDRESS_TYPE_REGULAR,
            AddressInformation.ADDRESS_TYPE_MAILING
        ]
    }
}