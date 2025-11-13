import { ClientInformation, ClientData } from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, testCasesValidData } from './mock/clientInformationValidations'

const clientInformation = new ClientInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT]
)

describe('ClientInformation', () => {
    it('serialization roundtrip', () => {
        expect(clientInformation).toEqual(ClientInformation.fromPlainObject(clientInformation.toPlainObject()))
        const string = JSON.stringify(clientInformation.toPlainObject())
        expect(clientInformation).toEqual(ClientInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new ClientInformation()
        expect(empty.dataOrigin).toBeNull()
    })

    it('constructor vs create', () => {
        const fromCreate = ClientInformation.create(
            clientInformation.type,
            clientInformation.dataOrigin,
            clientInformation.internalId,
            clientInformation.contactId,
            clientInformation.isResident,
            clientInformation.economicalSectorCode,
            clientInformation.brokerContactId,
            clientInformation.externalBrokerContactId,
            clientInformation.externalBrokerAgentContactId,
            clientInformation.legislation,
            clientInformation.preferredLanguage,
            clientInformation.investmentParameters
        )
        expect(fromCreate).toEqual(clientInformation)
    })
})

describe('ClientInformation validations', () => {
    it.each(testCasesValidData)('validates correct client information data', (testCase) => {
        const clientInformation = new ClientInformation(testCase.data)
        expect(clientInformation.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws on invalid data', (testCase) => {
        const clientInformation = new ClientInformation(testCase.data)
        expect(() => clientInformation.validate()).toThrow()
        const validationErrors = clientInformation.getValidationErrors()
            .map(err => `${err.instancePath ? `${err.instancePath} ` : ''}${err.message}`)

        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors.join('\n')).toBe(testCase.expected)
        }
    })

    it('validates POJO passed directly to validate()', () => {
        const clientInformation = new ClientInformation()
        const invalidData = {
            type: null,
            dataOrigin: 'test'
        }
        expect(() => clientInformation.validate(invalidData)).toThrow()
    })
})

describe('ClientInformation.compareWith', () => {
    const client = new ClientInformation({
        type: 'person',
        dataOrigin: 'web',
        internalId: 'client-123',
        contactId: 'contact-456',
        isResident: true,
        legislation: 'CZE',
        preferredLanguage: 'cs',
        investmentParameters: []
    })

    it('returns empty array for identical client information', () => {
        expect(client.compareWith(client.toJSON())).toEqual([])
    })

    it('detects individual field changes', () => {
        const internalIdChange = client.compareWith({ ...client.toJSON(), internalId: 'client-999' })
        expect(internalIdChange.find(d => d.path === 'internalId')).toEqual({
            path: 'internalId',
            originalValue: 'client-123',
            changedValue: 'client-999'
        })

        const typeChange = client.compareWith({ ...client.toJSON(), type: 'company' })
        expect(typeChange.find(d => d.path === 'type')).toEqual({
            path: 'type',
            originalValue: 'person',
            changedValue: 'company'
        })

        const originChange = client.compareWith({ ...client.toJSON(), dataOrigin: 'mobile' })
        expect(originChange.find(d => d.path === 'dataOrigin')).toEqual({
            path: 'dataOrigin',
            originalValue: 'web',
            changedValue: 'mobile'
        })

        const residentChange = client.compareWith({ ...client.toJSON(), isResident: false })
        expect(residentChange.find(d => d.path === 'isResident')).toEqual({
            path: 'isResident',
            originalValue: true,
            changedValue: false
        })

        const legislationChange = client.compareWith({ ...client.toJSON(), legislation: 'SVK' })
        expect(legislationChange.find(d => d.path === 'legislation')).toEqual({
            path: 'legislation',
            originalValue: 'CZE',
            changedValue: 'SVK'
        })

        const languageChange = client.compareWith({ ...client.toJSON(), preferredLanguage: 'en' })
        expect(languageChange.find(d => d.path === 'preferredLanguage')).toEqual({
            path: 'preferredLanguage',
            originalValue: 'cs',
            changedValue: 'en'
        })
    })

    it('detects multiple field changes', () => {
        const changes = client.compareWith({
            ...client.toJSON(),
            internalId: 'client-new',
            type: 'company',
            isResident: false
        })
        expect(changes.length).toBe(3)
        expect(changes.some(d => d.path === 'internalId' && d.changedValue === 'client-new')).toBe(true)
        expect(changes.some(d => d.path === 'type' && d.changedValue === 'company')).toBe(true)
        expect(changes.some(d => d.path === 'isResident' && d.changedValue === false)).toBe(true)
    })

    it('detects investment parameters array changes', () => {
        // Adding parameters to empty array
        const withParams = client.compareWith({
            ...client.toJSON(),
            investmentParameters: [
                {
                    version: 'v1',
                    uid: 'param-1',
                    name: 'Risk',
                    addedAt: new Date('2023-01-01T12:00:00.000Z'),
                    value: '5',
                    isInvestmentCategory: true
                }
            ]
        })
        expect(withParams.length).toBeGreaterThan(0)
        expect(withParams.some(d => d.path.includes('investmentParameters'))).toBe(true)

        // Modifying existing parameter
        const clientWithParams = new ClientInformation({
            ...client.toJSON(),
            investmentParameters: [
                {
                    version: 'v1',
                    uid: 'param-1',
                    name: 'Risk',
                    addedAt: new Date('2023-01-01T12:00:00.000Z'),
                    value: '5',
                    isInvestmentCategory: true
                }
            ]
        })
        const modifiedParam = clientWithParams.compareWith({
            ...clientWithParams.toJSON(),
            investmentParameters: [
                {
                    version: 'v1',
                    uid: 'param-1',
                    name: 'Risk',
                    addedAt: new Date('2023-01-01T12:00:00.000Z'),
                    value: '7',
                    isInvestmentCategory: true
                }
            ]
        })
        expect(modifiedParam.length).toBeGreaterThan(0)
        expect(modifiedParam.some(d => d.path.includes('value'))).toBe(true)
    })
})
