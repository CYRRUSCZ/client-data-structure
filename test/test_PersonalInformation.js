/* global describe, it */

const { PersonalInformation } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const personal = new PersonalInformation(
    clientDataset[PersonalInformation.PLAIN_OBJECT_KEY]
)

describe('PersonalInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plainObject = personal.toPlainObject()
        test.assert.deepEqual(personal, PersonalInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(personal.toPlainObject())
        test.assert.deepEqual(personal, PersonalInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new PersonalInformation()
        test.assert.equal(null, empty.firstName)
        test.assert.equal(true, (empty.dateOfBirth instanceof Date))
    })
})