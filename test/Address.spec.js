const { Address, ClientData } = require('../dist/client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const addressValidations = require('./mock/addressValidations.js')

const { expectErrorsTestCases } = addressValidations

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_MAILING]
)

describe('Address', () => {
    it('regular address instance -> plain object -> instance', () => {
        const plainObject = regularAddress.toPlainObject()
        expect(regularAddress).toEqual(Address.fromPlainObject(plainObject))
    })

    it('constructor vs create', () => {
        const fromCreate = Address.create(
            regularAddress.recipient,
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
        expect(empty.recipient).toBeNull()
    })

    it('country code can be converted to correct country name', () => {
        expect(regularAddress.countryName).toBe('Česká republika')
    })

    it('fullAddress getter returns correct address', () => {
        const expectedAddress = `${regularAddress.recipient}, ${regularAddress.street} ${regularAddress.streetNumber}, ${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`
        expect(regularAddress.fullAddress).toBe(expectedAddress)
    })

    it('fullAddress getter returns correct address with missing parts', () => {
        const expectedAddress = `${regularAddress.recipient}, ${regularAddress.city}, ${regularAddress.countryName}, ${regularAddress.postalCode}`
        expect((Address.create(
            regularAddress.recipient,
            null,
            null,
            regularAddress.city,
            regularAddress.country,
            regularAddress.postalCode
        )).fullAddress).toBe(expectedAddress)
    })
})

describe('Address validations', () => {
    it('Expect valid address', () => {
        const validAddress = new Address({
            recipient: 'První firma a.s.',
            street: 'Příčná',
            streetNumber: '554/6a',
            city: 'Brno',
            postalCode: '66609',
            country: 'CZE'
        })
        expect(validAddress.validate()).toBe(true)
    })

    it('Expect address validation throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const invalidAddress = new Address(testCase.data)
            try {
                invalidAddress.validate()
            } catch (error) {
                expect(error.message).toContain(testCase.expected)
            }
        }
    })
})
