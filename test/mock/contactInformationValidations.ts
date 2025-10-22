import type { ContactInformationInput } from '../../src/ContactInformation'

interface TestCase {
    data: Partial<ContactInformationInput>
    expected?: string | string[]
}

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            phoneNumber: '72879652545',
            email: 'tomas@valiasek.cz'
        },
        expected: [
            '/phoneNumber Invalid phone number',
            '/phoneNumber must match pattern "^(\\()?\\+[0-9\\s]+(\\))?[0-9\\s]+$"'
        ]
    },
    {
        data: {
            phoneNumber: null,
            email: 'tomas@valiasek.cz'
        },
        expected: [
            '/phoneNumber must be string'
        ]
    },
    {
        data: {
            phoneNumber: '(+420)777908902',
            email: 'tomas@valiasek'
        },
        expected: [
            '/email must match format "email"'
        ]
    },
    {
        data: {
            phoneNumber: '(+420)777908902',
            email: null
        },
        expected: [
            '/email must be string'
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            phoneNumber: '72879652545',
            email: 'tomas@valiasek.cz'
        },
        expected: [
            '/phoneNumber Invalid phone number',
            '/phoneNumber must match pattern "^(\\()?\\+[0-9\\s]+(\\))?[0-9\\s]+$"'
        ]
    },
    {
        data: {
            phoneNumber: null,
            email: 'tomas@valiasek.cz'
        },
        expected: [
            '/phoneNumber must be string'
        ]
    },
    {
        data: {
            phoneNumber: '(+420)777908902',
            email: 'tomas@valiasek'
        },
        expected: [
            '/email must match format "email"'
        ]
    },
    {
        data: {
            phoneNumber: '(+420)777908902',
            email: null
        },
        expected: [
            '/email must be string'
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            phoneNumber: '(+420)777908902',
            email: 'tomas@valiasek.cz'
        }
    },
    {
        data: {
            phoneNumber: '+420777908902',
            email: 'tomas@valiasek.cz'
        }
    },
    {
        data: {
            phoneNumber: '+420 777 908 902',
            email: 'tomas@valiasek.cz'
        }
    }
]
