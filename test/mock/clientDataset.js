module.exports = {
    client: {
        type: 'person',
        dataOrigin: 'capitol',
        dataOriginId: '123456789',
        crmId: 'FooBaarBaZqaz',
        capitolId: 'crapItAll'
    },
    personal: {
        prenominal: 'Ing.',
        firstName: 'Tomáš',
        lastName: 'Hovnivý',
        postnominal: 'Csc. MBA',
        birthNumber: '987654321',
        dateOfBirth: new Date('2019-02-14T12:00:00.000Z'),
        noBirthNumber: false,
        birthNumberCountry: 'CZE',
        taxDomicile: 'CZE',
        placeOfBirth: 'Řiťka',
        citizenship: 'CZE',
        gender: 'male'
    },
    idCard: {
        number: '123456789',
        issuedBy: 'Městys Prdelní Lhota',
        country: 'CZE',
        validity: new Date('2021-02-14T12:00:00.000Z')
    },
    address: {
        address: {
            recipient: 'První kanální a.s.',
            street: 'Zasmrádlá 554/6a',
            city: 'Prdelní Lhota',
            postalCode: '66609',
            country: 'CZE'
        },
        mailingAddress: {
            recipient: 'Milada Hovnivá',
            street: 'U hroudy 15',
            city: 'Díra nad Řiťkou',
            postalCode: '668 02',
            country: 'CZE'
        },
        useMailingAddress: true
    },
    contact: {
        email: 'i.luv.shit@intestines.com',
        phoneNumber: '+420123456789',
        phonePassword: 'Nasrat a rozmazat'
    },
    bankAccount: {
        prefix: '000000',
        account: '123456789',
        code: '0800',
        currency: 'CZK',
        foreign: false
    },
    company: {
        ic: '49551655',
        dic: 'CZ49551655',
        address: {
            recipient: 'TOI TOI, sanitární systémy, s r.o.',
            street: 'Pražská 264',
            city: 'Slaný',
            postalCode: '27401',
            country: 'CZE'
        }
    }
}