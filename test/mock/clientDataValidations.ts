import type { ClientDataInput } from '../../src/ClientData'

interface TestCase {
    data: any
    expected?: string | string[]
}

const maxDateOfBirth = (() => {
    const now = new Date()
    const year = now.getUTCFullYear()
    const month = now.getUTCMonth()
    const day = now.getUTCDate()
    return new Date(Date.UTC(year - 1, month, day, 12, 0, 0, 0)).toISOString()
})()

const validityValidDate = (() => {
    const now = new Date()
    const year = now.getUTCFullYear()
    const month = now.getUTCMonth()
    const day = now.getUTCDate()
    return new Date(Date.UTC(year + 1, month, day, 12, 0, 0, 0))
})()

export const expectErrorsTestCases = [
    {
        data: {},
        expected: [
            'must match \"else\" schema',
            '/address/address/city must be string',
            '/address/address/country must be string',
            '/address/address/postalCode must be string',
            '/address/address/street must be string',
            '/address/address/streetNumber must be string',
            '/client/economicalSectorCode must be string',
            '/client/legislation must be string',
            '/client/type must be equal to one of the allowed values',
            '/client/type must be string',
            '/contact/email must be string',
            '/contact/phoneNumber must be string',
            '/idCard/country must be string',
            '/idCard/issuedBy must be string',
            '/idCard/number must be string',
            '/idCard/type must be equal to one of the allowed values',
            '/idCard/type must be string',
            '/personal must match "then" schema',
            '/personal/birthNumber must be string',
            '/personal/birthNumberCountry must be string',
            '/personal/citizenship must be string',
            `/personal/dateOfBirth should be <= ${maxDateOfBirth}`,
            '/personal/firstName must be string',
            '/personal/gender must be equal to one of the allowed values',
            '/personal/gender must be string',
            '/personal/lastName must be string',
            '/personal/placeOfBirth must be string',
            '/personal/taxDomicile must be string'
        ]
    },
    {
        data: {
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
            }
        },
        expected: [
            'must match \"else\" schema',
            '/address/address/city must be string',
            '/address/address/country must be string',
            '/address/address/postalCode must be string',
            '/address/address/street must be string',
            '/address/address/streetNumber must be string',
            '/client/economicalSectorCode must be string',
            '/client/legislation must be string',
            '/client/type must be equal to one of the allowed values',
            '/client/type must be string',
            '/contact/email must be string',
            '/contact/phoneNumber must be string',
            '/idCard/country must be string',
            '/idCard/issuedBy must be string',
            '/idCard/number must be string',
            '/idCard/type must be equal to one of the allowed values',
            '/idCard/type must be string',
        ]
    },
    {
        data: {
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
                address: {
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
                    street: 'U hroudy',
                    streetNumber: '15',
                    city: 'Brno',
                    postalCode: '668 02',
                    country: 'CZE'
                },
                useMailingAddress: true
            }
        },
        expected: [
            'must match \"else\" schema',
            '/client/economicalSectorCode must be string',
            '/client/legislation must be string',
            '/client/type must be equal to one of the allowed values',
            '/client/type must be string',
            '/contact/email must be string',
            '/contact/phoneNumber must be string',
            '/idCard/country must be string',
            '/idCard/issuedBy must be string',
            '/idCard/number must be string',
            '/idCard/type must be equal to one of the allowed values',
            '/idCard/type must be string',
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
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
            }
        },
        expected: [
            'must have required property \'address\'',
            'must have required property \'bankAccounts\'',
            'must have required property \'client\'',
            'must have required property \'company\'',
            'must have required property \'contact\'',
            'must match "then" schema'
        ]
    },
    {
        data: {
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
                address: {
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
                    street: 'U hroudy',
                    streetNumber: '15',
                    city: 'Brno',
                    postalCode: '668 02',
                    country: 'CZE'
                },
                useMailingAddress: true
            }
        },
        expected: [
            'must have required property \'bankAccounts\'',
            'must have required property \'client\'',
            'must have required property \'company\'',
            'must have required property \'contact\'',
            'must match "then" schema'
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            client: {
                type: 'person',
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
                residency: false
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
                validity: validityValidDate,
                type: 'id',
                scanNotAllowed: true
            },
            address: {
                address: {
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
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
            bankAccounts: [],
            company: {}
        }
    },
    {
        data: {
            client: {
                type: 'company',
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
                residency: false
            },
            address: {
                address: {
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
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
            bankAccounts: [],
            company: {
                name: 'První firma a.s.',
                ic: '12345678',
                taxDomicile: 'CZE'
            }
        }
    }
]
