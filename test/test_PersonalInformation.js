/* global describe, it */

const { PersonalInformation, ClientData } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

const personal = new PersonalInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_PERSONAL]
)

describe('PersonalInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = personal.toPlainObject()
        test.assert.deepEqual(personal, PersonalInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(personal.toPlainObject())
        test.assert.deepEqual(personal, PersonalInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new PersonalInformation()
        test.assert.equal(null, empty.firstName)
        test.assert.equal(true, (empty.dateOfBirth instanceof Date))
    })

    it('constructor vs create', () => {
        const fromCreate = PersonalInformation.create(
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
            personal.citizenship,
            personal.gender
        )
        test.assert.deepEqual(fromCreate, personal)
    })

    it('country code can be converted to correct country name', () => {
        test.assert.equal(personal.birthNumberCountryName, 'Česká Republika')
        test.assert.equal(personal.citizenshipCountryName, 'Česká Republika')
        test.assert.equal(personal.taxDomicileCountryName, 'Česká Republika')
    })

    it('fullName should be same as prenominal + " " + firstNameName + " " + lastName + " " + postnominal', () => {
        test.assert.equal(personal.fullName, (personal.prenominal + ' ' + personal.firstName + ' ' + personal.lastName + ' ' + personal.postnominal))
    })

    it('fullName without lastName should be same as firstName', () => {
        const tmp = new PersonalInformation({
            firstName: personal.firstName,
            lastName: null
        })
        test.assert.equal(tmp.fullName, personal.firstName)
    })
})
