import type { IdCardInformationInput } from '../../src/IdCardInformation'

interface TestCase {
    data: Partial<IdCardInformationInput> | any
    expected?: string | string[]
}

const validityValidDate = (() => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)
    return date
})()

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            number: '',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'RP',
            scanNotAllowed: true,
        },
        expected: [
            '/number must be string',
            '/type must be equal to one of the allowed values'
        ]
    },
    {
        data: {
            number: '123456789',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'RP',
            scanNotAllowed: true,
        },
        expected: [
            '/type must be equal to one of the allowed values'
        ]
    },
    {
        data: {
            number: '123456789',
            issuedBy: null,
            country: 'CR',
            validity: validityValidDate,
            type: 'RP',
            scanNotAllowed: true,
        },
        expected: [
            '/issuedBy must be string',
            '/type must be equal to one of the allowed values'
        ]
    },
    {
        data: {
            number: '123456789',
            issuedBy: 'Uncle Bob',
            country: null,
            validity: validityValidDate,
            type: 'RP',
            scanNotAllowed: true,
        },
        expected: [
            '/country must be string',
            '/type must be equal to one of the allowed values'
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            number: '',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'RP',
            scanNotAllowed: true,
        },
        expected: [
            '/number must NOT have fewer than 5 characters',
            '/type must be equal to one of the allowed values'
        ]
    },
    {
        data: {
            number: '123456789',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'RP',
            scanNotAllowed: true,
        },
        expected: [
            '/type must be equal to one of the allowed values'
        ]
    },
    {
        data: {
            number: '123456789',
            issuedBy: null,
            country: 'CR',
            validity: validityValidDate,
            type: 'id',
            scanNotAllowed: true,
        },
        expected: [
            '/issuedBy must be string'
        ]
    },
    {
        data: {
            number: '123456789',
            issuedBy: 'Uncle Bob',
            country: null,
            validity: validityValidDate,
            type: 'id',
            scanNotAllowed: true,
        },
        expected: [
            '/country must be string'
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            number: '123456',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'id',
            scanNotAllowed: true,
        }
    },
    {
        data: {
            number: '123456',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'passport',
            scanNotAllowed: true,
        }
    },
    {
        data: {
            number: '123456',
            issuedBy: 'Uncle Bob',
            country: 'SK',
            validity: validityValidDate,
            type: 'passport',
            scanNotAllowed: true,
        }
    },
    {
        data: {
            number: '123456',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'id',
            scanNotAllowed: false,
        }
    },
    {
        data: {
            number: 123456,
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: validityValidDate,
            type: 'id',
            scanNotAllowed: true,
        }
    },
    {
        data: {
            number: '123456789',
            issuedBy: 'Uncle Bob',
            country: 'CR',
            validity: null,
            type: 'id',
            scanNotAllowed: true,
        }
    },
]
