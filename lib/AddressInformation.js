import { Address } from './Address'

export class AddressInformation {
    constructor (
        {
            address,
            mailingAddress,
            useMailingAddress = false
        } = {}
    ) {
        this._address = (address instanceof Address) ? address : new Address(address)
        this._mailingAddress = (mailingAddress instanceof Address) ? mailingAddress : new Address(mailingAddress)
        this._useMailingAddress = (useMailingAddress === true)
    }

    static create (
        address,
        mailingAddress,
        useMailingAddress = false
    ) {
        const plain = {
            useMailingAddress: useMailingAddress
        }
        plain[AddressInformation.ADDRESS_TYPE_REGULAR] = address
        plain[AddressInformation.ADDRESS_TYPE_MAILING] = mailingAddress
        return new AddressInformation(plain)
    }

    get address () {
        return this._address
    }

    get mailingAddress () {
        return this._mailingAddress
    }

    get useMailingAddress () {
        return this._useMailingAddress
    }

    toJSON () {
        const plainObject = {
            useMailingAddress: this.useMailingAddress
        }
        plainObject[AddressInformation.ADDRESS_TYPE_REGULAR] = this.address.toPlainObject()
        plainObject[AddressInformation.ADDRESS_TYPE_MAILING] = this.mailingAddress.toPlainObject()
        return plainObject
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (plainObject) {
        return new AddressInformation(plainObject)
    }

    static get ADDRESS_TYPE_REGULAR () {
        return 'address'
    }

    static get ADDRESS_TYPE_MAILING () {
        return 'mailingAddress'
    }

    static get PLAIN_OBJECT_ADDRESS_TYPES () {
        return [
            AddressInformation.ADDRESS_TYPE_REGULAR,
            AddressInformation.ADDRESS_TYPE_MAILING
        ]
    }
}
