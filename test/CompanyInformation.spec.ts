import { CompanyInformation } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/companyInformationValidations'

const companyInformation = new CompanyInformation(clientDataset.company)

describe('CompanyInformation', () => {
    it('serialization roundtrip', () => {
        expect(companyInformation).toEqual(CompanyInformation.fromPlainObject(companyInformation.toPlainObject()))
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

describe('CompanyInformation validations', () => {
    it.each(testCasesValidData)('validates correct company information data', (testCase) => {
        const companyInformation = new CompanyInformation(testCase.data)
        expect(companyInformation.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data', (testCase) => {
        const companyInformation = new CompanyInformation(testCase.data)
        expect(() => companyInformation.validate()).toThrow()
        const validationErrors = companyInformation.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)

        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors.join('\n')).toBe(testCase.expected)
        }
    })

    it('validates POJO passed directly to validate()', () => {
        const companyInformation = new CompanyInformation()
        const invalidData = {
            ic: null,
            name: 'Test Company'
        }
        expect(() => companyInformation.validate(invalidData)).toThrow()
    })
})

describe('CompanyInformation.compareWith', () => {
    const company = new CompanyInformation({
        ic: '12345678',
        dic: 'CZ12345678',
        lei: 'LEI123456789',
        name: 'ACME Corp',
        taxDomicile: 'CZE',
        representatives: []
    })

    it('returns empty array for identical company information', () => {
        expect(company.compareWith(company.toJSON())).toEqual([])
    })

    it('detects individual field changes', () => {
        const nameChange = company.compareWith({ ...company.toJSON(), name: 'ACME Industries' })
        expect(nameChange.find(d => d.path === 'name')).toEqual({
            path: 'name',
            originalValue: 'ACME Corp',
            changedValue: 'ACME Industries'
        })

        const icChange = company.compareWith({ ...company.toJSON(), ic: '87654321' })
        expect(icChange.find(d => d.path === 'ic')).toEqual({
            path: 'ic',
            originalValue: '12345678',
            changedValue: '87654321'
        })

        const dicChange = company.compareWith({ ...company.toJSON(), dic: 'CZ87654321' })
        expect(dicChange.find(d => d.path === 'dic')).toEqual({
            path: 'dic',
            originalValue: 'CZ12345678',
            changedValue: 'CZ87654321'
        })

        const leiChange = company.compareWith({ ...company.toJSON(), lei: 'LEI987654321' })
        expect(leiChange.find(d => d.path === 'lei')).toEqual({
            path: 'lei',
            originalValue: 'LEI123456789',
            changedValue: 'LEI987654321'
        })

        const taxChange = company.compareWith({ ...company.toJSON(), taxDomicile: 'SVK' })
        expect(taxChange.find(d => d.path === 'taxDomicile')).toEqual({
            path: 'taxDomicile',
            originalValue: 'CZE',
            changedValue: 'SVK'
        })
    })

    it('detects multiple field changes', () => {
        const changes = company.compareWith({
            ...company.toJSON(),
            name: 'New Company Name',
            ic: '99999999',
            dic: 'CZ99999999'
        })
        expect(changes.length).toBe(3)
        expect(changes.some(d => d.path === 'name' && d.changedValue === 'New Company Name')).toBe(true)
        expect(changes.some(d => d.path === 'ic' && d.changedValue === '99999999')).toBe(true)
        expect(changes.some(d => d.path === 'dic' && d.changedValue === 'CZ99999999')).toBe(true)
    })

    it('detects representative array changes', () => {
        const companyWithReps = new CompanyInformation({
            ic: '12345678',
            name: 'Test Company',
            representatives: []
        })

        // Test with empty to non-empty representatives array
        const withReps = companyWithReps.compareWith({
            ...companyWithReps.toJSON(),
            representatives: [companyInformation.toJSON().representatives[0]] // Use existing representative from mock
        })
        expect(withReps.length).toBeGreaterThan(0)
        expect(withReps.some(d => d.path.includes('representatives'))).toBe(true)
    })
})
