import type { BankAccountInput } from '../../src/BankAccount'

interface TestCase {
    data: Partial<BankAccountInput>
    expected?: string | string[]
}

export const expectErrorsTestCases: TestCase[] = [
    // Local account tests
    {
        data: {
            prefix: null,
            account: null,
            code: '0800',
            currency: 'CZK',
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: true,
            isConfirmedByAffidavit: null
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
            isForeign: true,
            isConfirmedByAffidavit: null
        },
        expected: [
            '/swift Invalid SWIFT/BIC',
            '/swift must match pattern "^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$"',
            'must match "then" schema'
        ]
    },
    {
        data: {
            currency: 'CZK',
            accountName: 'Potter Harry',
            iban: 'CZ65 0800 0000 1920 0014 5399',
            swift: 'UNCRITMM',
            isForeign: true,
            isConfirmedByAffidavit: null
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
            isForeign: true,
            isConfirmedByAffidavit: null
        },
        expected: [
            '/accountName must be string',
            'must match "then" schema',
        ]
    },
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            prefix: null,
            account: null,
            code: '0800',
            currency: 'CZK',
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: false,
            isConfirmedByAffidavit: null
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
            isForeign: true,
            isConfirmedByAffidavit: null
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
            isForeign: true,
            isConfirmedByAffidavit: null
        },
        expected: [
            '/swift Invalid SWIFT/BIC',
            '/swift must match pattern "^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$"',
            'must match "then" schema'
        ]
    },
    {
        data: {
            currency: 'CZK',
            accountName: 'Potter Harry',
            iban: 'CZ65 0800 0000 1920 0014 5399',
            swift: 'UNCRITMM',
            isForeign: true,
            isConfirmedByAffidavit: null
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
            isForeign: true,
            isConfirmedByAffidavit: null
        },
        expected: [
            'must have required property \'accountName\'',
            'must match "then" schema',
        ]
    },
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            id: 'foo',
            cytronId: null,
            prefix: '000000',
            account: '1234567891',
            code: '0800',
            currency: 'CZK',
            isForeign: false,
            isConfirmedByAffidavit: null
        }
    },
    {
        data: {
            id: 'bar',
            cytronId: null,
            prefix: '000000',
            account: null,
            code: null,
            currency: 'CZK',
            iban: 'CZ65 0800 0000 1920 0014 5399',
            swift: 'AGBACZPP',
            bankNameAddress: 'test banka',
            accountName: 'test jmeno',
            isForeign: true,
            isConfirmedByAffidavit: null
        }
    }
]
