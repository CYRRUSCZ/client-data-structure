import type { AddressInformationInput } from '../../src/AddressInformation'

interface TestCase {
    data: Partial<AddressInformationInput>
    expected?: string | string[]
}

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            address: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: null
            },
            mailingAddress: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            useMailingAddress: false
        },
        expected: '/address/country must be string'
    },
    {
        data: {
            address: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            mailingAddress: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: null,
                postalCode: '66609',
                country: 'CZE'
            },
            useMailingAddress: true
        },
        expected: [
            '/mailingAddress/city must be string',
            'must match "then" schema'
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            address: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: null
            },
            mailingAddress: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            useMailingAddress: false
        },
        expected: '/address/country must be string'
    },
    {
        data: {
            address: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            mailingAddress: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: null,
                postalCode: '66609',
                country: 'CZE'
            },
            useMailingAddress: true
        },
        expected: [
            '/mailingAddress/city must be string',
            'must match "then" schema'
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            address: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            mailingAddress: {},
            useMailingAddress: false
        }
    },
    {
        data: {
            address: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            mailingAddress: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            useMailingAddress: true
        }
    }
]
