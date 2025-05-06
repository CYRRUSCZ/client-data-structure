module.exports = {
    client: {
        type: 'person',
        dataOrigin: 'capitol',
        dataOriginId: '123456789',
        crmId: 'FooBaarBaZqaz',
        capitolId: 'crapItAll',
        economicalSectorCode: '2002212',
        legislation: 'cs_CZ',
        investmentProfiles: [
            {
                version: 'foo-version',
                uid: 'uid',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
                groupUid: 'foo',
                services: [
                    {
                        uid: 'fooService',
                        name: 'Foo service',
                        added: new Date('2019-02-14T12:00:00.000Z')
                    }
                ],
                weight: 1
            },
            {
                version: 'bar-version',
                uid: 'baruid',
                name: 'Bar extreme risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
                groupUid: 'bar',
                services: [],
                weight: 2
            }
        ],
        investmentParameters: [
            {
                version: 'foo-version',
                uid: 'parFoo',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
                value: 1,
                isInvestmentCategory: true
            }
        ],
        residency: false,
        brokerId: 123,
        externalBrokerCapitolId: 11,
        externalBrokerAgentCapitolId: 22
    },
    personal: {
        prenominal: 'Ing.',
        firstName: 'Tomáš',
        lastName: 'Marný',
        postnominal: 'Csc. MBA',
        birthNumber: '987654321',
        dateOfBirth: new Date('2019-02-14T12:00:00.000Z'),
        noBirthNumber: false,
        birthNumberCountry: 'CZE',
        taxDomicile: 'CZE',
        placeOfBirth: 'Brno',
        citizenship: 'CZE',
        gender: 'male',
        politician: true
    },
    idCard: {
        number: '123456789',
        issuedBy: 'Brno',
        country: 'CZE',
        validity: new Date('2021-02-14T12:00:00.000Z'),
        type: 'OP',
        scanNotAllowed: true
    },
    address: {
        address: {
            recipient: 'První firma a.s.',
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        },
        mailingAddress: {
            recipient: 'Milada Rudá',
            street: 'U hroudy',
            streetNumber: '15',
            city: 'Brno',
            postalCode: '668 02',
            country: 'CZE'
        },
        useMailingAddress: true
    },
    contact: {
        email: 'email@somewhere.com',
        phoneNumber: '+420123456789',
        phonePassword: 'FooBarBaz'
    },
    bankAccounts: [
        {
            id: 'foo',
            capitolId: 'crapitolId',
            prefix: '000000',
            account: '123456789',
            code: '0800',
            currency: 'CZK',
            foreign: false
        },
        {
            prefix: '000001',
            account: '123456789',
            code: '0800',
            currency: 'EUR',
            foreign: false,
            _id: 'bar'
        },
        {
            id: null,
            prefix: '000000',
            account: null,
            code: null,
            currency: 'CZK',
            iban: 'CZ65 0800 0000 1920 0014 5399',
            swift: 'AGBACZPP',
            bankNameAddress: 'test banka',
            accountName: 'test jmeno',
            foreign: true,
            capitolId: null
        }
    ],
    company: {
        ic: '49551655',
        dic: 'CZ49551655',
        lei: 'someleiid',
        name: 'Sanitární systémy, s.r.o.',
        taxDomicile: 'CZE',
        representatives: [
            {
                id: null,
                isRepresentative: true,
                isRealOwner: true,
                realOwnerReasonChar: 'a',
                realOwnerReasonNumber: '1',
                capitolId: null,
                capitolContactId: null,
                personal: {
                    prenominal: 'Ing.',
                    firstName: 'Tomáš',
                    lastName: 'Marný',
                    postnominal: 'Csc. MBA',
                    birthNumber: '987654321',
                    dateOfBirth: new Date('2019-02-14T12:00:00.000Z'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CZE',
                    taxDomicile: 'CZE',
                    placeOfBirth: 'Brno',
                    citizenship: 'CZE',
                    gender: 'male',
                    politician: true
                },
                position: 'jednatel',
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Brno',
                    country: 'CZE',
                    validity: new Date('2021-02-14T12:00:00.000Z'),
                    type: 'OP',
                    scanNotAllowed: false
                },
                contact: {
                    phoneNumber: '728796525',
                    email: 'tomas@valiasek.cz'
                }
            }
        ]
    }
}
