# CYRRUS Client Data Structure

TypeScript library providing normalized, serializable DTOs for client data (persons and companies) used in CYRRUS DocHub API and Cytron business core system integrations.

**Version**: 9.x (Cytron-compatible) | **Legacy**: [Version 8.x documentation](./README_v8_LEGACY.md)

## Installation

```bash
npm install @cyrrus/client-data-structure
```

## Quick Start

```typescript
import { ClientData } from '@cyrrus/client-data-structure'

// Create client data
const client = new ClientData({
    client: { type: 'person', isResident: true },
    personal: { firstName: 'John', lastName: 'Doe' },
    contact: { email: 'john@example.com' },
    address: { address: { street: '123 Main St', city: 'Prague' } },
    bankAccounts: []
})

// Serialize
const json = JSON.stringify(client)
const plain = client.toPlainObject()

// Validate (requires peer dependencies)
client.validate() // throws on error with details in error.cause
```

## Data Structure

`ClientData` contains seven main components:

| Component | Type | Usage | Key Fields |
|-----------|------|-------|------------|
| `client` | `ClientInformation` | System metadata | type, internalId, contactId, isResident, investmentParameters, brokerContactId |
| `personal` | `PersonalInformation` | Personal details | firstName, lastName, dateOfBirth, birthNumber, citizenship |
| `idCard` | `IdCardInformation` | ID document | number, type, issuedBy, validUntil |
| `address` | `AddressInformation` | Addresses | address (postal), mailingAddress, useMailingAddress |
| `contact` | `ContactInformation` | Communication | email, phoneNumber |
| `bankAccounts` | `BankAccount[]` | Bank accounts | accountNumber, bankCode, iban, swift, currency |
| `company` | `CompanyInformation` | Company data | name, ic, dic, lei, representatives[] |

**Client Types**: `person`, `company`, `selfemployed`
- **Person/Self-employed**: Uses `personal`, `idCard`
- **Company**: Uses `company` with `representatives[]` array

See `dataExamples/person.json` and `dataExamples/company.json` for complete examples.

## Validation

Validation is **opt-in** - install peer dependencies:

```bash
npm install ajv ajv-formats cdigit ibantools libphonenumber-js
```

All classes extend `AbstractBase` providing:
- `validate()` - Throws with validation errors in `error.cause`
- `toJSONSchema()` - Returns JSON Schema definition
- `toPlainObject()` / `toJSON()` - Serialization

## Architecture

### Immutable Classes
- Private readonly fields (`#field`) with public getters
- No setters - instances cannot be mutated after creation
- Constructor accepts `Partial<XInput>` with defaults

### Helper Functions
- `getStringOrNull()` - Normalizes strings, returns `null` for empty
- `getNormalizedDate()` - Parses dates to `YYYY-MM-DDTHH:MM:SS.SSSZ` format (noon UTC)
- `getInstanceOfClass()` - Handles both plain objects and class instances

### Type System
Each class exports three types:
- `XInput` - Constructor input (partial/optional fields)
- `XOutput` - Serialized output (plain object)
- `XJSONSchema` - JSON Schema type definition

## Migration from v8

Key breaking changes from version 8.x:

| Change Type | v8 | v9 | Location | Notes |
|-------------|----|----|----------|-------|
| **Field Rename** | `dataOriginId` | `internalId` | ClientInformation | |
| **Field Rename** | `residency` | `isResident` | ClientInformation | |
| **Field Rename** | `foreign` | `isForeign` | BankAccount | |
| **Field Rename** | `added` | `addedAt` | InvestmentParameter | |
| **Enum Value** | `'OP'` | `'id'` | IdCardInformation.type | |
| **Enum Value** | `'Pas'` | `'passport'` | IdCardInformation.type | |
| **Removed** | `capitolId` | *(removed)* | ClientInformation | Capitol → Cytron |
| **Removed** | `brokerId` | *(removed)* | ClientInformation | Capitol → Cytron |
| **Removed** | `externalBrokerCapitolId` | *(removed)* | ClientInformation | Capitol → Cytron |
| **Removed** | `externalBrokerAgentCapitolId` | *(removed)* | ClientInformation | Capitol → Cytron |
| **Removed** | `crmId` | *(removed)* | ClientInformation | Capitol → Cytron |
| **Removed** | `bankAccountsConfirmedByAffidavit` | *(removed)* | ClientInformation | Moved to BankAccount |
| **Removed** | `investmentProfiles` | *(removed)* | ClientInformation | Simplified structure |
| **Removed** | `capitolId` | *(removed)* | Representative | Capitol → Cytron |
| **Removed** | `capitolContactId` | *(removed)* | Representative | Capitol → Cytron |
| **Removed** | `position` | *(removed)* | Representative | |
| **Removed** | `capitolId` | *(removed)* | BankAccount | Capitol → Cytron |
| **Removed** | `phonePassword` | *(removed)* | ContactInformation | |
| **Added** | *(new)* | `contactId` | ClientInformation | Set to null |
| **Added** | *(new)* | `brokerContactId` | ClientInformation | Set to null |
| **Added** | *(new)* | `externalBrokerContactId` | ClientInformation | Set to null |
| **Added** | *(new)* | `externalBrokerAgentContactId` | ClientInformation | Set to null |
| **Added** | `legislation` | `preferredLanguage` | ClientInformation | Field renamed/remapped |
| **Added** | *(new)* | `cytronId` | Representative | Set to null |
| **Added** | *(new)* | `contactId` | Representative | Set to null |
| **Added** | *(new)* | `cytronId` | BankAccount | Set to null |
| **Added** | *(new)* | `isConfirmedByAffidavit` | BankAccount | From client.bankAccountsConfirmedByAffidavit |
| **Entity Removed** | `InvestmentProfile` | *(removed)* | - | Simplified to InvestmentParameter only |
| **Entity Removed** | `InvestmentService` | *(removed)* | - | No longer supported |

Use migration helper:
```typescript
import { fromLegacyClientData } from '@cyrrus/client-data-structure'

const v9Client = fromLegacyClientData(v8Data)
```

## Development

```bash
npm run build  # Build ESM + CJS + types to dist/
npm test       # Run Jest tests (builds test bundle first)
npm run docs   # Generate TypeDoc documentation
npm run lint   # ESLint with TypeScript strict rules
```

**Build Output**: Dual-format (ESM `.js` + CJS `.cjs`) with source maps and type definitions

## License

MIT