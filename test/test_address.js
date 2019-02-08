const Address = require('../lib/Address.js')
const test = require('unit.js');

const address = new Address(
    null,
    'Grimmauld Place',
    '12',
    'London',
    'United Kingdom',
    'NW1 6XE'
);

describe('Address', () => {
    it('instance -> plain object -> instance', () => {
        let plain = address.toPlainObject();
        test.assert.deepEqual(address, Address.fromPlainObject(plain))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(address.toPlainObject())
        test.assert.deepEqual(address, Address.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new Address();
        test.assert.equal(null, empty.city)
        test.assert.equal(null, empty.recipient)
    })
})