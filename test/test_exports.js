/* global describe, it */

const test = require('unit.js')
const {
    Address,
    ContactInformation,
    ClientData,
    PersonalInformation,
    IdCardInformation,
    ClientInformation,
    AddressInformation,
    helpers,
    PLAIN_OBJECT_KEY_CLIENT,
    PLAIN_OBJECT_KEY_PERSONAL,
    PLAIN_OBJECT_KEY_ID_CARD,
    PLAIN_OBJECT_KEY_CONTACT,
    PLAIN_OBJECT_KEY_BANK_ACCOUNTS,
    PLAIN_OBJECT_KEY_ADDRESS,
    ADDRESS_TYPE_REGULAR,
    ADDRESS_TYPE_MAILING,
    CLIENT_TYPE_PERSON,
    CLIENT_TYPE_COMPANY,
    CLIENT_TYPE_SELFEMPLOYED,
    CLIENT_ORIGIN_INTERNAL,
    CLIENT_ORIGIN_CAPITOL,
    CLIENT_ORIGIN_CRM,
    CLIENT_ORIGIN_WEB,
    CLIENT_TYPES,
    CLIENT_ORIGINS
} = require('../dist/clientdatastructure.js')

describe('Default exports', () => {
    it('Address !== undefined', () => { test.assert.equal(true, (Address !== undefined)) })
    it('ContactInformation !== undefined', () => { test.assert.equal(true, (ContactInformation !== undefined)) })
    it('ClientData !== undefined', () => { test.assert.equal(true, (ClientData !== undefined)) })
    it('PersonalInformation !== undefined', () => { test.assert.equal(true, (PersonalInformation !== undefined)) })
    it('IdCardInformation !== undefined', () => { test.assert.equal(true, (IdCardInformation !== undefined)) })
    it('ClientInformation !== undefined', () => { test.assert.equal(true, (ClientInformation !== undefined)) })
    it('AddressInformation !== undefined', () => { test.assert.equal(true, (AddressInformation !== undefined)) })
    it('helpers !== undefined', () => { test.assert.equal(true, (helpers !== undefined)) })
    it('PLAIN_OBJECT_KEY_CLIENT !== undefined', () => { test.assert.equal(true, (PLAIN_OBJECT_KEY_CLIENT !== undefined)) })
    it('PLAIN_OBJECT_KEY_PERSONAL !== undefined', () => { test.assert.equal(true, (PLAIN_OBJECT_KEY_PERSONAL !== undefined)) })
    it('PLAIN_OBJECT_KEY_ID_CARD !== undefined', () => { test.assert.equal(true, (PLAIN_OBJECT_KEY_ID_CARD !== undefined)) })
    it('PLAIN_OBJECT_KEY_CONTACT !== undefined', () => { test.assert.equal(true, (PLAIN_OBJECT_KEY_CONTACT !== undefined)) })
    it('PLAIN_OBJECT_KEY_BANK_ACCOUNTS !== undefined', () => { test.assert.equal(true, (PLAIN_OBJECT_KEY_BANK_ACCOUNTS !== undefined)) })
    it('PLAIN_OBJECT_KEY_ADDRESS !== undefined', () => { test.assert.equal(true, (PLAIN_OBJECT_KEY_ADDRESS !== undefined)) })
    it('ADDRESS_TYPE_REGULAR !== undefined', () => { test.assert.equal(true, (ADDRESS_TYPE_REGULAR !== undefined)) })
    it('ADDRESS_TYPE_MAILING !== undefined', () => { test.assert.equal(true, (ADDRESS_TYPE_MAILING !== undefined)) })
    it('CLIENT_TYPE_PERSON !== undefined', () => { test.assert.equal(true, (CLIENT_TYPE_PERSON !== undefined)) })
    it('CLIENT_TYPE_COMPANY !== undefined', () => { test.assert.equal(true, (CLIENT_TYPE_COMPANY !== undefined)) })
    it('CLIENT_TYPE_SELFEMPLOYED !== undefined', () => { test.assert.equal(true, (CLIENT_TYPE_SELFEMPLOYED !== undefined)) })
    it('CLIENT_ORIGIN_INTERNAL !== undefined', () => { test.assert.equal(true, (CLIENT_ORIGIN_INTERNAL !== undefined)) })
    it('CLIENT_ORIGIN_CAPITOL !== undefined', () => { test.assert.equal(true, (CLIENT_ORIGIN_CAPITOL !== undefined)) })
    it('CLIENT_ORIGIN_CRM !== undefined', () => { test.assert.equal(true, (CLIENT_ORIGIN_CRM !== undefined)) })
    it('CLIENT_ORIGIN_WEB !== undefined', () => { test.assert.equal(true, (CLIENT_ORIGIN_WEB !== undefined)) })
    it('CLIENT_TYPES !== undefined', () => { test.assert.equal(true, (CLIENT_TYPES !== undefined)) })
    it('CLIENT_ORIGINS !== undefined', () => { test.assert.equal(true, (CLIENT_ORIGINS !== undefined)) })
})
