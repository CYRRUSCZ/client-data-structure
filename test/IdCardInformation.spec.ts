import {  IdCardInformation, ClientData  } from '../src/index'
import clientDataset from './mock/clientDataset'
import {  expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData  } from './mock/idCardInformationValidations'

const idInformation = new IdCardInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ID_CARD]
)

describe('IdCardInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = idInformation.toPlainObject()
        expect(idInformation).toEqual(IdCardInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(idInformation.toPlainObject())
        expect(idInformation).toEqual(IdCardInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new IdCardInformation()
        expect(empty.issuedBy).toBeNull()
        expect(empty.validity instanceof Date).toBe(true)
    })

    it('constructor vs create', () => {
        const fromCreate = IdCardInformation.create(
            idInformation.number,
            idInformation.issuedBy,
            idInformation.country,
            idInformation.validity,
            idInformation.type,
            idInformation.scanNotAllowed
        )
        expect(fromCreate).toEqual(idInformation)
    })

    it('country code can be converted to correct country name', () => {
        expect(idInformation.countryName).toBe('Česká republika')
    })
})

describe('IdCardInformation validations', () => {
    it('Expect valid IdCardInformation', () => {
        for (const testCase of testCasesValidData) {
            const idCardInformation = new IdCardInformation(testCase.data)
            expect(idCardInformation.validate()).toBe(true)
        }
    })

    it('Expect IdCardInformation validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const idCardInformation = new IdCardInformation(testCase.data)
            try {
                idCardInformation.validate()
            } catch (error) {
                const errors = idCardInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect IdCardInformation validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const idCardInformation = new IdCardInformation()
            try {
                idCardInformation.validate(testCase.data)
            } catch (error) {
                const errors = idCardInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })
})
