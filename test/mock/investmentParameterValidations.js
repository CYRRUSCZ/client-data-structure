module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                version: null,
                uid: 'parFoo',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
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
                added: new Date('2019-02-14T12:00:00.000Z'),
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
                added: new Date('2019-02-14T12:00:00.000Z'),
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
                added: null,
                value: 1,
                isInvestmentCategory: true
            },
            expected: [
                '/added must be string'
            ]
        },
        {
            data: {
                version: 'foo-version',
                uid: 'parFoo',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
                value: null,
                isInvestmentCategory: true
            },
            expected: [
                '/value must be string'
            ]
        }
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                version: null,
                uid: 'parFoo',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
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
                added: new Date('2019-02-14T12:00:00.000Z'),
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
                added: new Date('2019-02-14T12:00:00.000Z'),
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
                added: null,
                value: 1,
                isInvestmentCategory: true
            },
            expected: [
                '/added must be string',
                '/value must be string'
            ]
        },
        {
            data: {
                version: 'foo-version',
                uid: 'parFoo',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
                value: null,
                isInvestmentCategory: true
            },
            expected: [
                '/value must be string'
            ]
        }
    ],
    testCasesValidData: [
        {
            data: {
                version: 'foo-version',
                uid: 'parFoo',
                name: 'Foo super risky',
                added: new Date('2019-02-14T12:00:00.000Z'),
                value: 1,
                isInvestmentCategory: true
            }
        }
    ]
}
