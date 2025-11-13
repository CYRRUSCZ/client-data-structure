import { ContactInformation, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/contactInformationValidations'

const contactInformation = new ContactInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CONTACT]
)

describe('ContactInformation', () => {
    it('serialization roundtrip', () => {
        expect(contactInformation).toEqual(ContactInformation.fromPlainObject(contactInformation.toPlainObject()))
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
            contactInformation.phoneNumber
        )
        expect(fromCreate).toEqual(contactInformation)
    })
})

describe('ContactInformation validations', () => {
    it.each(testCasesValidData)('validates correct contact information data', (testCase) => {
        const contactInformation = new ContactInformation(testCase.data)
        expect(contactInformation.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data', (testCase) => {
        const contactInformation = new ContactInformation(testCase.data)
        expect(() => contactInformation.validate()).toThrow()
        const validationErrors = contactInformation.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)

        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors.join('\n')).toBe(testCase.expected)
        }
    })

    it('validates POJO passed directly to validate()', () => {
        const contactInformation = new ContactInformation()
        const invalidData = {
            email: null,
            phoneNumber: '+420123456789'
        }
        expect(() => contactInformation.validate(invalidData)).toThrow('/email must be string')
    })
})

describe('ContactInformation.compareWith', () => {
    const contact = new ContactInformation({
        email: 'test@example.com',
        phoneNumber: '+420123456789'
    })

    it('returns empty array for identical contact information', () => {
        expect(contact.compareWith(contact.toJSON())).toEqual([])
    })

    it('detects field changes', () => {
        const email = contact.compareWith({ ...contact.toJSON(), email: 'newemail@example.com' })
        expect(email).toEqual([{
            path: 'email',
            originalValue: 'test@example.com',
            changedValue: 'newemail@example.com'
        }])

        const phone = contact.compareWith({ ...contact.toJSON(), phoneNumber: '+420987654321' })
        expect(phone).toEqual([{
            path: 'phoneNumber',
            originalValue: '+420123456789',
            changedValue: '+420987654321'
        }])

        const multiple = contact.compareWith({
            email: 'another@example.com',
            phoneNumber: '+421111222333'
        })
        expect(multiple).toHaveLength(2)
    })
})
