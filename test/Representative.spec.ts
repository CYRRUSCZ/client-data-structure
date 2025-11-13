import { Representative } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } from './mock/representativeValidations'

const { personal, idCard, contact, address } = clientDataset
// Representative expects AddressInput, not AddressInformationInput
const representativeAddress = address?.address
const representative = new Representative(
    {
        id: 'foo',
        personal,
        address: representativeAddress,
        idCard,
        contact,
        isRepresentative: true,
        isRealOwner: true,
        realOwnerReasonChar: 'a',
        realOwnerReasonNumber: '1',
        cytronId: 'bar',
        contactId: 'baz',
        hasPowerOfAttorney: true
    }
)

describe('Representative', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = representative.toPlainObject()
        expect(representative).toEqual(Representative.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(representative.toPlainObject())
        expect(representative).toEqual(Representative.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new Representative()
        expect(empty.id).toBeNull()
        expect(empty.realOwnerReasonChar).toBeNull()
        expect(empty.realOwnerReasonNumber).toBeNull()
        expect(empty.cytronId).toBeNull()
        expect(empty.contactId).toBeNull()
    })

    it('defaults to boolean values', () => {
        const empty = new Representative()
        expect(empty.isRealOwner).toBe(false)
        expect(empty.isRepresentative).toBe(false)
        expect(empty.hasPowerOfAttorney).toBe(false)
    })

    it('constructor vs create', () => {
        const fromCreate = Representative.create(
            representative.personal,
            representative.address,
            representative.idCard,
            representative.id,
            representative.contact,
            representative.isRepresentative,
            representative.isRealOwner,
            representative.realOwnerReasonChar,
            representative.realOwnerReasonNumber,
            representative.cytronId,
            representative.contactId,
            representative.hasPowerOfAttorney
        )
        expect(fromCreate).toEqual(representative)
    })
})

describe('Representative validations', () => {
    it.each(testCasesValidData)('validates valid representative: %#', (testCase) => {
        const representative = new Representative(testCase.data)
        expect(representative.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws validation error: %#', (testCase) => {
        const representative = new Representative(testCase.data)
        if (Array.isArray(testCase.expected) && testCase.expected.length === 0) {
            // Empty array means this should be valid
            expect(representative.validate()).toBe(true)
        } else {
            expect(() => representative.validate()).toThrow()
            const errors = representative.getValidationErrors()
            const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
            if (Array.isArray(testCase.expected)) {
                expect(validationErrors.sort()).toEqual(testCase.expected.sort())
            } else {
                expect(validationErrors[0]).toBe(testCase.expected)
            }
        }
    })

    it.each(expectPojoErrorsTestCases)('throws validation error when POJO directly passed: %#', (testCase) => {
        const representative = new Representative()
        expect(() => representative.validate(testCase.data)).toThrow()
        const errors = representative.getValidationErrors()
        const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors[0]).toBe(testCase.expected)
        }
    })
})

describe('Representative.compareWith', () => {
    const originalRep = new Representative({
        cytronId: 'rep-123',
        contactId: 'contact-456',
        id: 'id-789',
        isRepresentative: true,
        isRealOwner: false,
        hasPowerOfAttorney: true,
        personal: {
            firstName: 'Jan',
            lastName: 'Novak',
            birthNumber: '900101/1234',
            dateOfBirth: new Date('1990-01-01T12:00:00.000Z')
        },
        idCard: {
            type: 'id',
            number: 'AB123456'
        },
        address: {
            street: 'Main St',
            streetNumber: '10',
            city: 'Prague',
            postalCode: '11000',
            country: 'CZE'
        },
        contact: {
            email: 'jan@example.com',
            phoneNumber: '+420123456789'
        }
    })

    it('returns empty array when comparing identical representatives', () => {
        const serialized = JSON.parse(JSON.stringify(originalRep.toJSON()))
        const differences = originalRep.compareWith(serialized)
        expect(differences).toEqual([])
    })

    it('detects top-level field changes', () => {
        const cytronChange = originalRep.compareWith({ ...originalRep.toJSON(), cytronId: 'rep-456' })
        expect(cytronChange.find(d => d.path === 'cytronId')).toEqual({
            path: 'cytronId',
            originalValue: 'rep-123',
            changedValue: 'rep-456'
        })

        const contactChange = originalRep.compareWith({ ...originalRep.toJSON(), contactId: 'contact-999' })
        expect(contactChange.find(d => d.path === 'contactId')).toEqual({
            path: 'contactId',
            originalValue: 'contact-456',
            changedValue: 'contact-999'
        })

        const booleanChange = originalRep.compareWith({ ...originalRep.toJSON(), isRealOwner: true })
        expect(booleanChange.find(d => d.path === 'isRealOwner')).toEqual({
            path: 'isRealOwner',
            originalValue: false,
            changedValue: true
        })
    })

    it('detects nested personal information changes', () => {
        const firstNameChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            personal: { ...originalRep.toJSON().personal, firstName: 'Petr' }
        })
        expect(firstNameChange.find(d => d.path === 'personal.firstName')).toEqual({
            path: 'personal.firstName',
            originalValue: 'Jan',
            changedValue: 'Petr'
        })

        const birthNumberChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            personal: { ...originalRep.toJSON().personal, birthNumber: '850505/5678' }
        })
        expect(birthNumberChange.find(d => d.path === 'personal.birthNumber')).toEqual({
            path: 'personal.birthNumber',
            originalValue: '900101/1234',
            changedValue: '850505/5678'
        })
    })

    it('detects nested ID card changes', () => {
        const numberChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            idCard: { ...originalRep.toJSON().idCard, number: 'CD789012' }
        })
        expect(numberChange.find(d => d.path === 'idCard.number')).toEqual({
            path: 'idCard.number',
            originalValue: 'AB123456',
            changedValue: 'CD789012'
        })

        const typeChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            idCard: { ...originalRep.toJSON().idCard, type: 'passport' }
        })
        expect(typeChange.find(d => d.path === 'idCard.type')).toEqual({
            path: 'idCard.type',
            originalValue: 'id',
            changedValue: 'passport'
        })
    })

    it('detects nested address changes', () => {
        const cityChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            address: { ...originalRep.toJSON().address, city: 'Brno' }
        })
        expect(cityChange.find(d => d.path === 'address.city')).toEqual({
            path: 'address.city',
            originalValue: 'Prague',
            changedValue: 'Brno'
        })

        const streetChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            address: { ...originalRep.toJSON().address, street: 'New Street' }
        })
        expect(streetChange.find(d => d.path === 'address.street')).toEqual({
            path: 'address.street',
            originalValue: 'Main St',
            changedValue: 'New Street'
        })
    })

    it('detects nested contact changes', () => {
        const emailChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            contact: { ...originalRep.toJSON().contact, email: 'petr@example.com' }
        })
        expect(emailChange.find(d => d.path === 'contact.email')).toEqual({
            path: 'contact.email',
            originalValue: 'jan@example.com',
            changedValue: 'petr@example.com'
        })

        const phoneChange = originalRep.compareWith({
            ...originalRep.toJSON(),
            contact: { ...originalRep.toJSON().contact, phoneNumber: '+420987654321' }
        })
        expect(phoneChange.find(d => d.path === 'contact.phoneNumber')).toEqual({
            path: 'contact.phoneNumber',
            originalValue: '+420123456789',
            changedValue: '+420987654321'
        })
    })

    it('detects multiple changes across different nested objects', () => {
        const changes = originalRep.compareWith({
            ...originalRep.toJSON(),
            cytronId: 'rep-999',
            personal: { ...originalRep.toJSON().personal, lastName: 'Svoboda' },
            address: { ...originalRep.toJSON().address, city: 'Brno' }
        })
        expect(changes.length).toBeGreaterThan(2)
        expect(changes.some(d => d.path === 'cytronId' && d.changedValue === 'rep-999')).toBe(true)
        expect(changes.some(d => d.path === 'personal.lastName' && d.changedValue === 'Svoboda')).toBe(true)
        expect(changes.some(d => d.path === 'address.city' && d.changedValue === 'Brno')).toBe(true)
    })
})
