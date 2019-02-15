import AddressInformation from './AddressInformation.js'
import ContactInformation from './ContactInformation.js'
import BankingInformation from './BankingInformation.js'
import PersonalInformation from './PersonalInformation.js'
import ClientInformation from './ClientInformation.js'
import IdCardInformation from './IdCardInformation.js'
import { getInstanceOfClass } from './helpers.js'

export const PLAIN_OBJECT_KEY_CLIENT = 'client'
export const PLAIN_OBJECT_KEY_PERSONAL = 'personal'
export const PLAIN_OBJECT_KEY_ID_CARD = 'idCard'
export const PLAIN_OBJECT_KEY_CONTACT = 'contact'
export const PLAIN_OBJECT_KEY_BANK_ACCOUNT = 'bankAccount'
export const PLAIN_OBJECT_KEY_ADDRESS = 'address'
export const ADDRESS_TYPE_REGULAR = `${AddressInformation.ADDRESS_TYPE_REGULAR}`
export const ADDRESS_TYPE_MAILING = `${AddressInformation.ADDRESS_TYPE_MAILING}`

export default class ClientData {
    constructor({
        client,
        personal,
        idCard,
        address,
        contact,
        bankAccount
    } = {}
    ) {
        this._client = getInstanceOfClass(client, ClientInformation)
        this._personal = getInstanceOfClass(personal, PersonalInformation)
        this._address = getInstanceOfClass(address, AddressInformation)
        this._idCard = getInstanceOfClass(idCard, IdCardInformation)
        this._contact = getInstanceOfClass(contact, ContactInformation)
        this._bankAccount = getInstanceOfClass(bankAccount, BankingInformation)
    }

    get client() { 
        return this._client
    }
    
    get personal() { 
        return this._personal 
    }
    
    get idCard() { 
        return this._idCard 
    }
    
    get address() { 
        return this._address 
    }
    
    get contact() { 
        return this._contact 
    }
    
    get bankAccount() { 
        return this._bankAccount 
    }

    toJSON() {
        let plainObject = {}
        plainObject[PLAIN_OBJECT_KEY_CLIENT] = this.client
        plainObject[PLAIN_OBJECT_KEY_PERSONAL] = this.personal
        plainObject[PLAIN_OBJECT_KEY_ID_CARD] = this.idCard
        plainObject[PLAIN_OBJECT_KEY_CONTACT] = this.contact
        plainObject[PLAIN_OBJECT_KEY_BANK_ACCOUNT] = this.bankAccount
        plainObject[PLAIN_OBJECT_KEY_ADDRESS] = this.address
        return plainObject
    }

    toPlainObject() { 
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new ClientData(plainObject)
    }

    static get PLAIN_OBJECT_KEY_CLIENT () {
        return PLAIN_OBJECT_KEY_CLIENT
    }
    
    static get PLAIN_OBJECT_KEY_PERSONAL () {
        return PLAIN_OBJECT_KEY_PERSONAL
    }
    
    static get PLAIN_OBJECT_KEY_ID_CARD () {
        return PLAIN_OBJECT_KEY_ID_CARD
    }
    
    static get PLAIN_OBJECT_KEY_CONTACT () {
        return PLAIN_OBJECT_KEY_CONTACT
    }
    
    static get PLAIN_OBJECT_KEY_BANK_ACCOUNT () {
        return PLAIN_OBJECT_KEY_BANK_ACCOUNT
    }

    static get PLAIN_OBJECT_KEY_ADDRESS () {
        return PLAIN_OBJECT_KEY_ADDRESS
    }

    static get ADDRESS_TYPE_MAILING () {
        return AddressInformation.ADDRESS_TYPE_MAILING
    }

    static get ADDRESS_TYPE_REGULAR () {
        return AddressInformation.ADDRESS_TYPE_REGULAR
    }
}