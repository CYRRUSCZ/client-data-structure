# CYRRUS Client Data Structure

## Introduction
This library is a set of classes that represents client data structure needed to communicate with CYRRUS DocHub API. It can be used to create a normalized serializable object that can be used as data transfer object with CYRRUS DocHub ecosystem APIs.

## API
See the generated ./docs

## Validation
The library provides a set of validation methods that can be used to validate the client data structure. Validation requires the following peer dependecies to be installed:

- ajv
- ajv-formats
- cdigit
- ibantools
- libphonenumber-js

### Data structure examples

#### Person

```js
{
    client: {
        type: 'person', // type of the client
        dataOrigin: 'capitol', // data origin
        dataOriginId: '677e6e8bd0ef6cdccf37c7d5', // data origin id - internal id of the client
        capitolId: '4405184170', // internal capitol id of the client
        crmId: null, // internal dynamics crm id of the client
        investmentProfiles: [], // investment profiles of the client - deprecated
        residency: true, // flag indicating that the client is a resident in the Czech Republic
        economicalSectorCode: '1442000', // economical sector code
        brokerId: '54', // internal capitol user broker id - personal broker of the client
        externalBrokerCapitolId: null, // external broker capitol id
        externalBrokerAgentCapitolId: null, // external broker agent capitol id
        legislation: null, // legislation country code
        investmentParameters: [
            {
                version: '20220609', // version of the investment questionaire evaluator
                uid: 'parAMLProfile', // unique identifier of the investment parameter in the context of the version
                name: 'AML Profil', // name of the investment parameter
                added: '2022-11-10T23:00:00.000Z', // date of the investment parameter addition
                value: '1', // value of the investment parameter
                isInvestmentCategory: false // flag that indicates if the parameter is an investment category
            },
            {
                version: '20220609', // version of the investment questionaire evaluator
                uid: 'parInvCatBonds', // unique identifier of the investment parameter in the context of the version
                name: 'bonds', // name of the investment parameter
                added: '2022-11-10T23:00:00.000Z', // date of the investment parameter addition
                value: '1', // value of the investment parameter
                isInvestmentCategory: true // flag that indicates if the parameter is an investment category
            },
            // ...
        ],
        bankAccountsConfirmedByAffidavit: true // flag indicating that the client has confirmed bank accounts by affidavit
    },
    personal: {
        prenominal: 'Ing.', // prenominal title of the person
        firstName: 'Richard', // first name of the person
        lastName: 'Foo', // last name of the person
        postnominal: null, // postnominal title of the person
        birthNumber: '440518416', // birth number of the person
        dateOfBirth: '1944-05-18T12:00:00.000Z', // date of birth of the person
        noBirthNumber: false, // flag that indicates if the birth number is not available
        birthNumberCountry: 'CZE', // country of the birth number
        taxDomicile: 'CZE', // country of the tax domicile
        placeOfBirth: 'Most', // place of birth of the person
        citizenship: 'CZE', // country of the citizenship
        gender: 'male', // gender of the person
        politician: false // flag that indicates if the person is a politician
    },
    idCard: {
        number: '216258253', // identification card number
        issuedBy: 'MěÚ Moravská Třebová', // the authority that issued the identification card
        country: 'CZE', // the country code of the identification card
        validity: '2058-10-09T12:00:00.000Z', // the validity of the identification card
        type: 'OP', // the type of the identification card
        scanNotAllowed: true // flag indicating that identification card cannot be scanned
    },
    address: {
        useMailingAddress: false, // flag that indicates if the mailing address should be used as the postal address
        address: {
            recipient: 'Ing. Richard Foo', // the name of the recipient
            street: 'Bar', // the street name
            streetNumber: '985/38', // the street number
            city: 'Brno', // the city name
            country: 'CZE', // the country name
            postalCode: '57101' // the postal code
        },
        mailingAddress: {
            recipient: 'Foo Richard', // the name of the recipient
            street: null, // the street name
            streetNumber: null, // the street number
            city: null, // the city name
            country: null, // the country name
            postalCode: null // the postal code
        }
    },
    contact: {
        email: 'foo.bar@seznam.cz', // the email address
        phoneNumber: '+420 731 792 557', // the phone number
        phonePassword: 'Foo' // the phone password
    },
    bankAccounts: [
        {
            id: '677e6e8bd0ef6cdccf37c7d6', // the internal id of the bank account
            iban: null, // the iban of the foreign bank account
            swift: null, // the swift code of the foreign bank account
            bankNameAddress: null, // the name and address of the bank for foreign bank accounts
            accountName: null, // the name of the account holder for foreign bank accounts
            prefix: '000000', // the prefix of the bank account
            account: '5899780227', // the account number
            code: '0100', // the bank code
            currency: 'CZK', // the currency of the bank account
            foreign: false, // flag that indicates if the bank account is foreign
            capitolId: null // the id of the capitol bank account record
        },
        {
            id: '677e6e8bd0ef6cdccf37c7d7', // the internal id of the bank account
            iban: null, // the iban of the foreign bank account
            swift: null, // the swift code of the foreign bank account
            bankNameAddress: null, // the name and address of the bank for foreign bank accounts
            accountName: null, // the name of the account holder for foreign bank accounts
            prefix: '034298', // the prefix of the bank account
            account: '0740351591', // the account number
            code: '0100', // the bank code
            currency: 'CZK', // the currency of the bank account
            foreign: false, // flag that indicates if the bank account is foreign
            capitolId: null // the id of the capitol bank account record
        }
    ],
    company: {
        ic: null, // company identification number
        dic: null, // VAT identification number
        lei: null, // LEI idenfication number
        name: null, // name of the company
        taxDomicile: null, // country of tax domicile
        representatives: [] // representatives of the company
    }
}
```

#### Company

```js
{
    client: {
        type: 'company', // type of the client
        dataOrigin: 'internal', // data origin
        dataOriginId: '6756ed16be89f26259a6b49f', // data origin id - internal id of the client
        capitolId: '2000041908', // internal capitol id of the client
        crmId: null, // internal dynamics crm id of the client
        investmentProfiles: [], // investment profiles of the client - deprecated
        residency: true, // flag indicating that the client is a resident in the Czech Republic
        economicalSectorCode: '1100200', // economical sector code
        brokerId: '780', // internal capitol user broker id - personal broker of the client
        externalBrokerCapitolId: null, // external broker capitol id
        externalBrokerAgentCapitolId: null, // external broker agent capitol id
        legislation: null, // legislation country code
        investmentParameters: [
            {
                version: '20230210', // version of the investment questionaire evaluator
                uid: 'parInvCatBonds', // unique identifier of the investment parameter in the context of the version
                name: 'bonds', // name of the investment parameter
                added: '2024-12-11T09:26:52.173Z', // date of the investment parameter addition
                value: '1', // value of the investment parameter
                isInvestmentCategory: true // flag that indicates if the parameter is an investment category
            },
            {
                version: '20230210', // version of the investment questionaire evaluator
                uid: 'parInvCatCurrencyForwards', // unique identifier of the investment parameter in the context of the version
                name: 'currencyForwards', // name of the investment parameter
                added: '2024-12-11T09:26:52.173Z', // date of the investment parameter addition
                value: '1', // value of the investment parameter
                isInvestmentCategory: true // flag that indicates if the parameter is an investment category
            },
            // ...
        ],
        bankAccountsConfirmedByAffidavit: true // flag indicating that the client has confirmed bank accounts by affidavit
    },
    personal: {
        prenominal: null, // prenominal title of the person
        firstName: null, // first name of the person
        lastName: null, // last name of the person
        postnominal: null, // postnominal title of the person
        birthNumber: null, // birth number of the person
        dateOfBirth: '2024-12-09T12:00:00.000Z', // date of birth of the person
        noBirthNumber: false, // flag that indicates if the birth number is not available
        birthNumberCountry: null, // country of the birth number
        taxDomicile: null, // country of the tax domicile
        placeOfBirth: null, // place of birth of the person
        citizenship: null, // country of the citizenship
        politician: false // flag that indicates if the person is a politician
    },
    idCard: {
        number: null, // identification card number
        issuedBy: null, // the authority that issued the identification card
        country: null, // the country code of the identification card
        validity: '2024-12-09T12:00:00.000Z', // the validity of the identification card
        type: null, // the type of the identification card
        scanNotAllowed: false // flag indicating that identification card cannot be scanned
    },
    address: {
        useMailingAddress: true, // flag that indicates if the mailing address should be used as the postal address
        address: {
            recipient: 'Foo Property s.r.o.', // the name of the recipient
            street: 'FooBarová', // the street name
            streetNumber: '140/20', // the street number
            city: 'Praha', // the city name
            country: 'CZE', // the country name
            postalCode: '12000' // the postal code
        },
        mailingAddress: {
            recipient: 'Michal Foo', // the name of the recipient
            street: 'FooBarová', // the street name
            streetNumber: '249/46', // the street number
            city: 'Praha', // the city name
            country: 'CZE', // the country name
            postalCode: '18600' // the postal code
        }
    },
    contact: {
        email: 'foo.bar@seznam.cz', // the email address
        phoneNumber: '+420722360712', // the phone number
        phonePassword: 'Foo' // the phone password
    },
    bankAccounts: [
        {
            id: '6756ed16be89f26259a6b4a0', // the internal id of the bank account
            iban: null, // the iban of the foreign bank account
            swift: null, // the swift code of the foreign bank account
            bankNameAddress: null, // the name and address of the bank for foreign bank accounts
            accountName: null, // the name of the account holder for foreign bank accounts
            prefix: '000000', // the prefix of the bank account
            account: '0805643104', // the account number
            code: '2700', // the bank code
            currency: 'CZK', // the currency of the bank account
            foreign: false, // flag that indicates if the bank account is foreign
            capitolId: null // the id of the capitol bank account record
        }
    ],
    company: {
        ic: '27663681', // company identification number
        dic: 'CZ27463981', // VAT identification number
        lei: '314700GBP90UUSQ15U27', // LEI idenfication number
        name: 'Foo Property s.r.o.', // name of the company
        taxDomicile: 'CZE', // country of tax domicile
        representatives: [
            {
                id: '6756ed16be89f26259a6b4a1', // internal id of the representative
                personal: {
                    prenominal: 'Ing.', // prenominal title of the person
                    firstName: 'Michal', // first name of the person
                    lastName: 'Foo', // last name of the person
                    postnominal: null, // postnominal title of the person
                    birthNumber: '690511/1368', // birth number of the person
                    dateOfBirth: '1969-05-11T12:00:00.000Z', // date of birth of the person
                    noBirthNumber: false, // flag that indicates if the birth number is not available
                    birthNumberCountry: 'CZE', // country of the birth number
                    taxDomicile: 'CZE', // country of the tax domicile
                    placeOfBirth: 'Pardubice', // place of birth of the person
                    citizenship: 'CZE', // country of the citizenship
                    gender: 'male', // gender of the person
                    politician: false // flag that indicates if the person is a politician
                },
                position: 'Jednatel', // position of the representative
                address: {
                    recipient: 'Ing. Michal Foo', // the name of the recipient
                    street: 'FooBarová', // the street name
                    streetNumber: '813/72', // the street number
                    city: 'Praha', // the city name
                    postalCode: '16900', // the postal code
                    country: 'CZE' // the country name
                },
                idCard: {
                    number: '235471587', // identification card number
                    issuedBy: 'ÚMČ Praha 6', // the authority that issued the identification card
                    country: 'CZE', // the country code of the identification card
                    validity: '2033-03-07T12:00:00.000Z', // the validity of the identification card
                    type: 'OP', // the type of the identification card
                    scanNotAllowed: true // flag indicating that identification card cannot be scanned
                },
                contact: {
                    email: 'foo.bar@seznam.cz', // the email address
                    phoneNumber: '+420724360712', // the phone number
                    phonePassword: null // the phone password
                },
                isRepresentative: true, // flag indicating if the person is a representative
                isRealOwner: true, // flag indicating if the person is a real owner
                hasPowerOfAttorney: false, // flag indicating if the person has power of attorney
                realOwnerReasonNumber: '1', // reason number for being a real owner
                realOwnerReasonChar: 'a', // reason character for being a real owner
                capitolId: null, // internal capitol id of the representative
                capitolContactId: null // internal capitol contact id of the representative
            },
            // ...
        ]
    }
}
```

### Mapping to capitol web service calls

#### Create client

```js
import { ClientData } from '@cyrrus/clientdatastructure'
const clientData = new ClientData(/* ... */)

//Input data for GetClient.dll - Method: CapNewClient

// in addition to the data from the clientData object, the following data is set directly on the capitol DB
// TB_KLIENT.KLILEI: clientData.company.lei
// TB_KLIENT.KLIDORUC: 4
// TB_KLIENT.KLIGCD: according to the client origin and country
// TB_KLIENT.KLIOSM: according to the client origin and country

// for clients from the Croatia the following data is set
// TB_KLIENT.KLIREFMENA: 'EUR'
{
    RCIC: `${((clientData.personal.noBirthNumber) ? '' : ((!clientData.isCompany) ? clientData.personal.birthNumber : clientData.company.ic))}`.replace(/\D/ig, ''),
    RCICSTAT: countries.alpha3ToAlpha2((!clientData.isCompany) ? clientData.personal.birthNumberCountry : clientData.address.address.country),
    PRIJMENI: (!clientData.isCompany) ? clientData.personal.lastName : clientData.company.name,
    JMENO: (!clientData.isCompany) ? clientData.personal.firstName : '',
    TITUL: (!clientData.isCompany) ? clientData.personal.prenominal : undefined,
    TITUL2: undefined,
    TITULX: (!clientData.isCompany) ? ((clientData.personal.postnominal !== null) ? clientData.personal.postnominal : undefined) : undefined,
    FO: (clientData.isPerson) ? '3' : '0',
    NAROZENDNE: (!clientData.isCompany) ? this.jsDateToXmlDate(clientData.personal.dateOfBirth) : undefined,
    OPASCISLO: (!clientData.isCompany) ? clientData.idCard.number : undefined,
    OPASPLATIDO: (!clientData.isCompany) ? this.jsDateToXmlDate(clientData.idCard.validity) : undefined,
    OPPASSTAT: (!clientData.isCompany) ? countries.alpha3ToAlpha2(clientData.idCard.country) : undefined,
    KULICE: (clientData.address.useMailingAddress) ? clientData.address.mailingAddress.street : undefined,
    KCISLO: (clientData.address.useMailingAddress) ? clientData.address.mailingAddress.streetNumber : undefined,
    KOBEC: (clientData.address.useMailingAddress) ? clientData.address.mailingAddress.city : undefined,
    KSTATISO: (clientData.address.useMailingAddress) ? countries.alpha3ToAlpha2(clientData.address.mailingAddress.country) : undefined,
    KPSC: (clientData.address.useMailingAddress) ? `${clientData.address.mailingAddress.postalCode}`.replace(/\D/ig, '') : undefined,
    KADRESAT: (clientData.address.useMailingAddress) ? clientData.address.mailingAddress.recipient : undefined,
    ULICE: clientData.address.address.street,
    CISLO: clientData.address.address.streetNumber,
    OBEC: clientData.address.address.city,
    STATISO: countries.alpha3ToAlpha2(clientData.address.address.country),
    PSC: `${clientData.address.address.postalCode}`.replace(/\D/ig, '') || 0,
    DANDOMICIL: countries.alpha3ToAlpha2((!clientData.isCompany) ? clientData.personal.taxDomicile : clientData.company.taxDomicile),
    IC2: undefined, // in the case of a need for generated RCIC this parameter is set to original RCIC and RCIC is set to generated random number
    RCVYDALOCP: '0', // in the case of a need for generated RCIC this parameter is set to 1
    KIDCAGENT: (clientData.client.externalBrokerCapitolId) ? clientData.client.externalBrokerCapitolId : undefined,
    KIDCBROKER: undefined,
    KIDCPOVERENI: (clientData.client.externalBrokerAgentCapitolId) ? clientData.client.externalBrokerAgentCapitolId : undefined,
    KANCELAR: undefined,
    RESIDENT: (clientData.client.residency) ? '1' : '0',
    JAZYK: (clientData.client.legislation === 'hr_HR') ? 'HRT' : 'CZE',
    EKONSEKTOR: clientData.client.economicalSectorCode,
    TELHESLO: clientData.contact.phonePassword
}

// Mapping of each person to the GetClient.dll - Method: SetDecisionPersn
{
    OSOBA: `${person.personal.lastName} ${person.personal.firstName}`,
    TYP: person.position,
    RODNE: ((person.personal.noBirthNumber) ? this.jsDateToXmlDate(person.personal.dateOfBirth) : `${person.personal.birthNumber}`.replace(/\D/ig, '')),
    TELEFON: person.contact.phoneNumber,
    EMAIL: person.contact.email || undefined,
    ULICE: `${person.address.street} ${person.address.streetNumber}`,
    OBEC: person.address.city,
    PSC: person.address.postalCode,
    OPASCISLO: person.idCard.number,
    OPASPLATIDO: `${documentValidity[2]}.${documentValidity[1]}.${documentValidity[0]}`,
    STAT: countries.alpha3ToAlpha2(person.idCard.country),
    NAROZENDNE: this.jsDateToXmlDate(person.personal.dateOfBirth),
    NAROZENSTAT: countries.alpha3ToAlpha2(person.personal.birthNumberCountry),
    NAROZENOBEC: person.personal.placeOfBirth,
    MAJITEL: person.isRealOwner ? '1' : '0',
    TAXID: undefined,
    TAXSTAT: countries.alpha3ToAlpha2(person.personal.taxDomicile)
}

// Mapping of each bank account to the GetClient.dll - Method: SetClientBank
{
    BANKANAZEV: (account.foreign) ? `${account.accountName}`.substr(0, 50) : undefined,
    BANKAKOD: (!account.foreign) ? account.code : '0000',
    UCETCISLO: (!account.foreign) ? `${account.prefix}-${account.account}` : undefined,
    IBAN: (account.foreign) ? `${account.iban}`.replace(/\s/ig, '') : undefined,
    SPECSYMBOL: undefined,
    SWIFT: (account.foreign) ? account.swift : undefined,
    PRIMAR: 0
}

// Mapping of contact information: GetClient.dll - Method: CapSetClientContact
// for person and self-employed person
{
    TELEFON: clientData.contact.phoneNumber,
    EMAIL: clientData.contact.email || undefined,
    TELHESLO: clientData.contact.phonePassword
}

// for company, for each representative
{
    OSOBA: representative.personal.fullName,
    TELEFON: representative.contact.phoneNumber,
    FAX: undefined,
    EMAIL: representative.contact.email,
    PRIMAR: 0
}

```