import { IdCardInformation, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/idCardInformationValidations'

const idInformation = new IdCardInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ID_CARD]
)

describe('IdCardInformation', () => {
    it('serialization roundtrip', () => {
        expect(idInformation).toEqual(IdCardInformation.fromPlainObject(idInformation.toPlainObject()))
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

    it('country code converts to country name', () => {
        expect(idInformation.countryName).toBe('Česká republika')
    })
})

describe('IdCardInformation validations', () => {
    it.each(testCasesValidData)('validates correct ID card information data', (testCase) => {
        const idCardInformation = new IdCardInformation(testCase.data)
        expect(idCardInformation.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data', (testCase) => {
        const idCardInformation = new IdCardInformation(testCase.data)
        expect(() => idCardInformation.validate()).toThrow()
        const validationErrors = idCardInformation.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)

        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors.join('\n')).toBe(testCase.expected)
        }
    })

    it('validates POJO passed directly to validate()', () => {
        const idCardInformation = new IdCardInformation()
        const invalidData = {
            type: 'id',
            number: null,
            issuedBy: 'Prague'
        }
        expect(() => idCardInformation.validate(invalidData)).toThrow('/number must be string')
    })
})

describe('IdCardInformation.compareWith', () => {
    const idCard = new IdCardInformation({
        type: 'id',
        number: '123456789',
        issuedBy: 'Prague',
        validity: new Date('2030-01-01T12:00:00.000Z')
    })

    it('detects field changes', () => {
        const type = idCard.compareWith({ type: 'passport' })
        expect(type.find(d => d.path === 'type')).toEqual({
            path: 'type',
            originalValue: 'id',
            changedValue: 'passport'
        })

        const number = idCard.compareWith({ number: '987654321' })
        expect(number.find(d => d.path === 'number')).toEqual({
            path: 'number',
            originalValue: '123456789',
            changedValue: '987654321'
        })
    })

    it('detects date changes', () => {
        const newDate = new Date('2035-01-01T12:00:00.000Z')
        const changes = idCard.compareWith({ validity: newDate })
        const validityChange = changes.find(d => d.path === 'validity')
        expect(validityChange?.path).toBe('validity')
        expect(validityChange?.originalValue).toBeInstanceOf(Date)
        expect(validityChange?.changedValue).toBeInstanceOf(Date)
    })

    it('detects multiple field changes', () => {
        const changes = idCard.compareWith({
            type: 'passport',
            number: '999888777',
            issuedBy: 'Brno'
        }).filter(d => d.path !== 'validity') // Filter out date comparison
        expect(changes.length).toBeGreaterThanOrEqual(3)
    })
})
