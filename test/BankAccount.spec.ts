import { BankAccount, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/bankAccountValidations'

const bankingInformation = [...(new ClientData(
    clientDataset
).bankAccounts)]

describe('BankingInformation', () => {
    it('serialization roundtrip', () => {
        const plain = bankingInformation.map(account => account.toPlainObject())
        expect(bankingInformation).toEqual([...plain].map(account => BankAccount.fromPlainObject(account)))

        const string = JSON.stringify(bankingInformation)
        expect(bankingInformation).toEqual((JSON.parse(string)).map((account: any) => BankAccount.fromPlainObject(account)))
    })

    it('id is substituted from _id', () => {
        expect(bankingInformation[0].id).toBe(clientDataset.bankAccounts?.[0].id)
        expect(bankingInformation[1].id).toBe(clientDataset.bankAccounts?.[1]._id)
    })

    it('foreign account is created', () => {
        expect(bankingInformation[2].bankNameAddress).toBe(clientDataset.bankAccounts?.[2].bankNameAddress)
    })
})

describe('BankAccount validations', () => {
    it.each(testCasesValidData)('validates correct bank account data', (testCase) => {
        const bankAccount = new BankAccount(testCase.data)
        expect(bankAccount.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data', (testCase) => {
        const bankAccount = new BankAccount(testCase.data)
        expect(() => bankAccount.validate()).toThrow()
        const validationErrors = bankAccount.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)

        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors.join('\n')).toBe(testCase.expected)
        }
    })

    it('validates POJO passed directly to validate()', () => {
        const bankAccount = new BankAccount()
        const invalidData = {
            prefix: null,
            account: null,
            code: '0800',
            currency: 'CZK',
            isForeign: false,
            isConfirmedByAffidavit: null
        }
        expect(() => bankAccount.validate(invalidData)).toThrow()
        const validationErrors = bankAccount.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)
        expect(validationErrors).toContain('/account must be string')
    })
})

describe('BankAccount.compareWith', () => {
    const bankAccount = new BankAccount({
        id: 'bank-123',
        currency: 'CZK',
        isForeign: false,
        account: '123456789',
        code: '0100',
        isConfirmedByAffidavit: null
    })

    it('returns empty array for identical bank accounts', () => {
        expect(bankAccount.compareWith(bankAccount.toJSON())).toEqual([])
    })

    it('detects field changes', () => {
        const currency = bankAccount.compareWith({ ...bankAccount.toJSON(), currency: 'EUR' })
        expect(currency).toEqual([{ path: 'currency', originalValue: 'CZK', changedValue: 'EUR' }])

        const flag = bankAccount.compareWith({ ...bankAccount.toJSON(), isForeign: true })
        expect(flag).toEqual([{ path: 'isForeign', originalValue: false, changedValue: true }])

        const multiple = bankAccount.compareWith({
            ...bankAccount.toJSON(),
            currency: 'USD',
            isForeign: true,
            isConfirmedByAffidavit: true
        })
        expect(multiple).toHaveLength(3)
    })

    it('handles foreign bank account with IBAN and SWIFT', () => {
        const foreignAccount = new BankAccount({
            id: 'bank-foreign',
            currency: 'EUR',
            isForeign: true,
            iban: 'DE89370400440532013000',
            swift: 'COBADEFFXXX',
            isConfirmedByAffidavit: true
        })
        const changes = foreignAccount.compareWith({
            ...foreignAccount.toJSON(),
            iban: 'GB82WEST12345698765432'
        })
        expect(changes).toEqual([{
            path: 'iban',
            originalValue: 'DE89370400440532013000',
            changedValue: 'GB82WEST12345698765432'
        }])
    })
})
