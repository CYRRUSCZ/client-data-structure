/* global describe, it */

const { IdCardInformation, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const idInformation = new IdCardInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ID_CARD]
)

describe('IdCardInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = idInformation.toPlainObject()
        test.assert.deepEqual(idInformation, IdCardInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(idInformation.toPlainObject())
        test.assert.deepEqual(idInformation, IdCardInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new IdCardInformation()
        test.assert.equal(null, empty.issuedBy)
        test.assert.equal(true, (empty.validity instanceof Date))
    })

    it('constructor vs create', () => {
        const fromCreate = IdCardInformation.create(
            idInformation.number,
            idInformation.issuedBy,
            idInformation.country,
            idInformation.validity,
            idInformation.type,
            idInformation.scanNotAllowed
        )
        test.assert.deepEqual(fromCreate, idInformation)
    })

    it('country code can be converted to correct country name', () => {
        test.assert.equal(idInformation.countryName, 'Česká republika')
    })
})
