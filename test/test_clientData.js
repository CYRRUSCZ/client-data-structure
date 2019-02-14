/* global describe, it */

const { ClientData, AddressInformation, BankingInformation, 
    ContactInformation, IdCardInformation, PersonalInformation, 
    ClientInformation } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const client = new ClientData(clientDataset)
const address = new AddressInformation(clientDataset[AddressInformation.PLAIN_OBJECT_KEY])
const bank = new BankingInformation(clientDataset[BankingInformation.PLAIN_OBJECT_KEY])
const contact = new ContactInformation(clientDataset[ContactInformation.PLAIN_OBJECT_KEY])
const idCard = new IdCardInformation(clientDataset[IdCardInformation.PLAIN_OBJECT_KEY])
const personal = new PersonalInformation(clientDataset[PersonalInformation.PLAIN_OBJECT_KEY])
const clientInfo = new ClientInformation(clientDataset[ClientInformation.PLAIN_OBJECT_KEY])

describe('ClientData', () => {
    it('instance -> plain object -> instance', () => {
        let plainObject = client.toPlainObject()
        test.assert.deepEqual(client, ClientData.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(client.toPlainObject())
        test.assert.deepEqual(client, ClientData.fromPlainObject(JSON.parse(string)))
    })

    it('all subclass instances are deep equal', () => {
        test.assert.deepEqual(client[AddressInformation.PLAIN_OBJECT_KEY], address)
        test.assert.deepEqual(client[BankingInformation.PLAIN_OBJECT_KEY], bank)
        test.assert.deepEqual(client[ContactInformation.PLAIN_OBJECT_KEY], contact)
        test.assert.deepEqual(client[IdCardInformation.PLAIN_OBJECT_KEY], idCard)
        test.assert.deepEqual(client[PersonalInformation.PLAIN_OBJECT_KEY], personal)
        test.assert.deepEqual(client[ClientInformation.PLAIN_OBJECT_KEY], clientInfo)
    })

    it('defaults to empty instances', () => {
        let empty = new ClientData()
        test.assert.deepEqual(empty[AddressInformation.PLAIN_OBJECT_KEY], new AddressInformation())
        test.assert.deepEqual(empty[BankingInformation.PLAIN_OBJECT_KEY], new BankingInformation())
        test.assert.deepEqual(empty[ContactInformation.PLAIN_OBJECT_KEY], new ContactInformation())
        test.assert.deepEqual(empty[IdCardInformation.PLAIN_OBJECT_KEY], new IdCardInformation())
        test.assert.deepEqual(empty[PersonalInformation.PLAIN_OBJECT_KEY], new PersonalInformation())
        test.assert.deepEqual(empty[ClientInformation.PLAIN_OBJECT_KEY], new ClientInformation())
    })
})