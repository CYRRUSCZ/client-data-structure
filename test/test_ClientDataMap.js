/* global describe, it */

const { ClientData, ClientDataMap } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')
const client = new ClientData(clientDataset)
const map = new ClientDataMap()

describe('ClientDataMap',() => {
    it('Returns mapped data entry', () => {
        let email = map.getMappedEntry('email', client)
        test.assert.equal(client.email, email)
    })

    it('Returns nested mapped data entry', () => {
        let prefix = map.getMappedEntry('bankAccountPrefix', client)
        test.assert.equal(client.bankAccount.prefix, prefix)
    })

    it('throws an error when non existent entry is requested', () => {
        test.assert.throws(function() {
            let prefix = map.getMappedEntry('blah blah blah', client)
        }, Error)
    })
})