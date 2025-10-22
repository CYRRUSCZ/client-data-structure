import type { AddressInput } from '../../src/Address'

interface TestCase {
    data: Partial<AddressInput>
    expected?: string
}

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: null,
            postalCode: '66609',
            country: 'CZE'
        },
        expected: '/city must be string'
    },
    {
        data: {
            cytronId: null,
            street: null,
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        },
        expected: '/street must be string'
    },
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: null,
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        },
        expected: '/streetNumber must be string'
    },
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: null,
            country: 'CZE'
        },
        expected: '/postalCode must be string'
    },
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: null
        },
        expected: '/country must be string'
    },
    {
        data: {
            cytronId: null,
            street: null,
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: null,
            country: 'CZE'
        },
        expected: '/street must be string\n/postalCode must be string'
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: null,
            postalCode: '66609',
            country: 'CZE'
        },
        expected: '/city must be string'
    },
    {
        data: {
            cytronId: null,
            street: null,
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        },
        expected: '/street must be string'
    },
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: null,
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        },
        expected: '/streetNumber must be string'
    },
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: null,
            country: 'CZE'
        },
        expected: '/postalCode must be string'
    },
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: null
        },
        expected: '/country must be string'
    },
    {
        data: {
            cytronId: null,
            street: null,
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: null,
            country: 'CZE'
        },
        expected: '/street must be string\n/postalCode must be string'
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        }
    },
    {
        data: {
            cytronId: null,
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: 66609,
            country: 'CZE'
        }
    }
]
