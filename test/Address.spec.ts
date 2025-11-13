import { Address, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/addressValidations'

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_MAILING]
)

describe('Address', () => {
    it.each([
        ['regular', regularAddress],
        ['mailing', mailingAddress]
    ])('%s address serialization roundtrip', (_label, address) => {
        // Test both toPlainObject and JSON.stringify paths
        expect(address).toEqual(Address.fromPlainObject(address.toPlainObject()))
        expect(address).toEqual(Address.fromPlainObject(JSON.parse(JSON.stringify(address))))
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

    it('defaults to null values', () => {
        const empty = new Address()
        expect(empty.city).toBeNull()
        expect(empty.cytronId).toBeNull()
        expect(empty.street).toBeNull()
        expect(empty.postalCode).toBeNull()
    })

    it('country code converts to country name', () => {
        expect(regularAddress.countryName).toBe('Česká republika')
    })

    it('fullAddress getter formats address correctly', () => {
        const expected = `${regularAddress.street} ${regularAddress.streetNumber}, ${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`
        expect(regularAddress.fullAddress).toBe(expected)
    })

    it('fullAddress getter handles missing parts', () => {
        const partial = Address.create(null, null, null, regularAddress.city, regularAddress.country, regularAddress.postalCode)
        expect(partial.fullAddress).toBe(`${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`)
    })
})

describe('Address validations', () => {
    it.each(testCasesValidData)('validates correct address data', (testCase) => {
        const address = new Address(testCase.data)
        expect(address.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data: $expected', (testCase) => {
        const address = new Address(testCase.data)
        expect(() => address.validate()).toThrow()
        const validationErrors = address.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)
        expect(validationErrors.join('\n')).toBe(testCase.expected)
    })

    it('validates POJO passed directly to validate()', () => {
        const address = new Address()
        const invalidData = {
            cytronId: null,
            street: null,
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        }
        expect(() => address.validate(invalidData)).toThrow('/street must be string')
    })
})

describe('Address.compareWith', () => {
    const address = new Address({
        cytronId: 'addr-123',
        street: 'Main Street',
        streetNumber: '42',
        city: 'Prague',
        country: 'CZE',
        postalCode: '12000'
    })

    it('returns empty array for identical addresses', () => {
        expect(address.compareWith(address.toJSON())).toEqual([])
    })

    it('detects field changes', () => {
        const single = address.compareWith({ ...address.toJSON(), city: 'Brno' })
        expect(single).toEqual([{ path: 'city', originalValue: 'Prague', changedValue: 'Brno' }])

        const multiple = address.compareWith({ city: 'Brno', postalCode: '60000', streetNumber: '100' })
        expect(multiple).toHaveLength(3)
        expect(multiple).toContainEqual({ path: 'city', originalValue: 'Prague', changedValue: 'Brno' })
        expect(multiple).toContainEqual({ path: 'postalCode', originalValue: '12000', changedValue: '60000' })
        expect(multiple).toContainEqual({ path: 'streetNumber', originalValue: '42', changedValue: '100' })
    })

    it('handles null and undefined correctly', () => {
        const withNull = new Address({ ...address.toJSON(), cytronId: null })
        const nullChange = withNull.compareWith({ cytronId: 'new-id' })
        expect(nullChange).toEqual([{ path: 'cytronId', originalValue: null, changedValue: 'new-id' }])

        const ignoresUndefined = address.compareWith({ city: 'Brno', streetNumber: undefined })
        expect(ignoresUndefined).toHaveLength(1)
        expect(ignoresUndefined[0].path).toBe('city')
    })
})
