export default class ClientDataMap {
    constructor () {
        this._map = {
            'prenominal': 'personal.prenominal',
            'firstName': 'personal.firstName',
            'lastName': 'personal.lastName',
            'postnominal': 'personal.postnominal',
            'birthNumber': 'personal.birthNumber',
            'dateOfBirth': 'personal.dateOfBirth',
            'noBirthNumber': 'personal.noBirthNumber',
            'birthNumberCountry': 'personal.birthNumberCountry',
            'taxDomicile': 'personal.taxDomicile',
            'placeOfBirth': 'personal.placeOfBirth',
            'citizenship': 'personal.citizenship',
            'email': 'contact.email',
            'phoneNumber': 'contact.phoneNumber',
            'phonePassword': 'contact.phonePassword',
            'primaryAddressRecipient': 'address.address.recipient',
            'primaryAddressStreet': 'address.address.street',
            'primaryAddressCity': 'address.address.city',
            'primaryAddressPostalCode': 'address.address.postalCode',
            'primaryAddressCountry': 'address.address.country',
            'mailingAddressRecipient': 'address.mailingAddress.recipient',
            'mailingAddressStreet': 'address.mailingAddress.street',
            'mailingAddressCity': 'address.mailingAddress.city',
            'mailingAddressPostalCode': 'address.mailingAddress.postalCode',
            'mailingAddressCountry': 'address.mailingAddress.country',
            'bankAccountPrefix': 'bankAccount.prefix',
            'bankAccountAccount': 'bankAccount.account',
            'bankAccountCode': 'bankAccount.code',
            'bankAccountCurrency': 'bankAccount.currency',
            'bankAccountForeign': 'bankAccount.foreign',
            'idCardNumber': 'idCard.number',
            'idCardIssuedBy': 'idCard.issuedBy',
            'idCardCountry': 'idCard.country',
            'idCardValidity': 'idCard.validity',
            'type': 'client.type',
            'dataOrigin': 'client.dataOrigin',
            'dataOriginId': 'client.dataOriginId'
        }
    }

    keys() {
        return Object.keys(this._map)
    }

    getMappedEntry(key, clientData) {
        if (this.keys().indexOf(key) === -1) {
            throw new Error(`Trying to get non-mapped data by key [${key}]`)
        }
        let temp = clientData
        for (let index of this._map[key].split('.')) {
            temp = temp[index]
        }
        return temp
    }
}