export class ClientDataMap {
    constructor () {
        this._map = {
            prenominal: 'personal.prenominal',
            firstName: 'personal.firstName',
            lastName: 'personal.lastName',
            postnominal: 'personal.postnominal',
            birthNumber: 'personal.birthNumber',
            dateOfBirth: 'personal.dateOfBirth',
            noBirthNumber: 'personal.noBirthNumber',
            birthNumberCountry: 'personal.birthNumberCountry',
            taxDomicile: 'personal.taxDomicile',
            placeOfBirth: 'personal.placeOfBirth',
            citizenship: 'personal.citizenship',
            email: 'contact.email',
            phoneNumber: 'contact.phoneNumber',
            phonePassword: 'contact.phonePassword',
            primaryAddressRecipient: 'address.address.recipient',
            primaryAddressStreet: 'address.address.street',
            primaryAddressCity: 'address.address.city',
            primaryAddressPostalCode: 'address.address.postalCode',
            primaryAddressCountry: 'address.address.country',
            mailingAddressRecipient: 'address.mailingAddress.recipient',
            mailingAddressStreet: 'address.mailingAddress.street',
            mailingAddressCity: 'address.mailingAddress.city',
            mailingAddressPostalCode: 'address.mailingAddress.postalCode',
            mailingAddressCountry: 'address.mailingAddress.country',
            idCardNumber: 'idCard.number',
            idCardIssuedBy: 'idCard.issuedBy',
            idCardCountry: 'idCard.country',
            idCardValidity: 'idCard.validity',
            type: 'client.type',
            dataOrigin: 'client.dataOrigin',
            dataOriginId: 'client.dataOriginId',
            ic: 'company.ic',
            dic: 'company.dic',
            companyAddressRecipient: 'company.address.recipient',
            companyAddressStreet: 'company.address.street',
            companyAddressCity: 'company.address.city',
            companyAddressPostalCode: 'company.address.postalCode',
            companyAddressCountry: 'company.address.country'
        }
    }

    keys () {
        return Object.keys(this._map)
    }

    getMappedEntry (key, clientData) {
        if (this.keys().indexOf(key) === -1) {
            throw new Error(`Trying to get non-mapped data by key [${key}]`)
        }
        let temp = clientData
        for (const index of this._map[key].split('.')) {
            temp = temp[index]
        }
        return temp
    }
}
