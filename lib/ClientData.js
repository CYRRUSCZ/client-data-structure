import AddressInformation from './AddressInformation.js'
import ContactInformation from './ContactInformation.js'
import BankingInformation from './BankingInformation.js'
import PersonalInformation from './PersonalInformation.js'
import ClientInformation from './ClientInformation.js'
import IdCardInformation from './IdCardInformation.js'
import CompanyInformation from './CompanyInformation.js'
import { getInstanceOfClass } from './helpers.js'

export const PLAIN_OBJECT_KEY_CLIENT = 'client'
export const PLAIN_OBJECT_KEY_PERSONAL = 'personal'
export const PLAIN_OBJECT_KEY_ID_CARD = 'idCard'
export const PLAIN_OBJECT_KEY_CONTACT = 'contact'
export const PLAIN_OBJECT_KEY_BANK_ACCOUNT = 'bankAccount'
export const PLAIN_OBJECT_KEY_ADDRESS = 'address'
export const PLAIN_OBJECT_KEY_COMPANY = 'company'

export const PLAIN_OBJECT_KEYS = [
    PLAIN_OBJECT_KEY_CLIENT,
    PLAIN_OBJECT_KEY_PERSONAL,
    PLAIN_OBJECT_KEY_ID_CARD,
    PLAIN_OBJECT_KEY_CONTACT,
    PLAIN_OBJECT_KEY_BANK_ACCOUNT,
    PLAIN_OBJECT_KEY_ADDRESS,
    PLAIN_OBJECT_KEY_COMPANY
]

export const ADDRESS_TYPE_REGULAR = `${AddressInformation.ADDRESS_TYPE_REGULAR}`
export const ADDRESS_TYPE_MAILING = `${AddressInformation.ADDRESS_TYPE_MAILING}`
export const CLIENT_TYPE_PERSON = `${ClientInformation.CLIENT_TYPE_PERSON}`
export const CLIENT_TYPE_COMPANY = `${ClientInformation.CLIENT_TYPE_COMPANY}`
export const CLIENT_TYPE_SELFEMPLOYED = `${ClientInformation.CLIENT_TYPE_SELFEMPLOYED}`
export const CLIENT_ORIGIN_INTERNAL = `${ClientInformation.CLIENT_ORIGIN_INTERNAL}`
export const CLIENT_ORIGIN_CAPITOL = `${ClientInformation.CLIENT_ORIGIN_CAPITOL}`
export const CLIENT_ORIGIN_CRM = `${ClientInformation.CLIENT_ORIGIN_CRM}`
export const CLIENT_ORIGIN_WEB = `${ClientInformation.CLIENT_ORIGIN_WEB}`
export const CLIENT_TYPES = JSON.parse(JSON.stringify(ClientInformation.CLIENT_TYPES))
export const CLIENT_ORIGINS = JSON.parse(JSON.stringify(ClientInformation.CLIENT_ORIGINS))

export default class ClientData {
    constructor({
        client,
        personal,
        idCard,
        address,
        contact,
        bankAccount,
        company
    } = {}
    ) {
        this._client = getInstanceOfClass(client, ClientInformation)
        this._personal = getInstanceOfClass(personal, PersonalInformation)
        this._address = getInstanceOfClass(address, AddressInformation)
        this._idCard = getInstanceOfClass(idCard, IdCardInformation)
        this._contact = getInstanceOfClass(contact, ContactInformation)
        this._bankAccount = getInstanceOfClass(bankAccount, BankingInformation)
        this._company = getInstanceOfClass(company, CompanyInformation)
    }

    static create(
        client,
        personal,
        idCard,
        address,
        contact,
        bankAccount,
        company,
        regularAddress,
        mailingAddress
    ) {
        let plain = {}
        plain[PLAIN_OBJECT_KEY_CLIENT] = client
        plain[PLAIN_OBJECT_KEY_PERSONAL] = personal
        plain[PLAIN_OBJECT_KEY_ID_CARD] = idCard
        plain[PLAIN_OBJECT_KEY_ADDRESS] = (address instanceof AddressInformation) ? address.toPlainObject() : address
        plain[PLAIN_OBJECT_KEY_CONTACT] = contact
        plain[PLAIN_OBJECT_KEY_BANK_ACCOUNT] = bankAccount
        plain[PLAIN_OBJECT_KEY_COMPANY] = (company instanceof CompanyInformation) ? company.toPlainObject() : company
        if (regularAddress !== undefined || mailingAddress !== undefined) {
            if (
                (plain[PLAIN_OBJECT_KEY_ADDRESS] === undefined) ||
                (typeof plain[PLAIN_OBJECT_KEY_ADDRESS] !== 'object') ||
                (plain[PLAIN_OBJECT_KEY_ADDRESS] === null)
            ) {
                plain[PLAIN_OBJECT_KEY_ADDRESS] = {}
            }
            if (regularAddress !== undefined) {
                plain[PLAIN_OBJECT_KEY_ADDRESS][ADDRESS_TYPE_REGULAR] = regularAddress
            }
            if (mailingAddress !== undefined) {
                plain[PLAIN_OBJECT_KEY_ADDRESS][ADDRESS_TYPE_MAILING] = mailingAddress
            }
        }
        return new ClientData(plain)
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

    get company() {
        return this._company
    }
    
    get bankAccount() { 
        return this._bankAccount 
    }

    get fullAddress() {
        return this.address.useMailingAddress ? this.address.mailingAddress.fullAddress : this.address.address.fullAddress
    }

    get email() {
        return this.contact.email
    }

    get fullName() {
        return this.personal.fullName
    }

    get dataOriginName() {
        return this.client.dataOriginName
    }

    get typeName() {
        return this.client.typeName
    }

    get dataOriginId() {
        return this.client.dataOriginId
    }

    get dataOrigin() {
        return this.client.dataOrigin
    }

    get type() {
        return this.client.type
    }

    toJSON() {
        let plainObject = {}
        plainObject[PLAIN_OBJECT_KEY_CLIENT] = this.client.toPlainObject()
        plainObject[PLAIN_OBJECT_KEY_PERSONAL] = this.personal.toPlainObject()
        plainObject[PLAIN_OBJECT_KEY_ID_CARD] = this.idCard.toPlainObject()
        plainObject[PLAIN_OBJECT_KEY_CONTACT] = this.contact.toPlainObject()
        plainObject[PLAIN_OBJECT_KEY_BANK_ACCOUNT] = this.bankAccount.toPlainObject()
        plainObject[PLAIN_OBJECT_KEY_ADDRESS] = this.address.toPlainObject()
        plainObject[PLAIN_OBJECT_KEY_COMPANY] = this.company.toPlainObject()
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

    static get PLAIN_OBJECT_KEY_COMPANY () {
        return PLAIN_OBJECT_KEY_COMPANY
    }

    static get ADDRESS_TYPE_MAILING () {
        return AddressInformation.ADDRESS_TYPE_MAILING
    }

    static get ADDRESS_TYPE_REGULAR () {
        return AddressInformation.ADDRESS_TYPE_REGULAR
    }

    static get CLIENT_TYPE_PERSON () {
        return ClientInformation.CLIENT_TYPE_PERSON
    }

    static get CLIENT_TYPE_COMPANY () {
        return ClientInformation.CLIENT_TYPE_COMPANY
    }

    static get CLIENT_TYPE_SELFEMPLOYED () {
        return ClientInformation.CLIENT_TYPE_SELFEMPLOYED
    }
    
    static get CLIENT_ORIGIN_INTERNAL () {
        return ClientInformation.CLIENT_ORIGIN_INTERNAL
    }
    
    static get CLIENT_ORIGIN_CAPITOL () {
        return ClientInformation.CLIENT_ORIGIN_CAPITOL
    }
    
    static get CLIENT_ORIGIN_CRM () {
        return ClientInformation.CLIENT_ORIGIN_CRM
    }
    
    static get CLIENT_ORIGIN_WEB () {
        return ClientInformation.CLIENT_ORIGIN_WEB
    }

    static get CLIENT_TYPES () {
        return ClientInformation.CLIENT_TYPES
    }

    static get CLIENT_ORIGINS () {
        return ClientInformation.CLIENT_ORIGINS
    }
}