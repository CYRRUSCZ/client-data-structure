module.exports = {
    expectErrorsTestCases: [
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
                citizenship: 'Praha',
                gender: 'man',
                politician: false
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                politician: false
            },
            expected: [
                '/citizenship must be string',
            ]
        }
    ],
    testCasesValidData: [
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
                citizenship: 'Praha',
                gender: 'male',
                politician: false
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
                citizenship: 'Praha',
                gender: 'female',
                politician: false
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
                citizenship: 'Praha',
                gender: 'other',
                politician: false
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
                citizenship: 'Praha',
                gender: 'other',
                politician: false
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
                citizenship: 'Praha',
                gender: 'other',
                politician: false
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
                citizenship: 'Praha',
                gender: 'other',
                politician: false
            }
        },
    ]
}
