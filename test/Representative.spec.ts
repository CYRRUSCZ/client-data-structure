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
    it('Expect valid PersonalInformation', () => {
        for (const testCase of testCasesValidData) {
            const representative = new Representative(testCase.data)
            expect(representative.validate()).toBe(true)
        }
    })

    it('Expect Representative validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const representative = new Representative(testCase.data)
            try {
                representative.validate()
            } catch (error) {
                const errors = representative.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect((error as Error).message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect Representative validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const representative = new Representative()
            try {
                representative.validate(testCase.data)
            } catch (error) {
                const errors = representative.getValidationErrors()
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
