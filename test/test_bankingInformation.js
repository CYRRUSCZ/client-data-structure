const BankingInformation = require('../lib/BankingInformation.js')
const test = require('unit.js');

const bankingInformation = new BankingInformation(
    'abc?',
    'this has weird structure',
    'ABV',
    'CZK',
    'GB98 MIDL 0700 9312 3456 78',
    'AAAA BB CC DDD',
    'What kind of data is supposed to be here?',
    'tučnej oučet'
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
        test.assert.equal(null, empty.iban )
        test.assert.equal(null, empty.swift )
    })
})