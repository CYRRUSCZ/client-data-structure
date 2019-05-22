/* global describe, it */

const { ClientInformation, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const clientInformation = new ClientInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT]
)

describe('ClientInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plainObject = clientInformation.toPlainObject()
        test.assert.deepEqual(clientInformation, ClientInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(clientInformation.toPlainObject())
        test.assert.deepEqual(clientInformation, ClientInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new ClientInformation()
        test.assert.equal(null, empty.dataOriginId)
    })

    it('constructor vs create', () => {
        let fromCreate = ClientInformation.create(
            clientInformation.type,
            clientInformation.dataOrigin,
            clientInformation.dataOriginId,
            clientInformation.capitolId,
            clientInformation.crmId

        )
        test.assert.deepEqual(fromCreate, clientInformation)
    })
})