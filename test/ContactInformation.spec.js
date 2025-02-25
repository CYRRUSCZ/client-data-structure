const { ContactInformation, ClientData } = require('../dist/client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const { expectErrorsTestCases, testCasesValidData } = require('./mock/contactInformationValidations.js')

const contactInformation = new ContactInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CONTACT]
)

describe('ContactInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = contactInformation.toPlainObject()
        expect(contactInformation).toEqual(ContactInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(contactInformation.toPlainObject())
        expect(contactInformation).toEqual(ContactInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new ContactInformation()
        expect(empty.phoneNumber).toBeNull()
    })

    it('constructor vs create', () => {
        const fromCreate = ContactInformation.create(
            contactInformation.email,
            contactInformation.phoneNumber,
            contactInformation.phonePassword
        )
        expect(fromCreate).toEqual(contactInformation)
    })
})

describe('ContactInformation validations', () => {
    it('Expect valid ContactInformation', () => {
        for (const testCase of testCasesValidData) {
            const contactInformation = new ContactInformation(testCase.data)
            expect(contactInformation.validate()).toBe(true)
        }
    })

    it('Expect ContactInformation validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const contactInformation = new ContactInformation(testCase.data)
            try {
                contactInformation.validate()
            } catch (error) {
                const errors = contactInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })
})
