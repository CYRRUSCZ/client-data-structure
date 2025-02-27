module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                address: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                useMailingAddress: false
            },
            expected: '/address/recipient must be string'
        },
        {
            data: {
                address: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                useMailingAddress: true
            },
            expected: [
                '/mailingAddress/recipient must be string',
                'must match "then" schema',
                '/address/recipient must be string'
            ]
        }
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                address: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                useMailingAddress: false
            },
            expected: '/address/recipient must be string'
        },
        {
            data: {
                address: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
                    recipient: null,
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                useMailingAddress: true
            },
            expected: [
                '/mailingAddress/recipient must be string',
                'must match "then" schema',
                '/address/recipient must be string'
            ]
        }
    ],
    testCasesValidData: [
        {
            data: {
                address: {
                    recipient: 'Valid',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {},
                useMailingAddress: false
            }
        },
        {
            data: {
                address: {
                    recipient: 'Valid',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                mailingAddress: {
                    recipient: 'Valid',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                useMailingAddress: true
            }
        }
    ]
}
