import type { ClientInformationInput } from '../../src/ClientInformation'

interface TestCase {
    data: Partial<ClientInformationInput> | any
    expected?: string | string[]
}

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            type: null,
            dataOrigin: 'capitol',
            internalId: '123456789',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
            brokerContactId: null,
            externalBrokerContactId: null,
            externalBrokerAgentContactId: null
        },
        expected: [
            '/type must be string',
            '/type must be equal to one of the allowed values'
        ]
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: null,
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
        },
        expected: [
            '/economicalSectorCode must be string'
        ]
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: null,
            investmentParameters: [],
            isResident: false,
        },
        expected: [
            '/legislation must be string'
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            type: null,
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
        },
        expected: [
            '/type must be string',
            '/type must be equal to one of the allowed values',
        ]
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: null,
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
        },
        expected: [
            '/economicalSectorCode must be string',
        ]
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: null,
            investmentParameters: [],
            isResident: false,
        },
        expected: [
            '/legislation must be string',
        ]
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
        },
        expected: [
        ]
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
        },
        expected: [
        ]
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
        },
        expected: [
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            type: 'person',
            economicalSectorCode: 2002212,
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: false,
        }
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: null,
        }
    },
    {
        data: {
            type: 'company',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: true,
        }
    },
    {
        data: {
            type: 'selfemployed',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: true,
        }
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: true,
        }
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: true,
        }
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: true,
        }
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            isResident: true,
        }
    },
    {
        data: {
            type: 'person',
            economicalSectorCode: '2002212',
            legislation: 'cs_CZ',
            investmentParameters: [],
            isResident: true,
        }
    },
]
