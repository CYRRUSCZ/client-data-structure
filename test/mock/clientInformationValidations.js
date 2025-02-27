module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                type: null,
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/type must be string',
                '/type must be equal to one of the allowed values'
            ]
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: null,
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
            },
            expected: [
                '/economicalSectorCode must be string'
            ]
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: null,
                investmentParameters: [],
                residency: false,
            },
            expected: [
                '/legislation must be string'
            ]
        }
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                type: null,
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
            },
            expected: [
                '/type must be string',
                '/type must be equal to one of the allowed values',
                'must have required property \'bankAccountsConfirmedByAffidavit\''
            ]
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: null,
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
            },
            expected: [
                '/economicalSectorCode must be string',
                'must have required property \'bankAccountsConfirmedByAffidavit\''
            ]
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: null,
                investmentParameters: [],
                residency: false,
            },
            expected: [
                '/legislation must be string',
                'must have required property \'bankAccountsConfirmedByAffidavit\''
            ]
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
            },
            expected: [
                'must have required property \'bankAccountsConfirmedByAffidavit\''
            ]
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
            },
            expected: [
                'must have required property \'bankAccountsConfirmedByAffidavit\''
            ]
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
            },
            expected: [
                'must have required property \'bankAccountsConfirmedByAffidavit\''
            ]
        }
    ],
    testCasesValidData: [
        {
            data: {
                type: 'person',
                economicalSectorCode: 2002212,
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: false,
            }
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: null,
            }
        },
        {
            data: {
                type: 'company',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: true,
            }
        },
        {
            data: {
                type: 'osvc',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: true,
            }
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: true,
            }
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: true,
            }
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: true,
            }
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                residency: true,
            }
        },
        {
            data: {
                type: 'person',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentParameters: [],
                residency: true,
            }
        },
    ]
}
