/* global describe, it */

const { ContactInformation, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const contactInformation = new ContactInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CONTACT]
)

describe('ContactInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = contactInformation.toPlainObject()
        test.assert.deepEqual(contactInformation, ContactInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(contactInformation.toPlainObject())
        test.assert.deepEqual(contactInformation, ContactInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new ContactInformation()
        test.assert.equal(null, empty.phoneNumber)
    })

    it('constructor vs create', () => {
        const fromCreate = ContactInformation.create(
            contactInformation.email,
            contactInformation.phoneNumber,
            contactInformation.phonePassword
        )
        test.assert.deepEqual(fromCreate, contactInformation)
    })
})
