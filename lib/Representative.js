import { getInstanceOfClass, getStringOrNull } from './helpers.js'
import Address from './Address.js'
import IdCardInformation from './IdCardInformation.js'
import PersonalInformation from './PersonalInformation.js'
import ContactInformation from './ContactInformation.js'

export const PLAIN_OBJECT_KEY_PERSONAL = 'personal'
export const PLAIN_OBJECT_KEY_POSITION = 'position'
export const PLAIN_OBJECT_KEY_POLITICIAN = 'politician'
export const PLAIN_OBJECT_KEY_ADDRESS = 'address'
export const PLAIN_OBJECT_KEY_ID_CARD = 'idCard'
export const PLAIN_OBJECT_KEY_CONTACT = 'contact'
export const PLAIN_OBJECT_KEY_ID = 'id'

export default class Representative {
    constructor (
      {
          personal,
          position,
          politician,
          address,
          idCard,
          id,
          contact,
          _id = null,
          isRepresentative = true,
          isRealOwner = false,
          realOwnerReasonChar = null,
          realOwnerReasonNumber = null,
          capitolId = null,
          capitolContactId = null
      } = {}
    ) {
        this._personal = getInstanceOfClass(personal, PersonalInformation)
        this._position = getStringOrNull(position)
        this._politician = (politician === true)
        this._address = getInstanceOfClass(address, Address)
        this._idCard = getInstanceOfClass(idCard, IdCardInformation)
        this._contact = getInstanceOfClass(contact, ContactInformation)
        this._id = (id !== undefined && id !== null) ? getStringOrNull(id) : getStringOrNull(_id)
        this._isRealOwner = (isRealOwner === true)
        this._realOwnerReasonChar = realOwnerReasonChar
        this._realOwnerReasonNumber = realOwnerReasonNumber
        this._capitolId = capitolId
        this._isRepresentative = isRepresentative
        this._capitolContactId = getStringOrNull(capitolContactId)
    }

    static create (
        personal,
        position,
        politician,
        address,
        idCard,
        id,
        contact,
        isRepresentative = true,
        isRealOwner = false,
        realOwnerReasonChar = null,
        realOwnerReasonNumber = null,
        capitolId = null,
        capitolContactId = null
    ) {
        const plain = {
            isRepresentative: isRepresentative,
            isRealOwner: isRealOwner,
            realOwnerReasonChar: realOwnerReasonChar,
            realOwnerReasonNumber: realOwnerReasonNumber,
            capitolId: capitolId,
            capitolContactId: capitolContactId
        }
        plain[PLAIN_OBJECT_KEY_PERSONAL] = personal
        plain[PLAIN_OBJECT_KEY_POSITION] = position
        plain[PLAIN_OBJECT_KEY_POLITICIAN] = politician
        plain[PLAIN_OBJECT_KEY_ID_CARD] = idCard
        plain[PLAIN_OBJECT_KEY_ADDRESS] = address
        plain[PLAIN_OBJECT_KEY_ID] = id
        plain[PLAIN_OBJECT_KEY_CONTACT] = contact
        return new Representative(plain)
    }

    get personal () {
        return this._personal
    }

    get position () {
        return this._position
    }

    get politician () {
        return this._politician
    }

    get idCard () {
        return this._idCard
    }

    get id () {
        return this._id
    }

    get address () {
        return this._address
    }

    get contact() {
        return this._contact
    }

    get isRealOwner() {
        return this._isRealOwner
    }

    get realOwnerReasonChar() {
        return this._realOwnerReasonChar
    }

    get realOwnerReasonNumber() {
        return this._realOwnerReasonNumber
    }

    get capitolId() {
        return this._capitolId
    }

    get capitolContactId() {
        return this._capitolContactId
    }

    get isRepresentative() {
        return this._isRepresentative
    }

    toJSON () {
        const plain = {
            isRepresentative: this._isRepresentative,
            isRealOwner: this._isRealOwner,
            realOwnerReasonChar: this._realOwnerReasonChar,
            realOwnerReasonNumber: this._realOwnerReasonNumber,
            capitolId: this._capitolId,
            capitolContactId: this._capitolContactId
        }
        plain[PLAIN_OBJECT_KEY_PERSONAL] = this.personal.toJSON()
        plain[PLAIN_OBJECT_KEY_POSITION] = this.position
        plain[PLAIN_OBJECT_KEY_POLITICIAN] = this.politician
        plain[PLAIN_OBJECT_KEY_ID_CARD] = this.idCard.toJSON()
        plain[PLAIN_OBJECT_KEY_ADDRESS] = this.address.toJSON()
        plain[PLAIN_OBJECT_KEY_ID] = this.id
        plain[PLAIN_OBJECT_KEY_CONTACT] = this.contact.toJSON()
        return plain
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (object) {
        return new Representative(object)
    }
}