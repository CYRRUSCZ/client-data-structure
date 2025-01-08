const { CompanyInformation } = require('../dist/client-data-structure.cjs.js')
const clientDataset = require('./mock/clientDataset.js')

const companyInformation = new CompanyInformation(clientDataset.company)

describe('CompanyInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = companyInformation.toPlainObject()
        expect(companyInformation).toEqual(CompanyInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(companyInformation.toPlainObject())
        expect(companyInformation).toEqual(CompanyInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new CompanyInformation()
        expect(empty.dic).toBeNull()
    })

    it('constructor vs create', () => {
        const fromCreate = CompanyInformation.create(
            companyInformation.ic,
            companyInformation.dic,
            companyInformation.lei,
            companyInformation.taxDomicile,
            companyInformation.representatives,
            companyInformation.name
        )
        expect(fromCreate).toEqual(companyInformation)
    })

    it('has correct fields', () => {
        const plain = companyInformation.toPlainObject()
        expect(plain).toHaveProperty('ic')
        expect(plain).toHaveProperty('dic')
        expect(plain).toHaveProperty('lei')
        expect(plain).toHaveProperty('representatives')
        expect(plain).toHaveProperty('taxDomicile')
        expect(plain.representatives[0]).toHaveProperty('personal')
        expect(plain.representatives[0].personal).toHaveProperty('lastName')
        expect(plain).toHaveProperty('name')
    })
})
