import { fromLegacyClientData } from '../src/fromLegacyClientData'
import { ClientData } from '../src/index'

// Mock legacy data structure (v8.2.1)
const legacyClientData = {
    client: {
        type: 'person',
        dataOrigin: 'capitol',
        dataOriginId: 'legacy-123',
        capitolId: 'cap-456',
        brokerId: '789',
        externalBrokerCapitolId: '111',
        externalBrokerAgentCapitolId: '222',
        crmId: 'crm-999',
        economicalSectorCode: '2002212',
        legislation: 'cs_CZ',
        residency: true,
        bankAccountsConfirmedByAffidavit: true,
        investmentProfiles: [
            {
                version: 'profile-v1',
                uid: 'profile-1',
                name: 'Profile 1',
                added: new Date('2019-02-14T12:00:00.000Z'),
                groupUid: 'group-1',
                services: [],
                weight: 1
            }
        ],
        investmentParameters: [
            {
                version: 'param-v1',
                uid: 'param-1',
                name: 'Param 1',
                added: new Date('2020-03-15T12:00:00.000Z'),
                value: '100',
                isInvestmentCategory: true
            }
        ]
    },
    personal: {
        firstName: 'John',
        lastName: 'Doe',
        birthNumber: '123456/7890',
        dateOfBirth: new Date('1980-01-01'),
        noBirthNumber: false,
        birthNumberCountry: 'CZE',
        taxDomicile: 'CZE',
        placeOfBirth: 'Prague',
        citizenship: 'CZE',
        gender: 'male',
        politician: false
    },
    idCard: {
        number: '123456789',
        issuedBy: 'Prague',
        country: 'CZE',
        validity: new Date('2025-01-01'),
        type: 'OP',
        scanNotAllowed: false
    },
    address: {
        address: {
            street: 'Main Street',
            streetNumber: '10',
            city: 'Prague',
            postalCode: '10000',
            country: 'CZE'
        },
        mailingAddress: undefined,
        useMailingAddress: false
    },
    contact: {
        email: 'john@example.com',
        phoneNumber: '+420123456789',
        phonePassword: 'legacy-password'
    },
    bankAccounts: [
        {
            id: 'bank-1',
            capitolId: 'cap-bank-1',
            prefix: '000000',
            account: '123456789',
            code: '0800',
            currency: 'CZK',
            foreign: false
        },
        {
            id: 'bank-2',
            prefix: '000000',
            account: null,
            code: null,
            iban: 'CZ6508000000192000145399',
            swift: 'GIBACZPX',
            bankNameAddress: 'Test Bank',
            accountName: 'Test Account',
            currency: 'EUR',
            foreign: true,
            capitolId: null
        }
    ],
    company: {
        ic: '12345678',
        dic: 'CZ12345678',
        lei: 'LEI12345',
        name: 'Test Company',
        taxDomicile: 'CZE',
        representatives: [
            {
                id: 'rep-1',
                capitolId: 'cap-rep-1',
                capitolContactId: 'cap-contact-1',
                position: 'CEO',
                isRepresentative: true,
                isRealOwner: true,
                realOwnerReasonChar: 'a',
                realOwnerReasonNumber: '1',
                personal: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    birthNumber: '987654/3210',
                    dateOfBirth: new Date('1975-05-05'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CZE',
                    taxDomicile: 'CZE',
                    placeOfBirth: 'Brno',
                    citizenship: 'CZE',
                    gender: 'female',
                    politician: false
                },
                idCard: {
                    number: '987654321',
                    issuedBy: 'Brno',
                    country: 'CZE',
                    validity: new Date('2026-01-01'),
                    type: 'Pas',
                    scanNotAllowed: true
                },
                address: {
                    street: 'Second Street',
                    streetNumber: '20',
                    city: 'Brno',
                    postalCode: '60000',
                    country: 'CZE'
                },
                contact: {
                    email: 'jane@example.com',
                    phoneNumber: '+420987654321'
                }
            }
        ]
    }
}

describe('fromLegacyClientData', () => {
    let migratedData: ClientData

    beforeEach(() => {
        migratedData = fromLegacyClientData(legacyClientData as any)
    })

    it('should return a ClientData instance', () => {
        expect(migratedData).toBeInstanceOf(ClientData)
    })

    describe('ClientInformation migration', () => {
        it('should map dataOriginId to internalId', () => {
            expect(migratedData.client.internalId).toBe('legacy-123')
        })

        it('should map residency to isResident', () => {
            expect(migratedData.client.isResident).toBe(true)
        })

        it('should map legislation to preferredLanguage', () => {
            expect(migratedData.client.preferredLanguage).toBe('cs_CZ')
        })

        it('should remove capitolId field', () => {
            const json = migratedData.client.toJSON() as any
            expect(json.capitolId).toBeUndefined()
        })

        it('should set contactId to null', () => {
            expect(migratedData.client.contactId).toBeNull()
        })

        it('should set brokerContactId to null', () => {
            expect(migratedData.client.brokerContactId).toBeNull()
        })

        it('should remove brokerId field', () => {
            const json = migratedData.client.toJSON() as any
            expect(json.brokerId).toBeUndefined()
        })

        it('should remove crmId field', () => {
            const json = migratedData.client.toJSON() as any
            expect(json.crmId).toBeUndefined()
        })

        it('should remove investmentProfiles field', () => {
            const json = migratedData.client.toJSON() as any
            expect(json.investmentProfiles).toBeUndefined()
        })

        it('should remove bankAccountsConfirmedByAffidavit field', () => {
            const json = migratedData.client.toJSON() as any
            expect(json.bankAccountsConfirmedByAffidavit).toBeUndefined()
        })
    })

    describe('InvestmentParameter migration', () => {
        it('should rename added to addedAt', () => {
            const params = migratedData.client.investmentParameters
            expect(params.length).toBeGreaterThan(0)
            expect(params[0].addedAt).toBeInstanceOf(Date)
        })

        it('should preserve parameter data', () => {
            const param = migratedData.client.investmentParameters[0]
            expect(param.uid).toBe('param-1')
            expect(param.name).toBe('Param 1')
            expect(param.version).toBe('param-v1')
            expect(param.value).toBe('100')
            expect(param.isInvestmentCategory).toBe(true)
        })
    })

    describe('IdCardInformation migration', () => {
        it('should map OP type to id', () => {
            expect(migratedData.idCard.type).toBe('id')
        })

        it('should preserve other idCard fields', () => {
            expect(migratedData.idCard.number).toBe('123456789')
            expect(migratedData.idCard.issuedBy).toBe('Prague')
            expect(migratedData.idCard.country).toBe('CZ')
        })
    })

    describe('ContactInformation migration', () => {
        it('should remove phonePassword field', () => {
            const json = migratedData.contact.toJSON() as any
            expect(json.phonePassword).toBeUndefined()
        })

        it('should preserve email and phoneNumber', () => {
            expect(migratedData.contact.email).toBe('john@example.com')
            expect(migratedData.contact.phoneNumber).toBe('+420123456789')
        })
    })

    describe('BankAccount migration', () => {
        it('should map foreign to isForeign', () => {
            expect(migratedData.bankAccounts[0].isForeign).toBe(false)
            expect(migratedData.bankAccounts[1].isForeign).toBe(true)
        })

        it('should set cytronId to null', () => {
            expect(migratedData.bankAccounts[0].cytronId).toBeNull()
        })

        it('should remove capitolId field', () => {
            const json = migratedData.bankAccounts[0].toJSON() as any
            expect(json.capitolId).toBeUndefined()
        })

        it('should add isConfirmedByAffidavit from client.bankAccountsConfirmedByAffidavit', () => {
            expect(migratedData.bankAccounts[0].isConfirmedByAffidavit).toBe(true)
            expect(migratedData.bankAccounts[1].isConfirmedByAffidavit).toBe(true)
        })

        it('should preserve account data', () => {
            expect(migratedData.bankAccounts[0].account).toBe('123456789')
            expect(migratedData.bankAccounts[0].code).toBe('0800')
        })
    })

    describe('Representative migration', () => {
        it('should map Pas type to passport in representative idCard', () => {
            const rep = migratedData.company.representatives[0]
            expect(rep.idCard.type).toBe('passport')
        })

        it('should remove position field', () => {
            const rep = migratedData.company.representatives[0]
            const json = rep.toJSON() as any
            expect(json.position).toBeUndefined()
        })

        it('should set cytronId to null', () => {
            const rep = migratedData.company.representatives[0]
            expect(rep.cytronId).toBeNull()
        })

        it('should set contactId to null', () => {
            const rep = migratedData.company.representatives[0]
            expect(rep.contactId).toBeNull()
        })

        it('should remove capitolId field', () => {
            const rep = migratedData.company.representatives[0]
            const json = rep.toJSON() as any
            expect(json.capitolId).toBeUndefined()
        })

        it('should remove capitolContactId field', () => {
            const rep = migratedData.company.representatives[0]
            const json = rep.toJSON() as any
            expect(json.capitolContactId).toBeUndefined()
        })

        it('should preserve representative data', () => {
            const rep = migratedData.company.representatives[0]
            expect(rep.id).toBe('rep-1')
            expect(rep.isRepresentative).toBe(true)
            expect(rep.isRealOwner).toBe(true)
            expect(rep.realOwnerReasonChar).toBe('a')
            expect(rep.realOwnerReasonNumber).toBe('1')
        })
    })

    describe('Edge cases', () => {
        it('should handle empty investmentParameters', () => {
            const data = fromLegacyClientData({
                ...legacyClientData,
                client: { ...legacyClientData.client, investmentParameters: [] }
            })
            expect(data.client.investmentParameters).toEqual([])
        })

        it('should handle empty representatives', () => {
            const data = fromLegacyClientData({
                ...legacyClientData,
                company: { ...legacyClientData.company, representatives: [] }
            })
            expect(data.company.representatives).toEqual([])
        })

        it('should handle residency false', () => {
            const data = fromLegacyClientData({
                ...legacyClientData,
                client: { ...legacyClientData.client, residency: false }
            })
            expect(data.client.isResident).toBe(false)
        })

        it('should handle unknown idCard type by preserving it', () => {
            const data = fromLegacyClientData({
                ...legacyClientData,
                idCard: { ...legacyClientData.idCard, type: 'Unknown' }
            })
            expect(data.idCard.type).toBe('Unknown')
        })

        it('should handle null idCard type', () => {
            const data = fromLegacyClientData({
                ...legacyClientData,
                idCard: { ...legacyClientData.idCard, type: null }
            })
            expect(data.idCard.type).toBeNull()
        })

        it('should handle bankAccountsConfirmedByAffidavit false', () => {
            const data = fromLegacyClientData({
                ...legacyClientData,
                client: { ...legacyClientData.client, bankAccountsConfirmedByAffidavit: false }
            })
            expect(data.bankAccounts[0].isConfirmedByAffidavit).toBe(false)
        })
    })
})
