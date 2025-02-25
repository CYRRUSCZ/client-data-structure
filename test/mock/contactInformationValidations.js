module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                phoneNumber: '72879652545',
                email: 'tomas@valiasek.cz',
                phonePassword: 'jemuhodne'
            },
            expected: [
                '/phoneNumber Invalid phone number'
            ]
        },
        {
            data: {
                phoneNumber: null,
                email: 'tomas@valiasek.cz',
                phonePassword: 'jemuhodne'
            },
            expected: [
                '/phoneNumber Phone number is required'
            ]
        },
        {
            data: {
                phoneNumber: '(+420)777908902',
                email: 'tomas@valiasek',
                phonePassword: 'jemuhodne'
            },
            expected: [
                '/email must match format "email"'
            ]
        },
        {
            data: {
                phoneNumber: '(+420)777908902',
                email: null,
                phonePassword: 'jemuhodne'
            },
            expected: [
                '/email must be string'
            ]
        },
        {
            data: {
                phoneNumber: '(+420)777908902',
                email: 'tomas@valiasek.cz',
                phonePassword: null
            },
            expected: [
                '/phonePassword must be string'
            ]
        },
        {
            data: {
                phoneNumber: '(+420)777908902',
                email: 'tomas@valiasek.cz',
                phonePassword: 'tristatriatricetstribrnychstrikacekpreskociloprestristatriatricetstribrnychstrech'
            },
            expected: [
                '/phonePassword must NOT have more than 20 characters'
            ]
        }
    ],
    testCasesValidData: [
        {
            data: {
                phoneNumber: '(+420)777908902',
                email: 'tomas@valiasek.cz',
                phonePassword: 'jemuhodne'
            }
        },
        {
            data: {
                phoneNumber: '+420777908902',
                email: 'tomas@valiasek.cz',
                phonePassword: 'jemuhodne'
            }
        },
        {
            data: {
                phoneNumber: '+420 777 908 902',
                email: 'tomas@valiasek.cz',
                phonePassword: 'jemuhodne'
            }
        }
    ]
}
