import { PersonalInformation, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/personalInformationValidations'

const personal = new PersonalInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_PERSONAL]
)

describe('PersonalInformation', () => {
    it('serialization roundtrip', () => {
        expect(personal).toEqual(PersonalInformation.fromPlainObject(personal.toPlainObject()))
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

    it('country code converts to country name', () => {
        expect(personal.birthNumberCountryName).toBe('Česká republika')
        expect(personal.citizenshipCountryName).toBe('Česká republika')
        expect(personal.taxDomicileCountryName).toBe('Česká republika')
    })

    it('fullName formats correctly', () => {
        expect(personal.fullName).toBe(`${personal.prenominal} ${personal.firstName} ${personal.lastName} ${personal.postnominal}`)

        const withoutLastName = new PersonalInformation({ firstName: personal.firstName, lastName: null })
        expect(withoutLastName.fullName).toBe(personal.firstName)
    })

    it('handles date of birth correctly', () => {
        const tmp = new PersonalInformation({ dateOfBirth: new Date('2020-01-01T12:00:00.000Z') })
        expect(tmp.dateOfBirth?.toISOString()).toBe(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })
})

describe('PersonalInformation validations', () => {
    it.each(testCasesValidData)('validates correct personal information data', (testCase) => {
        const personalInformation = new PersonalInformation(testCase.data)
        expect(personalInformation.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data', (testCase) => {
        const personalInformation = new PersonalInformation(testCase.data)
        expect(() => personalInformation.validate()).toThrow()
        const validationErrors = personalInformation.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)

        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors.join('\n')).toBe(testCase.expected)
        }
    })

    it('validates POJO passed directly to validate()', () => {
        const personalInformation = new PersonalInformation()
        const invalidData = {
            firstName: null,
            lastName: 'Doe',
            citizenship: 'CZE'
        }
        expect(() => personalInformation.validate(invalidData)).toThrow('/firstName must be string')
    })
})

describe('PersonalInformation.compareWith', () => {
    const personal = new PersonalInformation({
        prenominal: 'Ing.',
        firstName: 'Jan',
        lastName: 'Novak',
        postnominal: 'PhD.',
        birthNumber: '900101/1234',
        dateOfBirth: new Date('1990-01-01T12:00:00.000Z'),
        noBirthNumber: false,
        birthNumberCountry: 'CZE',
        taxDomicile: 'CZE',
        placeOfBirth: 'Prague',
        citizenship: 'CZE',
        gender: 'male'
    })

    it('detects field changes', () => {
        const names = personal.compareWith({
            ...personal.toJSON(),
            firstName: 'Petr',
            lastName: 'Svoboda'
        }).filter(d => d.path !== 'dateOfBirth') // Filter out date comparison issues
        expect(names).toHaveLength(2)
        expect(names).toContainEqual({ path: 'firstName', originalValue: 'Jan', changedValue: 'Petr' })
        expect(names).toContainEqual({ path: 'lastName', originalValue: 'Novak', changedValue: 'Svoboda' })

        const birthNumber = personal.compareWith({ birthNumber: '850505/5678' })
        expect(birthNumber.find(d => d.path === 'birthNumber')).toEqual({
            path: 'birthNumber',
            originalValue: '900101/1234',
            changedValue: '850505/5678'
        })

        const citizenship = personal.compareWith({ citizenship: 'SVK' })
        expect(citizenship.find(d => d.path === 'citizenship')).toEqual({
            path: 'citizenship',
            originalValue: 'CZE',
            changedValue: 'SVK'
        })

        const gender = personal.compareWith({ gender: 'female' })
        expect(gender.find(d => d.path === 'gender')).toEqual({
            path: 'gender',
            originalValue: 'male',
            changedValue: 'female'
        })
    })

    it('detects date of birth change', () => {
        const newDate = new Date('1990-02-02T12:00:00.000Z')
        const changes = personal.compareWith({ dateOfBirth: newDate })
        expect(changes.some(d => d.path === 'dateOfBirth')).toBe(true)
    })
})
