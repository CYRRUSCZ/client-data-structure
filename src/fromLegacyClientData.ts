import { type ClientDataInput as LegacyClientDataInput, ClientData as LegacyClientData, type ClientInformationOutput as LegacyClientInformationOutput, type IdCardInformationOutput as LegacyIdCardInformationOutput, type ContactInformationOutput as LegacyContactInformationOutput, type RepresentativeOutput as LegacyRepresentativeOutput, type CompanyInformationOutput as LegacyCompanyInformationOutput, type InvestmentParameterOutput as LegacyInvestmentParameterOutput, type BankAccountOutput as LegacyBankAccountOutput } from '@cyrrus/clientdatastructure'
import { ClientData, type ClientDataInput } from './ClientData'
import { type InvestmentParameterInput } from './InvestmentParameter'
import { type IdCardInformationInput } from './IdCardInformation'
import { type ContactInformationInput } from './ContactInformation'
import { type RepresentativeInput } from './Representative'
import { type CompanyInformationInput } from './CompanyInformation'
import { type ClientInformationInput } from './ClientInformation'
import { type BankAccountInput } from './BankAccount'

/**
 * Migration function from legacy ClientData (v8.2.1) to current version
 *
 * Key changes from v8.2.1:
 * - Removed InvestmentProfile and InvestmentService entities
 * - Only InvestmentParameter is retained in ClientInformation
 * - Field renames: dataOriginId→internalId, residency→isResident
 * - IdCard type values changed: 'OP'→'id', 'Pas'→'passport'
 * - ContactInformation: phonePassword field removed
 * - Representative: capitolId, capitolContactId, position fields removed; cytronId, contactId set to null
 * - InvestmentParameter: added→addedAt field renamed
 * - BankAccount: foreign→isForeign, capitolId removed, cytronId set to null, isConfirmedByAffidavit added (from client.bankAccountsConfirmedByAffidavit)
 * - ClientInformation: capitolId, brokerId, externalBrokerCapitolId, externalBrokerAgentCapitolId, crmId removed; contactId, brokerContactId, externalBrokerContactId, externalBrokerAgentContactId set to null
 * - New fields: preferredLanguage (mapped from legislation)
 * - Gender values unchanged (male, female, other)
 *
 * @param input Legacy ClientDataInput from @cyrrus/clientdatastructure v8.2.1
 * @returns Migrated ClientData instance compatible with current structure
 */
export function fromLegacyClientData(input: LegacyClientDataInput): ClientData {
    const legacyClientData = new LegacyClientData(input).toPlainObject()

    // Create a migrated input object for the current ClientData structure
    const migratedInput: Partial<ClientDataInput> = {
        client: migrateClientInformation(legacyClientData.client),
        personal: legacyClientData.personal, // PersonalInformation structure unchanged
        idCard: migrateIdCardInformation(legacyClientData.idCard),
        address: legacyClientData.address, // AddressInformation structure unchanged
        contact: migrateContactInformation(legacyClientData.contact),
        bankAccounts: migrateBankAccounts(legacyClientData.bankAccounts, legacyClientData.client.bankAccountsConfirmedByAffidavit),
        company: migrateCompanyInformation(legacyClientData.company)
    }

    return new ClientData(migratedInput)
}

/**
 * Migrates ClientInformation from legacy v8.2.1 to current structure
 * Field mappings:
 * - dataOriginId → internalId
 * - residency (boolean) → isResident (boolean)
 * - legislation → preferredLanguage
 * Fields removed from legacy: capitolId, brokerId, externalBrokerCapitolId, externalBrokerAgentCapitolId, crmId, bankAccountsConfirmedByAffidavit, investmentProfiles
 * New fields (set to null): contactId, brokerContactId, externalBrokerContactId, externalBrokerAgentContactId
 */
function migrateClientInformation({
    dataOriginId,
    residency,
    investmentParameters,
    legislation,
    capitolId: _capitolId,
    brokerId: _brokerId,
    externalBrokerCapitolId: _externalBrokerCapitolId,
    externalBrokerAgentCapitolId: _externalBrokerAgentCapitolId,
    crmId: _crmId,
    bankAccountsConfirmedByAffidavit: _bankAccountsConfirmedByAffidavit,
    investmentProfiles: _investmentProfiles,
    ...rest
}: LegacyClientInformationOutput): Partial<ClientInformationInput> {
    return {
        ...rest,
        internalId: dataOriginId,
        isResident: residency,
        preferredLanguage: legislation,
        investmentParameters: migrateInvestmentParameters(investmentParameters),
        contactId: null,
        brokerContactId: null,
        externalBrokerContactId: null,
        externalBrokerAgentContactId: null
    }
}

/**
 * Migrates investment parameters - field names unchanged but filters out profiles/services
 * Legacy investmentProfiles and investmentServices are dropped in the new structure
 * Field rename: added → addedAt
 */
function migrateInvestmentParameters(legacyParameters: LegacyInvestmentParameterOutput[]): Array<Partial<InvestmentParameterInput>> {
    return legacyParameters.map(({ added, ...rest }) => ({
        ...rest,
        addedAt: added
    }))
}

/**
 * Migrates IdCardInformation from legacy v8.2.1 to current structure
 * Value transformations:
 * - type 'OP' → 'id'
 * - type 'Pas' → 'passport'
 */
function migrateIdCardInformation(legacy: LegacyIdCardInformationOutput): Partial<IdCardInformationInput> {
    return {
        ...legacy,
        type: migrateIdCardType(legacy.type)
    }
}

/**
 * Migrates ID card type values from legacy to current enum
 * Legacy values: 'OP' (občanský průkaz), 'Pas' (passport)
 * Current values: 'id', 'passport'
 */
function migrateIdCardType(legacyType: string | null): string | null {
    if (legacyType === null) {
        return null
    }

    const typeMap: Record<string, string> = {
        'OP': 'id',
        'Pas': 'passport'
    }

    const mappedType = typeMap[legacyType]
    if (mappedType !== undefined) {
        return mappedType
    }

    return legacyType
}

/**
 * Migrates ContactInformation from legacy v8.2.1 to current structure
 * - phonePassword field removed (was in legacy, not in current)
 */
function migrateContactInformation({ email, phoneNumber }: LegacyContactInformationOutput): Partial<ContactInformationInput> {
    return { email, phoneNumber }
}

/**
 * Migrates BankAccount from legacy v8.2.1 to current structure
 * Field mappings:
 * - foreign → isForeign
 * Fields removed from legacy: capitolId
 * New fields (set to null or from client): cytronId (null), isConfirmedByAffidavit (from client.bankAccountsConfirmedByAffidavit)
 */
function migrateBankAccounts(legacyBankAccounts: LegacyBankAccountOutput[], bankAccountsConfirmedByAffidavit: boolean): Array<Partial<BankAccountInput>> {
    return legacyBankAccounts.map(({ foreign, capitolId: _capitolId, ...rest }) => ({
        ...rest,
        isForeign: foreign,
        cytronId: null,
        isConfirmedByAffidavit: bankAccountsConfirmedByAffidavit
    }))
}

/**
 * Migrates CompanyInformation from legacy v8.2.1 to current structure
 * - representatives array migrated with field transformations
 */
function migrateCompanyInformation(legacy: LegacyCompanyInformationOutput): Partial<CompanyInformationInput> {
    return {
        ...legacy,
        representatives: legacy.representatives.map(migrateRepresentative)
    }
}

/**
 * Migrates Representative from legacy v8.2.1 to current structure
 * Field mappings: None (fields are new in current structure)
 * Fields removed from legacy: capitolId, capitolContactId, position
 * New fields (set to null): cytronId, contactId
 * - contact structure unchanged (RepresentativeContactInformation has same structure as ContactInformation)
 */
function migrateRepresentative({ capitolId: _capitolId, capitolContactId: _capitolContactId, idCard, position: _position, ...rest }: LegacyRepresentativeOutput): Partial<RepresentativeInput> {
    return {
        ...rest,
        idCard: migrateIdCardInformation(idCard),
        cytronId: null,
        contactId: null
    }
}
