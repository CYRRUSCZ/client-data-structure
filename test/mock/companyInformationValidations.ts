import type { CompanyInformationInput } from '../../src/CompanyInformation'

interface TestCase {
    data: Partial<CompanyInformationInput> | any
    expected?: string | string[]
}

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: '123456789',
            dic: '123456789',
            lei: '123456789',
            taxDomicile: '',
            representatives: []
        },
        expected: [
            '/taxDomicile must be string'
        ]
    },
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: null,
            dic: null,
            lei: '123456789',
            taxDomicile: '123456',
            representatives: []
        },
        expected: [
            '/ic must be string',
            '/taxDomicile must be string'
        ]
    },
    {
        data: {
            name: null,
            ic: '123456789',
            dic: null,
            lei: '123456789',
            taxDomicile: '123456',
            representatives: []
        },
        expected: [
            '/name must be string',
            '/taxDomicile must be string'
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: '123456789',
            dic: '123456789',
            lei: '123456789',
            taxDomicile: '',
            representatives: []
        },
        expected: [
            '/taxDomicile must be string'
        ]
    },
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: null,
            dic: null,
            lei: '123456789',
            taxDomicile: '123456',
            representatives: []
        },
        expected: [
            '/ic must be string'
        ]
    },
    {
        data: {
            name: null,
            ic: '123456789',
            dic: null,
            lei: '123456789',
            taxDomicile: '123456',
            representatives: []
        },
        expected: [
            '/name must be string'
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: '123456789',
            dic: '123456789',
            lei: '123456789',
            taxDomicile: 'CZ',
            representatives: []
        }
    },
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: '123456789',
            dic: '123456789',
            lei: '123456789',
            taxDomicile: 'CZ',
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
                        validity: (() => {
                            const d = new Date()
                            d.setFullYear(d.getFullYear() + 2)
                            return d
                        })(),
                        type: 'id',
                        scanNotAllowed: false
                    },
                    contact: {
                        phoneNumber: '+420728796525',
                        email: 'tomas@valiasek.cz'
                    }
                }
            ]
        }
    },
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: '123456789',
            dic: null,
            lei: '123456789',
            taxDomicile: 'CZ',
            representatives: []
        }
    },
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: '123456789',
            dic: '123456789',
            lei: null,
            taxDomicile: 'CZ',
            representatives: []
        }
    },
    {
        data: {
            name: 'FooBaarBaZqaz',
            ic: '123456789',
            dic: '123456789',
            lei: null,
            taxDomicile: 'CZ',
            representatives: []
        }
    }
]
