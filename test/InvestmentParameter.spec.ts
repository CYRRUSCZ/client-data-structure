import { InvestmentParameter } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } from './mock/investmentParameterValidations'

const { client } = clientDataset
const investmentParameter = new InvestmentParameter(client?.investmentParameters?.[0])

describe('InvestmentParameter', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = investmentParameter.toPlainObject()
        expect(investmentParameter).toEqual(InvestmentParameter.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(investmentParameter.toPlainObject())
        expect(investmentParameter).toEqual(InvestmentParameter.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new InvestmentParameter()
        expect(empty.version).toBeNull()
        expect(empty.uid).toBeNull()
        expect(empty.name).toBeNull()
        expect(empty.value).toBeNull()
    })

    it('defaults to boolean values', () => {
        const empty = new InvestmentParameter()
        expect(empty.isInvestmentCategory).toBe(false)
    })

    it('constructor vs create', () => {
        const fromCreate = InvestmentParameter.create(
            investmentParameter.version,
            investmentParameter.uid,
            investmentParameter.name,
            investmentParameter.addedAt,
            investmentParameter.value,
            investmentParameter.isInvestmentCategory
        )
        expect(fromCreate).toEqual(investmentParameter)
    })
})

describe('InvestmentParameter validations', () => {
    it('Expect valid PersonalInformation', () => {
        for (const testCase of testCasesValidData) {
            const investmentParameter = new InvestmentParameter(testCase.data)
            expect(investmentParameter.validate()).toBe(true)
        }
    })

    it('Expect InvestmentParameter validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const investmentParameter = new InvestmentParameter(testCase.data)
            try {
                investmentParameter.validate()
            } catch (error) {
                const errors = investmentParameter.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect InvestmentParameter validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const investmentParameter = new InvestmentParameter()
            try {
                investmentParameter.validate(testCase.data)
            } catch (error) {
                const errors = investmentParameter.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })
})
