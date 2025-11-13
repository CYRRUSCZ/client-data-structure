import { Address, AddressInformation, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/addressInformationValidations'

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_MAILING]
)

const address = new AddressInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS])

describe('AddressInformation', () => {
    it('serialization roundtrip', () => {
        expect(address).toEqual(AddressInformation.fromPlainObject(address.toPlainObject()))
        expect(address).toEqual(AddressInformation.fromPlainObject(JSON.parse(JSON.stringify(address))))
    })

    it('contains correct address instances', () => {
        expect(address[ClientData.ADDRESS_TYPE_REGULAR]).toEqual(regularAddress)
        expect(address[ClientData.ADDRESS_TYPE_MAILING]).toEqual(mailingAddress)
    })

    it('defaults to empty values', () => {
        const empty = new AddressInformation()
        expect(empty.useMailingAddress).toBe(false)
        expect(empty[ClientData.ADDRESS_TYPE_REGULAR]).toEqual(new Address())
        expect(empty[ClientData.ADDRESS_TYPE_MAILING]).toEqual(new Address())
    })

    it('constructor vs create', () => {
        const fromCreate = AddressInformation.create(
            address.address,
            address.mailingAddress,
            address.useMailingAddress
        )
        expect(fromCreate).toEqual(address)
    })

    it.each([
        [true, true],
        [false, false]
    ])('useMailingAddress=%s serializes correctly', (value, expected) => {
        const instance = AddressInformation.create(address.address, address.mailingAddress, value)
        expect(instance.toJSON().useMailingAddress).toBe(expected)
    })
})

describe('Address information validations', () => {
    it.each(testCasesValidData)('validates correct address information data', (testCase) => {
        const addressInformation = new AddressInformation(testCase.data)
        expect(addressInformation.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data', (testCase) => {
        const addressInformation = new AddressInformation(testCase.data)
        expect(() => addressInformation.validate()).toThrow()
        const validationErrors = addressInformation.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)

        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors.join('\n')).toBe(testCase.expected)
        }
    })

    it('validates POJO passed directly to validate()', () => {
        const addressInformation = new AddressInformation()
        const invalidData = {
            address: {
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: null
            },
            mailingAddress: {},
            useMailingAddress: false
        }
        expect(() => addressInformation.validate(invalidData)).toThrow('/address/country must be string')
    })
})

describe('AddressInformation.compareWith', () => {
    const addressInfo = new AddressInformation({
        useMailingAddress: false,
        address: {
            street: 'Main Street',
            streetNumber: '42',
            city: 'Prague',
            country: 'CZE',
            postalCode: '12000'
        },
        mailingAddress: {
            street: 'Second Street',
            streetNumber: '10',
            city: 'Brno',
            country: 'CZE',
            postalCode: '60000'
        }
    })

    it('returns empty array for identical address information', () => {
        expect(addressInfo.compareWith(addressInfo.toJSON())).toEqual([])
    })

    it('detects changes at different nesting levels', () => {
        const flagChange = addressInfo.compareWith({ ...addressInfo.toJSON(), useMailingAddress: true })
        expect(flagChange).toEqual([{ path: 'useMailingAddress', originalValue: false, changedValue: true }])

        const nestedAddress = addressInfo.compareWith({
            ...addressInfo.toJSON(),
            address: { ...addressInfo.toJSON().address, city: 'Ostrava' }
        })
        expect(nestedAddress).toEqual([{ path: 'address.city', originalValue: 'Prague', changedValue: 'Ostrava' }])

        const nestedMailing = addressInfo.compareWith({
            ...addressInfo.toJSON(),
            mailingAddress: { ...addressInfo.toJSON().mailingAddress, postalCode: '70000' }
        })
        expect(nestedMailing).toEqual([{ path: 'mailingAddress.postalCode', originalValue: '60000', changedValue: '70000' }])
    })

    it('detects multiple changes across all levels', () => {
        const changes = addressInfo.compareWith({
            useMailingAddress: true,
            address: { ...addressInfo.toJSON().address, city: 'Ostrava' },
            mailingAddress: { ...addressInfo.toJSON().mailingAddress, city: 'Plzen' }
        })
        expect(changes).toHaveLength(3)
        expect(changes).toContainEqual({ path: 'useMailingAddress', originalValue: false, changedValue: true })
        expect(changes).toContainEqual({ path: 'address.city', originalValue: 'Prague', changedValue: 'Ostrava' })
        expect(changes).toContainEqual({ path: 'mailingAddress.city', originalValue: 'Brno', changedValue: 'Plzen' })
    })
})
