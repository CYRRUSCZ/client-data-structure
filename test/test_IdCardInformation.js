/* global describe, it */

const { IdCardInformation } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const idInformation = new IdCardInformation(
    clientDataset[IdCardInformation.PLAIN_OBJECT_KEY]
)

describe('IdCardInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plainObject = idInformation.toPlainObject()
        test.assert.deepEqual(idInformation, IdCardInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(idInformation.toPlainObject())
        test.assert.deepEqual(idInformation, IdCardInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new IdCardInformation()
        test.assert.equal(null, empty.issuedBy)
        test.assert.equal(true, (empty.validity instanceof Date))
    })
})