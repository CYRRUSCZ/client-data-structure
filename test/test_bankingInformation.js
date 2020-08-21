/* global describe, it */

const { BankAccount, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const bankingInformation = [...(new ClientData(
    clientDataset
).bankAccounts)]

describe('BankingInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plain = bankingInformation.map((account) => account.toPlainObject())
        test.assert.deepEqual(bankingInformation, [...plain].map((account) => BankAccount.fromPlainObject(account)))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(bankingInformation)
        test.assert.deepEqual(bankingInformation, (JSON.parse(string)).map((account) => BankAccount.fromPlainObject(account)))
    })

    it('id is substituted from _id', () => {
        test.assert.equal(bankingInformation[0].id, clientDataset.bankAccounts[0].id)
        test.assert.equal(bankingInformation[1].id, clientDataset.bankAccounts[1]._id)
    })
})
