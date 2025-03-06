const { Representative } = require('./client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } = require('./mock/representativeValidations.js')

const { personal, address, idCard, contact } = clientDataset
const representative = new Representative(
    {
        id: 'foo',
        position: 'ceo',
        personal,
        address,
        idCard,
        contact,
        isRepresentative: true,
        isRealOwner: true,
        realOwnerReasonChar: 'a',
        realOwnerReasonNumber: '1',
        capitolId: 'bar',
        capitolContactId: 'baz',
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
        expect(empty.position).toBeNull()
        expect(empty.realOwnerReasonChar).toBeNull()
        expect(empty.realOwnerReasonNumber).toBeNull()
    })

    it('defaults to boolean values', () => {
        const empty = new Representative()
        expect(empty.isRealOwner).toBe(false)
        expect(empty.isRepresentative).toBe(false)
        expect(empty.hasPowerOfAttorney).toBe(false)
    })

    it('constructor vs create', () => {
        const fromCreate = Representative.create(
            representative.id,
            representative.position,
            representative.personal,
            representative.address,
            representative.idCard,
            representative.contact,
            representative.isRepresentative,
            representative.isRealOwner,
            representative.realOwnerReasonChar,
            representative.realOwnerReasonNumber,
            representative.capitolId,
            representative.capitolContactId,
            representative.hasPower
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
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
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
