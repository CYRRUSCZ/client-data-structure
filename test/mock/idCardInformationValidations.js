const validityValidDate = (() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() + 1)

    return d
})()

module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                number: '',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            },
            expected: [
                '/number must be string',
            ]
        },
        {
            data: {
                number: '123456789',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'RP',
                scanNotAllowed: true,
            },
            expected: [
                '/type must be equal to one of the allowed values'
            ]
        },
        {
            data: {
                number: '123456789',
                issuedBy: null,
                country: 'CR',
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            },
            expected: [
                '/issuedBy must be string'
            ]
        },
        {
            data: {
                number: '123456789',
                issuedBy: 'Uncle Bob',
                country: null,
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            },
            expected: [
                '/country must be string'
            ]
        }
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                number: '',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            },
            expected: [
                '/number must NOT have fewer than 5 characters'
            ]
        },
        {
            data: {
                number: '123456789',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'RP',
                scanNotAllowed: true,
            },
            expected: [
                '/type must be equal to one of the allowed values'
            ]
        },
        {
            data: {
                number: '123456789',
                issuedBy: null,
                country: 'CR',
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            },
            expected: [
                '/issuedBy must be string'
            ]
        },
        {
            data: {
                number: '123456789',
                issuedBy: 'Uncle Bob',
                country: null,
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            },
            expected: [
                '/country must be string'
            ]
        }
    ],
    testCasesValidData: [
        {
            data: {
                number: '123456',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            }
        },
        {
            data: {
                number: '123456',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'Pas',
                scanNotAllowed: true,
            }
        },
        {
            data: {
                number: '123456',
                issuedBy: 'Uncle Bob',
                country: 'SK',
                validity: validityValidDate,
                type: 'Pas',
                scanNotAllowed: true,
            }
        },
        {
            data: {
                number: '123456',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: false,
            }
        },
        {
            data: {
                number: 123456,
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: validityValidDate,
                type: 'OP',
                scanNotAllowed: true,
            }
        },
        {
            data: {
                number: '123456789',
                issuedBy: 'Uncle Bob',
                country: 'CR',
                validity: null,
                type: 'OP',
                scanNotAllowed: true,
            }
        },
    ]
}
