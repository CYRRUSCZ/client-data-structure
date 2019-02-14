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

    static get PLAIN_OBJECT_KEY() {
        return 'address'
    }

    toJSON() {
        let plainObject = {
            useMailingAddress: this.useMailingAddress
        }
        plainObject[Address.ADDRESS_TYPE_REGULAR] = this.address
        plainObject[Address.ADDRESS_TYPE_MAILING] = this.mailingAddress
        return plainObject
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new AddressInformation(plainObject)
    }
}