import {
    ClientData, AddressInformation, BankAccount,
    ContactInformation, IdCardInformation, PersonalInformation,
    ClientInformation, CompanyInformation
} from '../src/index'
import clientDataset from './mock/clientDataset'
import { expectErrorsTestCases, expectPojoErrorsTestCases, testCasesValidData } from './mock/clientDataValidations'

const client = new ClientData(clientDataset)
const address = new AddressInformation(clientDataset[ClientData.PLAIN_OBJECT_KEY_ADDRESS])
const bank = clientDataset[ClientData.PLAIN_OBJECT_KEY_BANK_ACCOUNTS]?.map((item) => { return new BankAccount(item) }) ?? []
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
            client.company,
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
        expect(tmp.personal.dateOfBirth?.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })

    it('should have same date in birthDate 2', () => {
        const tmp = new ClientData({ personal: { dateOfBirth: '2020-01-01T11:00:00.000Z' } })
        expect(tmp.personal.dateOfBirth?.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })

    it('should have same date in birthDate 3', () => {
        const tmp = new ClientData({ personal: { dateOfBirth: '2020-01-01' } })
        expect(tmp.personal.dateOfBirth?.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })

    it('should have same date in birthDate in representative', () => {
        const tmp = new ClientData({ company: { representatives: [{ personal: { dateOfBirth: new Date('2020-01-01T12:00:00.000Z') } }] } })
        expect(tmp.company.representatives[0].personal.dateOfBirth?.toISOString()).toEqual(new Date('2020-01-01T12:00:00.000Z').toISOString())
    })
})

describe('ClientData validations', () => {
    it.each(testCasesValidData)('validates valid client data: %#', (testCase) => {
        const clientData = new ClientData(testCase.data)
        expect(clientData.validate()).toBe(true)
    })

    it.each(expectErrorsTestCases)('throws validation error: %#', (testCase) => {
        const clientData = new ClientData(testCase.data)
        expect(() => clientData.validate()).toThrow()
        const errors = clientData.getValidationErrors()
        const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors[0]).toBe(testCase.expected)
        }
    })

    it.each(expectPojoErrorsTestCases)('throws validation error when POJO directly passed: %#', (testCase) => {
        const clientData = new ClientData()
        expect(() => clientData.validate(testCase.data)).toThrow()
        const errors = clientData.getValidationErrors()
        const validationErrors = errors.map(error => `${error.instancePath ? `${error.instancePath} ` : ''}${error.message}`)
        if (Array.isArray(testCase.expected)) {
            expect(validationErrors.sort()).toEqual(testCase.expected.sort())
        } else {
            expect(validationErrors[0]).toBe(testCase.expected)
        }
    })
})

describe('ClientData.compareWith', () => {
    const originalData = new ClientData({
        client: {
            internalId: 'client-123',
            investmentParameters: []
        },
        personal: {
            firstName: 'Jan',
            lastName: 'Novak',
            birthNumber: '900101/1234',
            dateOfBirth: new Date('1990-01-01T12:00:00.000Z')
        },
        idCard: {
            type: 'id',
            number: 'AB123456'
        },
        address: {
            address: {
                street: 'Main St',
                streetNumber: '10',
                city: 'Prague',
                postalCode: '11000',
                country: 'CZE'
            },
            mailingAddress: {
                street: 'Main St',
                streetNumber: '10',
                city: 'Prague',
                postalCode: '11000',
                country: 'CZE'
            }
        },
        contact: {
            email: 'jan.novak@example.com',
            phoneNumber: '+420123456789'
        },
        bankAccounts: [
            {
                id: 'bank-1',
                iban: 'CZ6508000000192000145399',
                currency: 'CZK'
            }
        ]
    })

    it('returns empty array when comparing identical client data', () => {
        const serialized = JSON.parse(JSON.stringify(originalData.toJSON()))
        const differences = originalData.compareWith(serialized)
        expect(differences).toEqual([])
    })

    it('detects client information change', () => {
        const modified = {
            ...originalData.toJSON(),
            client: {
                ...originalData.toJSON().client,
                internalId: 'client-999'
            }
        }
        const differences = originalData.compareWith(modified)
        expect(differences.length).toBeGreaterThan(0)
        const internalIdChange = differences.find(d => d.path === 'client.internalId')
        expect(internalIdChange).toEqual({
            path: 'client.internalId',
            originalValue: 'client-123',
            changedValue: 'client-999'
        })
    })

    it('detects personal information change', () => {
        const modified = {
            ...originalData.toJSON(),
            personal: {
                ...originalData.toJSON().personal,
                firstName: 'Petr'
            }
        }
        const differences = originalData.compareWith(modified)
        expect(differences.length).toBeGreaterThan(0)
        const firstNameChange = differences.find(d => d.path === 'personal.firstName')
        expect(firstNameChange).toEqual({
            path: 'personal.firstName',
            originalValue: 'Jan',
            changedValue: 'Petr'
        })
    })

    it('detects ID card change', () => {
        const modified = {
            ...originalData.toJSON(),
            idCard: {
                ...originalData.toJSON().idCard,
                number: 'CD789012'
            }
        }
        const differences = originalData.compareWith(modified)
        expect(differences.length).toBeGreaterThan(0)
        const numberChange = differences.find(d => d.path === 'idCard.number')
        expect(numberChange).toEqual({
            path: 'idCard.number',
            originalValue: 'AB123456',
            changedValue: 'CD789012'
        })
    })

    it('detects contact information change', () => {
        const modified = {
            ...originalData.toJSON(),
            contact: {
                ...originalData.toJSON().contact,
                email: 'petr.svoboda@example.com'
            }
        }
        const differences = originalData.compareWith(modified)
        expect(differences.length).toBeGreaterThan(0)
        const emailChange = differences.find(d => d.path === 'contact.email')
        expect(emailChange).toEqual({
            path: 'contact.email',
            originalValue: 'jan.novak@example.com',
            changedValue: 'petr.svoboda@example.com'
        })
    })

    it('detects bank account change', () => {
        const modified = {
            ...originalData.toJSON(),
            bankAccounts: [
                {
                    ...originalData.toJSON().bankAccounts[0],
                    currency: 'EUR'
                }
            ]
        }
        const differences = originalData.compareWith(modified)
        expect(differences.length).toBeGreaterThan(0)
        const currencyChange = differences.find(d => d.path.includes('currency'))
        expect(currencyChange).toBeDefined()
        expect(currencyChange?.originalValue).toBe('CZK')
        expect(currencyChange?.changedValue).toBe('EUR')
    })

    it('handles company data comparison', () => {
        const companyData = new ClientData({
            client: {
                internalId: 'company-123'
            },
            company: {
                name: 'ACME Corp',
                ic: '12345678'
            }
        })

        const modified = {
            ...companyData.toJSON(),
            company: {
                ...companyData.toJSON().company,
                name: 'ACME Industries'
            }
        }
        const differences = companyData.compareWith(modified)
        expect(differences.length).toBeGreaterThan(0)
        const nameChange = differences.find(d => d.path === 'company.name')
        expect(nameChange).toEqual({
            path: 'company.name',
            originalValue: 'ACME Corp',
            changedValue: 'ACME Industries'
        })
    })
})
