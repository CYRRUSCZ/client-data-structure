/* global describe, it */

const { ClientData, AddressInformation, BankingInformation, 
    ContactInformation, IdCardInformation, PersonalInformation, 
    ClientInformation } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const client = new ClientData(clientDataset)
const address = new AddressInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS])
const bank = new BankingInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_BANK_ACCOUNT])
const contact = new ContactInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_CONTACT])
const idCard = new IdCardInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ID_CARD])
const personal = new PersonalInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_PERSONAL])
const clientInfo = new ClientInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT])

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
        test.assert.deepEqual(client[ClientData.PLAIN_OBJECT_KEY_ADDRESS], address)
        test.assert.deepEqual(client[ClientData.PLAIN_OBJECT_KEY_BANK_ACCOUNT], bank)
        test.assert.deepEqual(client[ClientData.PLAIN_OBJECT_KEY_CONTACT], contact)
        test.assert.deepEqual(client[ClientData.PLAIN_OBJECT_KEY_ID_CARD], idCard)
        test.assert.deepEqual(client[ClientData.PLAIN_OBJECT_KEY_PERSONAL], personal)
        test.assert.deepEqual(client[ClientData.PLAIN_OBJECT_KEY_CLIENT], clientInfo)
    })

    it('defaults to empty instances', () => {
        let empty = new ClientData()
        test.assert.deepEqual(empty[ClientData.PLAIN_OBJECT_KEY_ADDRESS], new AddressInformation())
        test.assert.deepEqual(empty[ClientData.PLAIN_OBJECT_KEY_BANK_ACCOUNT], new BankingInformation())
        test.assert.deepEqual(empty[ClientData.PLAIN_OBJECT_KEY_CONTACT], new ContactInformation())
        test.assert.deepEqual(empty[ClientData.PLAIN_OBJECT_KEY_ID_CARD], new IdCardInformation())
        test.assert.deepEqual(empty[ClientData.PLAIN_OBJECT_KEY_PERSONAL], new PersonalInformation())
        test.assert.deepEqual(empty[ClientData.PLAIN_OBJECT_KEY_CLIENT], new ClientInformation())
    })

    it('constructor vs create', () => {
        let fromCreate = ClientData.create(
            client.client,
            client.personal,
            client.idCard,
            client.address,
            client.contact,
            client.bankAccount
        )
        test.assert.deepEqual(fromCreate, client)
    })

    it('regullar address override', () => {
        let fromCreate = ClientData.create(
            client.client,
            client.personal,
            client.idCard,
            client.address,
            client.contact,
            client.bankAccount,
            client.address.mailingAddress
        )
        test.assert.deepEqual(fromCreate.address.address, client.address.mailingAddress)
    })

    it('regullar address override undefined address information', () => {
        let fromCreate = ClientData.create(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            client.address.mailingAddress
        )
        test.assert.deepEqual(fromCreate.address.address, client.address.mailingAddress)
    })
})