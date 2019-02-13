const ClientData = require('../dist/clientdatastructure').ClientData
const Address = require('../dist/clientdatastructure').Address
const ContactInformation = require('../dist/clientdatastructure').ContactInformation
const BankingInformation = require('../dist/clientdatastructure').BankingInformation
const test = require('unit.js');

let clientData = new ClientData(
    'Sherlock',
    'Black',
    'phd.',
    '123456789',
    new Date(Date.parse('November 30, 1874')),
    new Address(
        null,
        'Baker Street',
        '221B',
        'London',
        'United Kingdom',
        'NW1 6XE'
    ),
    new Address(
        null,
        'Grimmauld Place',
        '12',
        'London',
        'United Kingdom',
        'NW1 6XE'
    ),
    new ContactInformation(
        'ChunkyLover53@aol.com',
        '206-709-3100'
    ),
    new BankingInformation(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    )
)

describe('ClientData', () => {
    it('serializes', () => {
        let plain = require('./mock/clientDataPlainObject.js')
        let serialized = clientData.toPlainObject()
        test.assert.deepEqual(plain, serialized)
    })

    it('instance -> plain object -> instance', () => {
        let plain = clientData.toPlainObject()
        let deserialized = ClientData.fromPlainObject(plain);

        test.assert.deepEqual(clientData, deserialized)
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance ', () => {
        let string = JSON.stringify(clientData.toPlainObject())
        let deserialized = ClientData.fromPlainObject(JSON.parse(string));

        test.assert.deepEqual(clientData, deserialized)
    })

    it('defaults to null values', () => {
        let empty = new ClientData();
        test.assert.equal(empty.firstName, null)
        test.assert.equal(empty.lastName, null)
    })

    it('empty instance -> plain object -> JSON.stringify -> JSON.parse -> empty instance', () => {
        let string = JSON.stringify(new ClientData().toPlainObject())
        let deserialized = ClientData.fromPlainObject(JSON.parse(string))

        test.assert.deepEqual(new ClientData(), deserialized)
    })
})