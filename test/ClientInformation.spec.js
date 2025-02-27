const { ClientInformation, ClientData, InvestmentProfile } = require('../dist/client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } = require('./mock/clientInformationValidations.js')

let clientInformation = new ClientInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT]
)

function reinitClientInformation () {
    clientInformation = new ClientInformation(
        clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT]
    )
}

describe('ClientInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = clientInformation.toPlainObject()
        expect(clientInformation).toEqual(ClientInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(clientInformation.toPlainObject())
        expect(clientInformation).toEqual(ClientInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new ClientInformation()
        expect(empty.dataOriginId).toBeNull()
    })

    it('constructor vs create', () => {
        const fromCreate = ClientInformation.create(
            clientInformation.type,
            clientInformation.dataOrigin,
            clientInformation.dataOriginId,
            clientInformation.capitolId,
            clientInformation.crmId,
            clientInformation.investmentProfiles,
            clientInformation.residency,
            clientInformation.economicalSectorCode,
            clientInformation.brokerId,
            clientInformation.externalBrokerCapitolId,
            clientInformation.externalBrokerAgentCapitolId,
            clientInformation.legislation
        )
        expect(fromCreate).toEqual(clientInformation)
    })

    it('method removeProfilesGroup', () => {
        reinitClientInformation()
        const profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        const profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())
        expect(clientInformation.removeProfilesGroup('asdf')).toEqual([])
        expect(clientInformation.removeProfilesGroup('')).toEqual([])
        expect(clientInformation.removeProfilesGroup(clientInformation.investmentProfiles[0].groupUid)).toEqual([profile1])
        expect(clientInformation.investmentProfiles).toEqual([profile2])
    })

    it('method containsProfile', () => {
        reinitClientInformation()
        expect(clientInformation.containsProfile(new InvestmentProfile({ uid: 'asdf' }))).toBe(false)
        expect(clientInformation.containsProfile(clientInformation.investmentProfiles[0])).toBe(true)
    })

    it('method replaceProfilesGroup', () => {
        reinitClientInformation()
        const profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        const profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())
        const profile3 = new InvestmentProfile({ ...profile2.toJSON(), ...{ uid: 'baz', groupUid: profile1.groupUid } })

        clientInformation.replaceProfilesGroup(profile1.groupUid, [profile3])
        expect(clientInformation.investmentProfiles).toEqual([profile2, profile3])
    })

    it('method replaceProfilesGroup', () => {
        reinitClientInformation()
        const profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        const profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())

        clientInformation.removeProfile(profile1)
        expect(clientInformation.investmentProfiles).toEqual([profile2])
    })

    it('method addProfile', () => {
        reinitClientInformation()
        const profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        const profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())
        const profile3 = new InvestmentProfile({ ...profile1.toJSON(), ...{ uid: 'aaa', groupUid: 'bbb' } })
        clientInformation.addProfile(profile1)
        expect(clientInformation.investmentProfiles).toEqual([profile2, profile1])
        clientInformation.addProfile(profile3)
        expect(clientInformation.investmentProfiles).toEqual([profile2, profile1, profile3])
    })

    it('method hasInvestmentService', () => {
        reinitClientInformation()
        const profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())

        expect(clientInformation.hasInvestmentService(profile1.services[0].uid)).toBe(true)
        expect(clientInformation.hasInvestmentService('asdf')).toBe(false)
    })
})

describe('ClientInformation validations', () => {
    it('Expect valid ClientInformation', () => {
        for (const testCase of testCasesValidData) {
            const clientInformation = new ClientInformation(testCase.data)
            expect(clientInformation.validate()).toBe(true)
        }
    })

    it('Expect ClientInformation validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const clientInformation = new ClientInformation(testCase.data)
            try {
                clientInformation.validate()
            } catch (error) {
                const errors = clientInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect ClientInformation validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const clientInformation = new ClientInformation()
            try {
                clientInformation.validate(testCase.data)
            } catch (error) {
                const errors = clientInformation.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })
})
