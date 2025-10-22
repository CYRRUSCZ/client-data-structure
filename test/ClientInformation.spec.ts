import { ClientInformation, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } from './mock/clientInformationValidations'

const clientInformation = new ClientInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT]
)

describe('ClientInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = clientInformation.toPlainObject()
        expect(clientInformation).toEqual(ClientInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(clientInformation.toPlainObject())
        expect(clientInformation).toEqual(ClientInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new ClientInformation()
        expect(empty.dataOrigin).toBeNull()
    })

    it('constructor vs create', () => {
        const fromCreate = ClientInformation.create(
            clientInformation.type,
            clientInformation.dataOrigin,
            clientInformation.internalId,
            clientInformation.contactId,
            clientInformation.isResident,
            clientInformation.economicalSectorCode,
            clientInformation.brokerContactId,
            clientInformation.externalBrokerContactId,
            clientInformation.externalBrokerAgentContactId,
            clientInformation.legislation,
            clientInformation.preferredLanguage,
            clientInformation.investmentParameters
        )
        expect(fromCreate).toEqual(clientInformation)
    })
})

describe('ClientInformation validations', () => {
    it('Expect valid ClientInformation', () => {
        for (const testCase of testCasesValidData) {
            const clientInformation = new ClientInformation(testCase.data)
            expect(clientInformation.validate()).toBe(true)
        }
    })

    it('Expect ClientInformation validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const clientInformation = new ClientInformation(testCase.data)
            try {
                clientInformation.validate()
            } catch (error) {
                const errors = clientInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect ClientInformation validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const clientInformation = new ClientInformation()
            try {
                clientInformation.validate(testCase.data)
            } catch (error) {
                const errors = clientInformation.getValidationErrors()
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
