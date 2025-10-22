import type { InvestmentParameterInput } from '../../src/InvestmentParameter'

interface TestCase {
    data: Partial<InvestmentParameterInput> | any
    expected?: string | string[]
}

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            version: null,
            uid: 'parFoo',
            name: 'Foo super risky',
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/version must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: null,
            name: 'Foo super risky',
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/uid must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: 'parFoo',
            name: null,
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/name must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: 'parFoo',
            name: 'Foo super risky',
            addedAt: null,
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/addedAt must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: 'parFoo',
            name: 'Foo super risky',
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: null,
            isInvestmentCategory: true
        },
        expected: [
            '/value must be string'
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            version: null,
            uid: 'parFoo',
            name: 'Foo super risky',
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/version must be string',
            '/value must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: null,
            name: 'Foo super risky',
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/uid must be string',
            '/value must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: 'parFoo',
            name: null,
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/name must be string',
            '/value must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: 'parFoo',
            name: 'Foo super risky',
            addedAt: null,
            value: 1,
            isInvestmentCategory: true
        },
        expected: [
            '/addedAt must be string',
            '/value must be string'
        ]
    },
    {
        data: {
            version: 'foo-version',
            uid: 'parFoo',
            name: 'Foo super risky',
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: null,
            isInvestmentCategory: true
        },
        expected: [
            '/value must be string'
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            version: 'foo-version',
            uid: 'parFoo',
            name: 'Foo super risky',
            addedAt: new Date('2019-02-14T12:00:00.000Z'),
            value: 1,
            isInvestmentCategory: true
        }
    }
]
