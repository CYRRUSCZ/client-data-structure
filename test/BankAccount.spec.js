const { BankAccount, ClientData } = require('../dist/client-data-structure.cjs.js')
const clientDataset = require('./mock/clientDataset.js')

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
