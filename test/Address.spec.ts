import { Address, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } from './mock/addressValidations'

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_MAILING]
)

describe('Address', () => {
    it('regular address instance -> plain object -> instance', () => {
        const plainObject = regularAddress.toPlainObject()
        expect(regularAddress).toEqual(Address.fromPlainObject(plainObject))
    })

    it('constructor vs create', () => {
        const fromCreate = Address.create(
            regularAddress.cytronId,
            regularAddress.street,
            regularAddress.streetNumber,
            regularAddress.city,
            regularAddress.country,
            regularAddress.postalCode
        )
        expect(fromCreate).toEqual(regularAddress)
    })

    it('regular address instance -> JSON.stringify -> JSON.parse -> instance', () => {
        const plainObject = JSON.parse(JSON.stringify(regularAddress))
        expect(regularAddress).toEqual(Address.fromPlainObject(plainObject))
    })

    it('mailing address instance -> plain object -> instance', () => {
        const plainObject = mailingAddress.toPlainObject()
        expect(mailingAddress).toEqual(Address.fromPlainObject(plainObject))
    })

    it('mailing address instance -> JSON.stringify -> JSON.parse -> instance', () => {
        const plainObject = JSON.parse(JSON.stringify(mailingAddress))
        expect(mailingAddress).toEqual(Address.fromPlainObject(plainObject))
    })

    it('defaults to null values', () => {
        const empty = new Address()
        expect(empty.city).toBeNull()
        expect(empty.cytronId).toBeNull()
        expect(empty.street).toBeNull()
        expect(empty.postalCode).toBeNull()
    })

    it('country code can be converted to correct country name', () => {
        expect(regularAddress.countryName).toBe('Česká republika')
    })

    it('fullAddress getter returns correct address', () => {
        const expectedAddress = `${regularAddress.street} ${regularAddress.streetNumber}, ${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`
        expect(regularAddress.fullAddress).toBe(expectedAddress)
    })

    it('fullAddress getter returns correct address with missing parts', () => {
        const expectedAddress = `${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`
        expect((Address.create(
            regularAddress.cytronId,
            null,
            null,
            regularAddress.city,
            regularAddress.country,
            regularAddress.postalCode
        )).fullAddress).toBe(expectedAddress)
    })
})

describe('Address validations', () => {
    it('Expect valid Address', () => {
        for (const testCase of testCasesValidData) {
            const address = new Address(testCase.data)
            expect(address.validate()).toBe(true)
        }
    })

    it('Expect address validation throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const address = new Address(testCase.data)
            try {
                address.validate()
            } catch (error) {
                const errors = address.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect address validation throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const address = new Address()
            try {
                address.validate(testCase.data)
            } catch (error) {
                const errors = address.getValidationErrors()
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
