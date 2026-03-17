import type { PersonalInformationInput } from '../../src/PersonalInformation'

interface TestCase {
    data: any
    expected?: string | string[]
}

export const expectErrorsTestCases: TestCase[] = [
    {
        data: {
            prenominal: 'Ing',
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: 'Phd',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'man'
        },
        expected: [
            '/gender must be equal to one of the allowed values',
        ]
    },
    {
        data: {
            firstName: null,
            lastName: 'Muller',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/firstName must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: null,
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/lastName must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            birthNumber: '902412/1589456',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/birthNumber must match pattern "^\\s*\\d{6}[ /]*\\d{3,4}\\s*$"',
            'must match "else" schema',
            'must match "then" schema'
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            birthNumber: null,
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/birthNumber must be string',
            'must match "else" schema',
            'must match "then" schema'
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: null,
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/birthNumberCountry must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: 'CR',
            taxDomicile: null,
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/taxDomicile must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: null,
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/placeOfBirth must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: null,
            gender: 'male',
        },
        expected: [
            '/citizenship must be string',
        ]
    }
]

export const expectPojoErrorsTestCases: TestCase[] = [
    {
        data: {
            prenominal: 'Ing',
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: 'Phd',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'man',
        },
        expected: [
            '/gender must be equal to one of the allowed values',
        ]
    },
    {
        data: {
            firstName: null,
            lastName: 'Muller',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/firstName must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: null,
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/lastName must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            birthNumber: '902412/1589456',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/birthNumber must match pattern "^\\s*\\d{6}[ /]*\\d{3,4}\\s*$"',
            'must match "else" schema',
            'must match "then" schema'
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            birthNumber: null,
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/birthNumber must be string',
            'must match "else" schema',
            'must match "then" schema'
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: null,
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/birthNumberCountry must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: 'CR',
            taxDomicile: null,
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/taxDomicile must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: null,
            citizenship: 'CZ',
            gender: 'male',
        },
        expected: [
            '/placeOfBirth must be string',
        ]
    },
    {
        data: {
            firstName: 'Rupert',
            lastName: 'Muller',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: null,
            gender: 'male',
        },
        expected: [
            '/citizenship must be string',
        ]
    },
    {
        data: {},
        expected: [
            'must have required property \'birthNumber\'',
            'must match "then" schema',
            'must have required property \'firstName\'',
            'must have required property \'lastName\'',
            'must have required property \'dateOfBirth\'',
            'must have required property \'birthNumberCountry\'',
            'must have required property \'taxDomicile\'',
            'must have required property \'citizenship\'',
            'must have required property \'placeOfBirth\'',
            'must have required property \'gender\'',
        ]
    }
]

export const testCasesValidData: TestCase[] = [
    {
        data: {
            prenominal: 'Ing',
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: 'Phd',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'male',
        }
    },
    {
        data: {
            prenominal: 'Ing',
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: 'Phd',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'female',
        }
    },
    {
        data: {
            prenominal: 'Ing',
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: 'Phd',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'other',
        }
    },
    {
        data: {
            prenominal: null,
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: 'Phd',
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'other',
        }
    },
    {
        data: {
            prenominal: null,
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: null,
            birthNumber: '902412/1589',
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: false,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'other',
        }
    },
    {
        data: {
            prenominal: null,
            firstName: 'Rupert',
            lastName: 'Muller',
            postnominal: null,
            dateOfBirth: new Date('1990-12-24'),
            noBirthNumber: true,
            birthNumberCountry: 'CR',
            taxDomicile: 'CR',
            placeOfBirth: 'Wien',
            citizenship: 'CZ',
            gender: 'other',
        }
    }
]
