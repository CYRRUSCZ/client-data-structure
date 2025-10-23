import type { ClientDataInput } from '../../src/ClientData'

const validValidityDate = (() => {
    const now = new Date()
    const year = now.getUTCFullYear()
    const month = now.getUTCMonth()
    const day = now.getUTCDate()
    return new Date(Date.UTC(year + 1, month, day, 12, 0, 0, 0))
})()

const clientDataset: Partial<ClientDataInput> = {
    client: {
        type: 'person',
        dataOrigin: 'capitol',
        internalId: '123456789',
        contactId: null,
        economicalSectorCode: '2002212',
        legislation: 'cs_CZ',
        preferredLanguage: 'cs_CZ',
        investmentParameters: [
            {
                version: 'foo-version',
                uid: 'parFoo',
                name: 'Foo super risky',
                addedAt: new Date('2019-02-14T12:00:00.000Z'),
                value: '1',
                isInvestmentCategory: true
            }
        ],
        isResident: false,
        brokerContactId: null,
        externalBrokerContactId: null,
        externalBrokerAgentContactId: null
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
        gender: 'male'
    },
    idCard: {
        number: '123456789',
        issuedBy: 'Brno',
        country: 'CZE',
        validity: validValidityDate,
        type: 'id',
        scanNotAllowed: true
    },
    address: {
        address: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        },
        mailingAddress: {
            cytronId: null,
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
        phoneNumber: '+420123456789'
    },
    bankAccounts: [
        {
            id: 'foo',
            cytronId: null,
            prefix: '000000',
            account: '123456789',
            code: '0800',
            currency: 'CZK',
            isForeign: false,
            isConfirmedByAffidavit: false
        },
        {
            prefix: '000001',
            account: '123456789',
            code: '0800',
            currency: 'EUR',
            isForeign: false,
            isConfirmedByAffidavit: false,
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
            isForeign: true,
            cytronId: null,
            isConfirmedByAffidavit: false
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
                cytronId: null,
                contactId: null,
                hasPowerOfAttorney: false,
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
                    gender: 'male'
                },
                address: {
                    cytronId: null,
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
                    validity: validValidityDate,
                    type: 'id',
                    scanNotAllowed: true
                },
                contact: {
                    phoneNumber: '+420 728 796 525',
                    email: 'tomas@valiasek.cz'
                }
            }
        ]
    }
}

export default clientDataset
