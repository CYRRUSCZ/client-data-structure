/* global describe, it */
const { CompanyInformation } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')
const companyInformation = new CompanyInformation(clientDataset.company)

describe('CompanyInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plainObject = companyInformation.toPlainObject()
        test.assert.deepEqual(companyInformation, CompanyInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(companyInformation.toPlainObject())
        test.assert.deepEqual(companyInformation, CompanyInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new CompanyInformation()
        test.assert.equal(null, empty.dic)
    })

    it('constructor vs create', () => {
        let fromCreate = CompanyInformation.create(
          companyInformation.ic,
          companyInformation.dic,
          companyInformation.lei,
          companyInformation.representatives,
          companyInformation.taxDomicile,
          companyInformation.name
        )
        test.assert.deepEqual(fromCreate, companyInformation)
    })

    it('has correct fields', () => {
        let plain = companyInformation.toPlainObject()
        test.assert(plain.hasOwnProperty('ic'))
        test.assert(plain.hasOwnProperty('dic'))
        test.assert(plain.hasOwnProperty('lei'))
        test.assert(plain.hasOwnProperty('representatives'))
        test.assert(plain.hasOwnProperty('taxDomicile'))
        test.assert(plain.representatives[0].hasOwnProperty('personal'))
        test.assert(plain.representatives[0].personal.hasOwnProperty('lastName'))
        test.assert(plain.hasOwnProperty('name'))
    })
})