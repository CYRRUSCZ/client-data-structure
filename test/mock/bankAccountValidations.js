module.exports = {
    expectErrorsTestCases: [
        // Local account tests
        {
            data: {
                prefix: null,
                account: null,
                code: '0800',
                currency: 'CZK',
                foreign: false
            },
            expected: [
                '/account must be string',
                'must match "else" schema'
            ]
        },
        {
            data: {
                prefix: null,
                account: '123456',
                code: null,
                currency: 'CZK',
                foreign: false
            },
            expected: [
                '/code must be string',
                'must match "else" schema'
            ]
        },
        {
            data: {
                prefix: null,
                account: '123456',
                code: '0300',
                currency: null,
                foreign: false
            },
            expected: [
                '/currency must be string',
                '/currency must be equal to one of the allowed values'
            ]
        },
        {
            data: {
                prefix: null,
                account: '123456',
                code: '0300',
                currency: 'YAN',
                foreign: false
            },
            expected: [
                '/currency must be equal to one of the allowed values'
            ]
        },
        // Foreign account tests
        {
            data: {
                currency: 'CZK',
                bankNameAddress: 'Gringoth bank',
                accountName: 'Potter Harry',
                iban: 'IT60 AAAA BBBB 1010 0000 0123 456',
                swift: 'UNCRITMM',
                foreign: true
            },
            expected: [
                '/iban Invalid IBAN'
            ]
        },
        {
            data: {
                prefix: null,
                account: null,
                code: '0800',
                currency: 'CZK',
                bankNameAddress: 'Gringoth bank',
                accountName: 'Potter Harry',
                iban: 'CZ65 0800 0000 1920 0014 5399',
                swift: 'UNCRITMMAAAAA',
                foreign: true
            },
            expected: [
                '/swift Invalid SWIFT/BIC'
            ]
        },
        {
            data: {
                currency: 'CZK',
                accountName: 'Potter Harry',
                iban: 'CZ65 0800 0000 1920 0014 5399',
                swift: 'UNCRITMM',
                foreign: true
            },
            expected: [
                '/bankNameAddress must be string',
                'must match "then" schema',
            ]
        },
        {
            data: {
                currency: 'CZK',
                bankNameAddress: 'Gringoth bank',
                iban: 'CZ65 0800 0000 1920 0014 5399',
                swift: 'UNCRITMM',
                foreign: true
            },
            expected: [
                '/accountName must be string',
                'must match "then" schema',
            ]
        },
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                prefix: null,
                account: null,
                code: '0800',
                currency: 'CZK',
                foreign: false
            },
            expected: [
                '/account must be string',
                'must match "else" schema'
            ]
        },
        {
            data: {
                prefix: null,
                account: '123456',
                code: null,
                currency: 'CZK',
                foreign: false
            },
            expected: [
                '/code must be string',
                'must match "else" schema'
            ]
        },
        {
            data: {
                prefix: null,
                account: '123456',
                code: '0300',
                currency: null,
                foreign: false
            },
            expected: [
                '/currency must be string',
                '/currency must be equal to one of the allowed values'
            ]
        },
        {
            data: {
                prefix: null,
                account: '123456',
                code: '0300',
                currency: 'YAN',
                foreign: false
            },
            expected: [
                '/currency must be equal to one of the allowed values'
            ]
        },
        // Foreign account tests
        {
            data: {
                currency: 'CZK',
                bankNameAddress: 'Gringoth bank',
                accountName: 'Potter Harry',
                iban: 'IT60 AAAA BBBB 1010 0000 0123 456',
                swift: 'UNCRITMM',
                foreign: true
            },
            expected: [
                '/iban Invalid IBAN'
            ]
        },
        {
            data: {
                prefix: null,
                account: null,
                code: '0800',
                currency: 'CZK',
                bankNameAddress: 'Gringoth bank',
                accountName: 'Potter Harry',
                iban: 'CZ65 0800 0000 1920 0014 5399',
                swift: 'UNCRITMMAAAAA',
                foreign: true
            },
            expected: [
                '/swift Invalid SWIFT/BIC'
            ]
        },
        {
            data: {
                currency: 'CZK',
                accountName: 'Potter Harry',
                iban: 'CZ65 0800 0000 1920 0014 5399',
                swift: 'UNCRITMM',
                foreign: true
            },
            expected: [
                'must have required property \'bankNameAddress\'',
                'must match "then" schema',
            ]
        },
        {
            data: {
                currency: 'CZK',
                bankNameAddress: 'Gringoth bank',
                iban: 'CZ65 0800 0000 1920 0014 5399',
                swift: 'UNCRITMM',
                foreign: true
            },
            expected: [
                'must have required property \'accountName\'',
                'must match "then" schema',
            ]
        },
    ],
    testCasesValidData: [
        {
            data: {
                id: 'foo',
                capitolId: 'crapitolId',
                prefix: '000000',
                account: '1234567891',
                code: '0800',
                currency: 'CZK',
                foreign: false
            }
        },
        {
            data: {
                id: 'bar',
                capitolId: 'capitolId',
                prefix: '000000',
                account: null,
                code: null,
                currency: 'CZK',
                iban: 'CZ65 0800 0000 1920 0014 5399',
                swift: 'AGBACZPP',
                bankNameAddress: 'test banka',
                accountName: 'test jmeno',
                foreign: true
            }
        }
    ]
}
