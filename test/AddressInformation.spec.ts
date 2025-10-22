import {  Address, AddressInformation, ClientData  } from '../src/index'
import clientDataset from './mock/clientDataset'
import {  expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData  } from './mock/addressInformationValidations'

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS]?.[ClientData.ADDRESS_TYPE_MAILING]
)

const address = new AddressInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS])

describe('AddressInformation', () => {
    it('address information -> plain object -> instance', () => {
        const plainObject = address.toPlainObject()
        expect(address).toEqual(AddressInformation.fromPlainObject(plainObject))
    })

    it('address information -> JSON.stringify -> JSON.parse -> instance', () => {
        const plainObject = JSON.parse(JSON.stringify(regularAddress))
        expect(regularAddress).toEqual(Address.fromPlainObject(plainObject))
    })

    it('regular address instance is same as AddressInformation.address', () => {
        expect(address[ClientData.ADDRESS_TYPE_REGULAR]).toEqual(regularAddress)
    })

    it('mailing address instance is same as AddressInformation.address', () => {
        expect(address[ClientData.ADDRESS_TYPE_MAILING]).toEqual(mailingAddress)
    })

    it('defaults to null and empty values', () => {
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
        expect(fromCreate.toJSON()).toEqual(address.toJSON())
    })

    it('useMailingAddress is correctly translated in JSON', () => {
        const withMailingAddress = new AddressInformation({ ...address.toJSON(), useMailingAddress: true })
        expect(withMailingAddress.toJSON().useMailingAddress).toBe(true)

        const withoutMailingAddress = new AddressInformation({ ...address.toJSON(), useMailingAddress: false })
        expect(withoutMailingAddress.toJSON().useMailingAddress).toBe(false)
        let fromCreate = AddressInformation.create(
            address.address,
            address.mailingAddress,
            true
        )
        expect(fromCreate.toJSON().useMailingAddress).toBe(true)
        fromCreate = AddressInformation.create(
            address.address,
            address.mailingAddress,
            false
        )
        expect(fromCreate.toJSON().useMailingAddress).toBe(false)
    })
})

describe('Address information validations', () => {
    it('Expect valid Address', () => {
        for (const testCase of testCasesValidData) {
            const addressInformation = new AddressInformation(testCase.data)
            expect(addressInformation.validate()).toBe(true)
        }
    })

    it('Expect address validation throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const addressInformation = new AddressInformation(testCase.data)
            try {
                addressInformation.validate()
            } catch (error) {
                const errors = addressInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
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
            const addressInformation = new AddressInformation()
            try {
                addressInformation.validate(testCase.data)
            } catch (error) {
                const errors = addressInformation.getValidationErrors()
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
