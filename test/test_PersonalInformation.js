/* global describe, it */

const { PersonalInformation, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const personal = new PersonalInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_PERSONAL]
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

    it('constructor vs create', () => {
        let fromCreate = PersonalInformation.create(
            personal.prenominal,
            personal.firstName,
            personal.lastName,
            personal.postnominal,
            personal.birthNumber,
            personal.dateOfBirth,
            personal.noBirthNumber,
            personal.birthNumberCountry,
            personal.taxDomicile,
            personal.placeOfBirth,
            personal.citizenship
        )
        test.assert.deepEqual(fromCreate, personal)
    })

    it('country code can be converted to correct country name', () => {
        test.assert.equal(personal.birthNumberCountryName, 'Česko')
        test.assert.equal(personal.citizenshipCountryName, 'Česko')
        test.assert.equal(personal.taxDomicileCountryName, 'Česko')
    })

    it('fullName should be same as lastName + " " + firstName', () => {
        test.assert.equal(personal.fullName, (personal.lastName + ' ' + personal.firstName))
    })

    it('fullName without lastName should be same as firstName', () => {
        let tmp = new PersonalInformation({
            firstName: personal.firstName, 
            lastName: null
        })
        test.assert.equal(tmp.fullName, personal.firstName)
    })
})