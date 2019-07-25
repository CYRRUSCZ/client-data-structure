module.exports = {
    client: {
        type: 'person',
        dataOrigin: 'capitol',
        dataOriginId: '123456789',
        crmId: 'FooBaarBaZqaz',
        capitolId: 'crapItAll',
        investmentProfiles: [
            {
                version: 'foo-version',
                uid: 'uid',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z')
            },
            {
                version: 'bar-version',
                uid: 'baruid',
                name: 'Bar extreme risky',
                added: new Date('2019-02-14T12:00:00.000Z')
            }
        ]
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
        validity: new Date('2021-02-14T12:00:00.000Z'),
        type: 'OP',
        scanNotAllowed: true
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
        lei: 'someleiid',
        name: 'TOI TOI, sanitární systémy, s r.o.',
        taxDomicile: 'CZE',
        representatives: [
            {
                id: null,
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
                position: 'jednatel',
                politician: true,
                address: {
                    recipient: 'První kanální a.s.',
                    street: 'Zasmrádlá 554/6a',
                    city: 'Prdelní Lhota',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Městys Prdelní Lhota',
                    country: 'CZE',
                    validity: new Date('2021-02-14T12:00:00.000Z'),
                    type: 'OP',
                    scanNotAllowed: false
                },
                contact: {
                    phoneNumber: '728796525',
                    email: 'tomas@valiasek.cz',
                    phonePassword: null
                }
            }
        ]
    }
}