import { PersonalInformation, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } from './mock/personalInformationValidations'

const personal = new PersonalInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_PERSONAL]
)

describe('PersonalInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = personal.toPlainObject()
        expect(personal).toEqual(PersonalInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(personal.toPlainObject())
        expect(personal).toEqual(PersonalInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new PersonalInformation()
        expect(empty.firstName).toBeNull()
        expect(empty.dateOfBirth instanceof Date).toBe(true)
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
        expect(fromCreate).toEqual(personal)
    })

    it('country code can be converted to correct country name', () => {
        expect(personal.birthNumberCountryName).toBe('Česká republika')
        expect(personal.citizenshipCountryName).toBe('Česká republika')
        expect(personal.taxDomicileCountryName).toBe('Česká republika')
    })

    it('fullName should be same as prenominal + " " + firstName + " " + lastName + " " + postnominal', () => {
        expect(personal.fullName).toBe(`${personal.prenominal} ${personal.firstName} ${personal.lastName} ${personal.postnominal}`)
    })

    it('fullName without lastName should be same as firstName', () => {
        const tmp = new PersonalInformation({
            firstName: personal.firstName,
            lastName: null
        })
        expect(tmp.fullName).toBe(personal.firstName)
    })

    it('should have same date in birthDate', () => {
        const tmp = new PersonalInformation({ dateOfBirth: new Date('2020-01-01T12:00:00.000Z') })
        expect(tmp.dateOfBirth?.toISOString()).toBe(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })
})

describe('PersonalInformation validations', () => {
    it('Expect valid PersonalInformation', () => {
        for (const testCase of testCasesValidData) {
            const personalInformation = new PersonalInformation(testCase.data)
            expect(personalInformation.validate()).toBe(true)
        }
    })

    it('Expect PersonalInformation validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const personalInformation = new PersonalInformation(testCase.data)
            try {
                personalInformation.validate()
            } catch (error) {
                const errors = personalInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect PersonalInformation validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const personalInformation = new PersonalInformation()
            try {
                personalInformation.validate(testCase.data)
            } catch (error) {
                const errors = personalInformation.getValidationErrors()
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
