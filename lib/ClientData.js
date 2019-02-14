import AddressInformation from './AddressInformation.js'
import ContactInformation from './ContactInformation.js'
import BankingInformation from './BankingInformation.js'
import PersonalInformation from './PersonalInformation.js'
import ClientInformation from './ClientInformation.js'
import IdCardInformation from './IdCardInformation.js'
import { getInstanceOfClass } from './helpers.js'

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
        plainObject[ClientInformation.PLAIN_OBJECT_KEY] = this.client
        plainObject[PersonalInformation.PLAIN_OBJECT_KEY] = this.personal
        plainObject[IdCardInformation.PLAIN_OBJECT_KEY] = this.idCard
        plainObject[ContactInformation.PLAIN_OBJECT_KEY] = this.contact
        plainObject[BankingInformation.PLAIN_OBJECT_KEY] = this.bankAccount
        plainObject[AddressInformation.PLAIN_OBJECT_KEY] = this.address
        return plainObject
    }

    toPlainObject() { 
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new ClientData(plainObject)
    }
}