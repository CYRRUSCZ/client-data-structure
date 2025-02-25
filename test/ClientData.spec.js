const {
    ClientData, AddressInformation, BankAccount,
    ContactInformation, IdCardInformation, PersonalInformation,
    ClientInformation, CompanyInformation
} = require('../dist/client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')
const { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } = require('./mock/clientDataValidations.js')

const client = new ClientData(clientDataset)
const address = new AddressInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS])
const bank = clientDataset[ClientData.PLAIN_OBJECT_KEY_BANK_ACCOUNTS].map((item) => { return new BankAccount(item) })
const contact = new ContactInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_CONTACT])
const idCard = new IdCardInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ID_CARD])
const personal = new PersonalInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_PERSONAL])
const clientInfo = new ClientInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT])
const companyInfo = new CompanyInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_COMPANY])

describe('ClientData', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = client.toPlainObject()
        expect(client).toEqual(ClientData.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(client.toPlainObject())
        expect(client).toEqual(ClientData.fromPlainObject(JSON.parse(string)))
    })

    it('all subclass instances are deep equal', () => {
        expect(client[ClientData.PLAIN_OBJECT_KEY_ADDRESS]).toEqual(address)
        expect(client[ClientData.PLAIN_OBJECT_KEY_BANK_ACCOUNTS]).toEqual(bank)
        expect(client[ClientData.PLAIN_OBJECT_KEY_CONTACT]).toEqual(contact)
        expect(client[ClientData.PLAIN_OBJECT_KEY_ID_CARD]).toEqual(idCard)
        expect(client[ClientData.PLAIN_OBJECT_KEY_PERSONAL]).toEqual(personal)
        expect(client[ClientData.PLAIN_OBJECT_KEY_CLIENT]).toEqual(clientInfo)
    })

    it('defaults to empty instances', () => {
        const empty = new ClientData()
        expect(empty[ClientData.PLAIN_OBJECT_KEY_ADDRESS]).toEqual(new AddressInformation())
        expect(empty[ClientData.PLAIN_OBJECT_KEY_BANK_ACCOUNTS]).toEqual([])
        expect(empty[ClientData.PLAIN_OBJECT_KEY_CONTACT]).toEqual(new ContactInformation())
        expect(empty[ClientData.PLAIN_OBJECT_KEY_ID_CARD]).toEqual(new IdCardInformation())
        expect(empty[ClientData.PLAIN_OBJECT_KEY_PERSONAL]).toEqual(new PersonalInformation())
        expect(empty[ClientData.PLAIN_OBJECT_KEY_CLIENT]).toEqual(new ClientInformation())
        expect(empty[ClientData.PLAIN_OBJECT_KEY_COMPANY]).toEqual(new CompanyInformation())
    })

    it('constructor vs create', () => {
        const fromCreate = ClientData.create(
            client.client,
            client.personal,
            client.idCard,
            client.address,
            client.contact,
            client.bankAccounts,
            client.company
        )
        expect(fromCreate).toEqual(client)
    })

    it('regular address override', () => {
        const fromCreate = ClientData.create(
            client.client,
            client.personal,
            client.idCard,
            client.address,
            client.contact,
            client.bankAccounts,
            client.companyInfo,
            client.address.mailingAddress
        )
        expect(fromCreate.address.address).toEqual(client.address.mailingAddress)
    })

    it('regular address override undefined address information', () => {
        const fromCreate = ClientData.create(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            client.address.mailingAddress
        )
        expect(fromCreate.address.address).toEqual(client.address.mailingAddress)
    })

    it('getter dataOrigin should return same value as ClientInformation instance', () => {
        expect(client.dataOrigin).toEqual(clientInfo.dataOrigin)
    })

    it('getter dataOriginId should return same value as ClientInformation instance', () => {
        expect(client.dataOriginId).toEqual(clientInfo.dataOriginId)
    })

    it('getter type should return same value as ClientInformation instance', () => {
        expect(client.type).toEqual(clientInfo.type)
    })

    it('getter fullAddress should return same address as mailing Address instance', () => {
        expect(client.fullAddress).toEqual(address.mailingAddress.fullAddress)
    })

    it('getter fullAddress should return same address as Address instance', () => {
        const clientData = client.toPlainObject()
        clientData.address.useMailingAddress = false
        const clientInstance = new ClientData(clientData)
        expect(clientInstance.fullAddress).toEqual(address.address.fullAddress)
    })

    it('getter fullName should return same fullName as PersonalInformation instance', () => {
        expect(client.fullName).toEqual(personal.fullName)
    })

    it('getter email should return same email as ContactInformation instance', () => {
        expect(client.email).toEqual(contact.email)
    })

    it('getter fullName should return correct name for company and for person', () => {
        expect(client.fullName).toEqual(personal.fullName)
        const clientData = client.toPlainObject()
        clientData.client.type = 'company'
        const clientInstance = new ClientData(clientData)
        expect(clientInstance.fullName).toEqual(companyInfo.name)
    })

    it('should have same date in birthDate', () => {
        const tmp = new ClientData({ personal: { dateOfBirth: new Date('2020-01-01T12:00:00.000Z') } })
        expect(tmp.personal.dateOfBirth.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })

    it('should have same date in birthDate 2', () => {
        const tmp = new ClientData({ personal: { dateOfBirth: '2020-01-01T11:00:00.000Z' } })
        expect(tmp.personal.dateOfBirth.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })

    it('should have same date in birthDate 3', () => {
        const tmp = new ClientData({ personal: { dateOfBirth: '2020-01-01' } })
        expect(tmp.personal.dateOfBirth.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })

    it('should have same date in birthDate in representative', () => {
        const tmp = new ClientData({ company: { representatives: [{ personal: { dateOfBirth: new Date('2020-01-01T12:00:00.000Z') } }] } })
        expect(tmp.company.representatives[0].personal.dateOfBirth.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })
})

describe('ClientData validations', () => {
    it('Expect valid ClientData', () => {
        for (const testCase of testCasesValidData) {
            const clientData = new ClientData(testCase.data)
            expect(clientData.validate()).toBe(true)
        }
    })

    it('Expect ClientData validations throws exceptions', () => {
        for (const testCase of expectErrorsTestCases) {
            const clientData = new ClientData(testCase.data)
            try {
                clientData.validate()
            } catch (error) {
                const errors = clientData.getValidationErrors()
                const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} `: ''}${error.message}`)
                if (Array.isArray(testCase.expected)) {
                    expect(validationErrors.sort()).toEqual(testCase.expected.sort())
                } else {
                    expect(error.message).toBe(testCase.expected)
                }
            }
        }
    })

    it('Expect ClientData validations throws exceptions when POJO directly passed to validate()', () => {
        for (const testCase of expectPojoErrorsTestCases) {
            const clientData = new ClientData()
            try {
                clientData.validate(testCase.data)
            } catch (error) {
                const errors = clientData.getValidationErrors()
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
