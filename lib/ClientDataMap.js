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
            'primaryAddress.recipient': 'address.address.recipient',
            'primaryAddress.street': 'address.address.street',
            'primaryAddress.city': 'address.address.city',
            'primaryAddress.postalCode': 'address.address.postalCode',
            'primaryAddress.country': 'address.address.country',
            'mailingAddress.recipient': 'address.mailingAddress.recipient',
            'mailingAddress.street': 'address.mailingAddress.street',
            'mailingAddress.city': 'address.mailingAddress.city',
            'mailingAddress.postalCode': 'address.mailingAddress.postalCode',
            'mailingAddress.country': 'address.mailingAddress.country',
            'bankAccount.prefix': 'bankAccount.prefix',
            'bankAccount.account': 'bankAccount.account',
            'bankAccount.code': 'bankAccount.code',
            'bankAccount.currency': 'bankAccount.currency',
            'bankAccount.foreign': 'bankAccount.foreign',
            'idCard.number': 'idCard.number',
            'idCard.issuedBy': 'idCard.issuedBy',
            'idCard.country': 'idCard.country',
            'idCard.validity': 'idCard.validity',
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