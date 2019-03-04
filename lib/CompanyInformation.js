import { getInstanceOfClass, getStringOrNull } from './helpers.js'
import Address from './AddressInformation'

export const PLAIN_OBJECT_KEY_IC = 'ic'
export const PLAIN_OBJECT_KEY_DIC = 'dic'
export const PLAIN_OBJECT_KEY_ADDRESS = 'address'

export default class CompanyInformation {
    constructor (
      {
          ic,
          dic,
          address
      } = {}
    ) {
        this._ic = getStringOrNull(ic)
        this._dic = getStringOrNull(dic)
        this._address = getInstanceOfClass(address, Address)
    }

    static create (
      ic,
      dic,
      address
    ) {
        let plain = {}
        plain[PLAIN_OBJECT_KEY_IC] = ic
        plain[PLAIN_OBJECT_KEY_DIC] = dic
        plain[PLAIN_OBJECT_KEY_ADDRESS] = address
        return new CompanyInformation(plain)
    }

    get ic () {
        return this._ic
    }

    get dic () {
        return this._dic
    }

    get address () {
        return this._address
    }

    toJSON () {
        let plain = {}
        plain[PLAIN_OBJECT_KEY_IC] = this.ic
        plain[PLAIN_OBJECT_KEY_DIC] = this.dic
        plain[PLAIN_OBJECT_KEY_ADDRESS] = this.address.toJSON()
        return plain
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (object) {
        return new CompanyInformation(object)
    }
}