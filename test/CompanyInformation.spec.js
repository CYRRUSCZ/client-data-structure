const { CompanyInformation } = require('./client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } = require('./mock/companyInformationValidations.js')

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

describe('CompanyInformation validations', () => {
    it('Expect valid CompanyInformation', () => {
        for (const testCase of testCasesValidData) {
            const companyInformation = new CompanyInformation(testCase.data)
            expect(companyInformation.validate()).toBe(true)
        }
    })

    it('Expect CompanyInformation validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const companyInformation = new CompanyInformation(testCase.data)
            try {
                companyInformation.validate()
            } catch (error) {
                const errors = companyInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect CompanyInformation validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const companyInformation = new CompanyInformation()
            try {
                companyInformation.validate(testCase.data)
            } catch (error) {
                const errors = companyInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })
})
