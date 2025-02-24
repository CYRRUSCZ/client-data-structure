const { BankAccount, ClientData } = require('../dist/client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const { expectErrorsTestCases, data } = require('./mock/bankAccountValidations.js')

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
        expect(bankingInformation).toEqual((JSON.parse(string)).map((account) => BankAccount.fromPlainObject(account)))
    })

    it('id is substituted from _id', () => {
        expect(bankingInformation[0].id).toBe(clientDataset.bankAccounts[0].id)
        expect(bankingInformation[1].id).toBe(clientDataset.bankAccounts[1]._id)
    })

    it('foreign account is created', () => {
        expect(bankingInformation[2].bankNameAddress).toBe(clientDataset.bankAccounts[2].bankNameAddress)
    })
})

describe('BankAccount validations', () => {
    it('Expect valid BankAccount', () => {
        const bankAccount = new BankAccount(data[0])

        expect(bankAccount.validate()).toBe(true)
    })

    it('Expect valid foreign BankAccount', () => {
        const bankAccount = new BankAccount(
            data[1]
        )

        expect(bankAccount.validate()).toBe(true)
    })

    it('Expect BankAccount validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const bankAccount = new BankAccount(testCase.data)
            try {
                bankAccount.validate()
            } catch (error) {
                const errors = bankAccount.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })
})
