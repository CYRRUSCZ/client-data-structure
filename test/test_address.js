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

    it('constructor vs create', () => {
        let fromCreate = Address.create(
            regularAddress.recipient,
            regularAddress.street,
            regularAddress.streetNumber,
            regularAddress.city,
            regularAddress.country,
            regularAddress.postalCode
        )
        test.assert.deepEqual(fromCreate, regularAddress)
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

    it('country code can be converted to correct country name', () => {
        test.assert.equal(regularAddress.countryName, 'Česko')
    })

    it('fullAddress getter returns correct address', () => {
        let expectedAddress = `${regularAddress.recipient}, ${regularAddress.street} ${regularAddress.streetNumber}, ${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`
        test.assert.equal(regularAddress.fullAddress, expectedAddress)
    })

    it('fullAddress getter returns correct address with missing parts', () => {
        let expectedAddress = `${regularAddress.recipient}, ${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`
        test.assert.equal((Address.create(
            regularAddress.recipient,
            null,
            null,
            regularAddress.city,
            regularAddress.country,
            regularAddress.postalCode
        )).fullAddress, expectedAddress)
    })
})