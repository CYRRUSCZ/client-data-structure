module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                recipient: null,
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/recipient must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: null,
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/street must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: null,
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/streetNumber must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: null,
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/city must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: null,
                country: 'CZE'
            },
            expected: '/postalCode must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: null
            },
            expected: '/country must be string'
        },
        {
            data: {
                recipient: null,
                street: null,
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: null,
                country: 'CZE'
            },
            expected: '/recipient must be string\n/street must be string\n/postalCode must be string'
        }
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                recipient: null,
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/recipient must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: null,
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/street must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: null,
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/streetNumber must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: null,
                postalCode: '66609',
                country: 'CZE'
            },
            expected: '/city must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: null,
                country: 'CZE'
            },
            expected: '/postalCode must be string'
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: null
            },
            expected: '/country must be string'
        },
        {
            data: {
                recipient: null,
                street: null,
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: null,
                country: 'CZE'
            },
            expected: '/recipient must be string\n/street must be string\n/postalCode must be string'
        }
    ],
    testCasesValidData: [
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: '66609',
                country: 'CZE'
            }
        },
        {
            data: {
                recipient: 'První firma a.s.',
                street: 'Příčná',
                streetNumber: '554/6a',
                city: 'Brno',
                postalCode: 66609,
                country: 'CZE'
            }
        }
    ]
}
