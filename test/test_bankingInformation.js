/* global describe, it */

const { BankingInformation } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const bankingInformation = new BankingInformation(
    clientDataset[BankingInformation.PLAIN_OBJECT_KEY]
)

describe('BankingInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plain = bankingInformation.toPlainObject()
        test.assert.deepEqual(bankingInformation, BankingInformation.fromPlainObject(plain))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(bankingInformation.toPlainObject())
        test.assert.deepEqual(bankingInformation, BankingInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new BankingInformation()
        test.assert.equal(null, empty.iban)
        test.assert.equal(null, empty.swift)
    })
})