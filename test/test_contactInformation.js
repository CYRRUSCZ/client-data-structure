/* global describe, it */

const { ContactInformation } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const contactInformation = new ContactInformation(
    clientDataset[ContactInformation.PLAIN_OBJECT_KEY]
)

describe('ContactInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plainObject = contactInformation.toPlainObject()
        test.assert.deepEqual(contactInformation, ContactInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(contactInformation.toPlainObject())
        test.assert.deepEqual(contactInformation, ContactInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new ContactInformation()
        test.assert.equal(null, empty.phoneNumber)
    })
})