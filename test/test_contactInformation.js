const ContactInformation = require('../dist/clientdatastructure').ContactInformation
const test = require('unit.js');

const contactInformation = new ContactInformation(
    'me@myself.i',
    '994 12 4980335'
)

describe('ContactInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plain = contactInformation.toPlainObject();
        test.assert.deepEqual(contactInformation, ContactInformation.fromPlainObject(plain))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(contactInformation.toPlainObject())
        test.assert.deepEqual(contactInformation,ContactInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new ContactInformation()
        test.assert.equal(null, empty.phoneNumber)
        test.assert.equal(null, empty.email)
    })
})