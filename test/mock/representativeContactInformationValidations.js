module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                phoneNumber: '72879652545',
                email: 'tomas@valiasek.cz'
            },
            expected: [
                '/phoneNumber Invalid phone number'
            ]
        },
        {
            data: {
                phoneNumber: null,
                email: 'tomas@valiasek.cz'
            },
            expected: [
                '/phoneNumber Phone number is required'
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
        },
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                phoneNumber: '72879652545',
                email: 'tomas@valiasek.cz'
            },
            expected: [
                '/phoneNumber Invalid phone number'
            ]
        },
        {
            data: {
                phoneNumber: null,
                email: 'tomas@valiasek.cz'
            },
            expected: [
                '/phoneNumber Phone number is required'
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
        },
    ],
    testCasesValidData: [
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
}
