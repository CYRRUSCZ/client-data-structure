/* global describe, it */
const { Address, AddressInformation, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_MAILING]
)

const address = new AddressInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS])

describe('Address', () => {
    it('address information -> plain object -> instance', () => {
        let plainObject = address.toPlainObject()
        test.assert.deepEqual(address, AddressInformation.fromPlainObject(plainObject))
    })

    it('address information -> JSON.stringify -> JSON.parse -> instance', () => {
        let plainObject = JSON.parse(JSON.stringify(regularAddress))
        test.assert.deepEqual(regularAddress, Address.fromPlainObject(plainObject))
    })

    it('regular address instance is same as AddressInformation.address', () => {
        test.assert.deepEqual(address[ClientData.ADDRESS_TYPE_REGULAR], regularAddress)
    })

    it('mailing address instance is same as AddressInformation.address', () => {
        test.assert.deepEqual(address[ClientData.ADDRESS_TYPE_MAILING], mailingAddress)
    })

    it('defaults to null and empty values', () => {
        let empty = new AddressInformation()
        test.assert.equal(false, empty.useMailingAddress)
        test.assert.deepEqual(new Address(), empty[ClientData.ADDRESS_TYPE_REGULAR])
        test.assert.deepEqual(new Address(), empty[ClientData.ADDRESS_TYPE_MAILING])
    })
})