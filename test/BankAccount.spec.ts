import { BankAccount, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } from './mock/bankAccountValidations'

const bankingInformation = [...(new ClientData(
    clientDataset
).bankAccounts)]

describe('BankingInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plain = bankingInformation.map((account) => account.toPlainObject())
        expect(bankingInformation).toEqual([...plain].map((account) => BankAccount.fromPlainObject(account)))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
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
    it('Expect valid BankAccount', () => {
        for (const testCase of testCasesValidData) {
            const bankAccount = new BankAccount(testCase.data)
            expect(bankAccount.validate()).toBe(true)
        }
    })

    it('Expect BankAccount validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const bankAccount = new BankAccount(testCase.data)
            try {
                bankAccount.validate()
            } catch (error) {
                const errors = bankAccount.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect BankAccount validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const bankAccount = new BankAccount()
            try {
                bankAccount.validate(testCase.data)
            } catch (error) {
                const errors = bankAccount.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })
})
