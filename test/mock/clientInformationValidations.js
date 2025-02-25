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
                investmentProfiles: [],
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
                dataOrigin: null,
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/dataOrigin must be string',
                '/dataOrigin must be equal to one of the allowed values'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'mordor',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/dataOrigin must be equal to one of the allowed values'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: null,
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/dataOriginId must be string'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: null,
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/crmId must be string'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: '123456789',
                capitolId: null,
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/capitolId must be string'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: '123456789',
                capitolId: 'crapItAll',
                economicalSectorCode: null,
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/economicalSectorCode must be string'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: '123456789',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: null,
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/legislation must be string'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: '123456789',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: null,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/brokerId must be string'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: '123456789',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 12,
                externalBrokerCapitolId: null,
                externalBrokerAgentCapitolId: 22
            },
            expected: [
                '/externalBrokerCapitolId must be string'
            ]
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: '123456789',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 12,
                externalBrokerCapitolId: 156,
                externalBrokerAgentCapitolId: null
            },
            expected: [
                '/externalBrokerAgentCapitolId must be string'
            ]
        }
    ],
    testCasesValidData: [
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: 123456789,
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: 2002212,
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: false,
                brokerId: 123,
                externalBrokerCapitolId: 11,
                externalBrokerAgentCapitolId: 22
            }
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: null,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
        {
            data: {
                type: 'company',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: true,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
        {
            data: {
                type: 'osvc',
                dataOrigin: 'capitol',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: true,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'internal',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: true,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'crm',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: true,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'web',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [],
                residency: true,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'web',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [],
                investmentParameters: [
                    { version: '1.0.0', uid: 'parAmlProfile', name: 'AML Profile', added: new Date('2021-01-01'), value: '1', isInvestmentCategory: true }
                ],
                residency: true,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
        {
            data: {
                type: 'person',
                dataOrigin: 'web',
                dataOriginId: '123456789',
                crmId: 'FooBaarBaZqaz',
                capitolId: 'crapItAll',
                economicalSectorCode: '2002212',
                legislation: 'cs_CZ',
                investmentProfiles: [
                    { version: '1.0.0', uid: 'parAmlProfile', groupUid: 'Aml', services: [], name: 'AML Profile', added: new Date('2021-01-01'), weight: '2' }
                ],
                investmentParameters: [],
                residency: true,
                brokerId: '123',
                externalBrokerCapitolId: '11',
                externalBrokerAgentCapitolId: '22'
            }
        },
    ]
}
