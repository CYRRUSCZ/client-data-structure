const { Address, AddressInformation, ClientData } = require('../dist/client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const { expectErrorsTestCases, testCases } = require('./mock/addressInformationValidations.js')

const regularAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_REGULAR]
)

const mailingAddress = new Address(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS][ClientData.ADDRESS_TYPE_MAILING]
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
    it('Expect valid address information', () => {
        const validAddress = new AddressInformation({
            address: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            mailingAddress: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            useMailingAddress: true
        })
        expect(validAddress.validate()).toBe(true)
    })

    it('Expect address information validation throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const address = new Address(testCase.data.address)
            const mailingAddress = new Address(testCase.data.mailingAddress)
            const addressInformation = new AddressInformation({
                address,
                mailingAddress,
                useMailingAddress: testCase.data.useMailingAddress
            })
            try {
                addressInformation.validate()
            } catch (error) {
                const errors = addressInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect address information validation ignores mailingAddress when useMailingAddress is false', () => {
        for (const testCase of testCases) {
            const address = new Address(testCase.data.address)
            const mailingAddress = new Address(testCase.data.mailingAddress)
            const addressInformation = new AddressInformation({
                address,
                mailingAddress,
                useMailingAddress: testCase.data.useMailingAddress
            })
            expect(addressInformation.validate()).toBe(true)
        }
    })
})
