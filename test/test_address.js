/* global describe, it */
const { Address, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_MAILING]
)

describe('Address', () => {
    it('regular address instance -> plain object -> instance', () => {
        let plainObject = regularAddress.toPlainObject()
        test.assert.deepEqual(regularAddress, Address.fromPlainObject(plainObject))
    })

    it('regular address instance -> JSON.stringify -> JSON.parse -> instance', () => {
        let plainObject = JSON.parse(JSON.stringify(regularAddress))
        test.assert.deepEqual(regularAddress, Address.fromPlainObject(plainObject))
    })

    it('mailing address instance -> plain object -> instance', () => {
        let plainObject = mailingAddress.toPlainObject()
        test.assert.deepEqual(mailingAddress, Address.fromPlainObject(plainObject))
    })

    it('mailing address instance -> JSON.stringify -> JSON.parse -> instance', () => {
        let plainObject = JSON.parse(JSON.stringify(mailingAddress))
        test.assert.deepEqual(mailingAddress, Address.fromPlainObject(plainObject))
    })

    it('defaults to null values', () => {
        let empty = new Address()
        test.assert.equal(null, empty.city)
        test.assert.equal(null, empty.recipient)
    })
})