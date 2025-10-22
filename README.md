# CYRRUS Client Data Structure

## Introduction
This library is a TypeScript-based set of classes that represents client data structure designed for the **Cytron** business core system. It provides normalized, serializable DTOs for client information (both persons and companies) that can be used to communicate with CYRRUS DocHub API and other integrated systems.

**Current Version**: 9.x (Cytron-compatible)

> **Legacy Version Notice**: Version 8.x was designed for the legacy **Capitol** business core system and is now **deprecated**. 
> For documentation on version 8.x, see [README_v8_LEGACY.md](./README_v8_LEGACY.md).

## Version 9 - Cytron Integration

Version 9 represents a major refactoring of the library to align with the new Cytron business core system. Key changes from version 8 include:

### Breaking Changes from v8
- **Field renames**: `dataOriginId` → `internalId`, `residency` → `isResident`, `foreign` → `isForeign`
- **ID card type changes**: `'OP'` → `'id'`, `'Pas'` → `'passport'`
- **Removed fields**: `InvestmentProfile`, `InvestmentService`, `phonePassword` (from representatives), all Capitol-related ID fields (`capitolId`, `externalBrokerCapitolId`, `externalBrokerAgentCapitolId`)
- **ID system migration**: Capitol IDs have been completely removed and replaced with Cytron IDs

For detailed migration information, see `src/fromLegacyClientData.ts`.

## API Documentation
See the generated TypeDoc documentation in `./docs`

## Installation

```bash
npm install @cyrrus/client-data-structure
```

## Validation
The library provides built-in JSON Schema validation using AJV. Validation is **opt-in** and requires the following peer dependencies to be installed:

- `ajv` - JSON Schema validator
- `ajv-formats` - Format validation (email, date, etc.)
- `cdigit` - Check digit validation
- `ibantools` - IBAN validation
- `libphonenumber-js` - Phone number validation

### Usage Example

```typescript
import { ClientData } from '@cyrrus/client-data-structure'

const clientData = new ClientData({
    client: { type: 'person', /* ... */ },
    personal: { firstName: 'John', lastName: 'Doe', /* ... */ },
    // ... other fields
})

// Validation (throws on error)
try {
    clientData.validate()
    console.log('Valid client data')
} catch (error) {
    console.error('Validation errors:', error.cause)
}

// Serialization
const plainObject = clientData.toPlainObject()
const jsonString = JSON.stringify(clientData)
```

## Data Structure

The `ClientData` class is the root class with the following main components:

### Core Components

- **`client`** - `ClientInformation` - System metadata and investment parameters
  - Client type (person/company/self-employed)
  - Data origin and internal IDs
  - Cytron ID, CRM ID
  - Investment parameters and categories
  - Residency and economic sector information
  - Broker assignments

- **`personal`** - `PersonalInformation` - Personal details (for persons and self-employed)
  - Names and titles (prenominal, firstName, lastName, postnominal)
  - Birth information (dateOfBirth, birthNumber, placeOfBirth)
  - Tax domicile and citizenship
  - Gender and politician status

- **`idCard`** - `IdCardInformation` - Identification document details
  - Document number, type (id/passport/etc.)
  - Issuing authority and country
  - Validity date
  - Scan permissions

- **`address`** - `AddressInformation` - Postal and mailing addresses
  - Primary address (recipient, street, city, country, postal code)
  - Optional mailing address
  - Flag for using mailing address as postal

- **`contact`** - `ContactInformation` - Communication details
  - Email address
  - Phone number

- **`bankAccounts`** - `BankAccount[]` - Bank account information
  - Domestic accounts (prefix, account number, bank code)
  - Foreign accounts (IBAN, SWIFT, bank details)
  - Currency and account holder information

- **`company`** - `CompanyInformation` - Company-specific data (for companies)
  - Company identification (IC, DIC, LEI)
  - Company name and tax domicile
  - Array of `Representative` objects with personal details, positions, and ownership information

### Data Examples

For complete data structure examples for both persons and companies, see:
- `dataExamples/person.json` - Example person client data
- `dataExamples/company.json` - Example company client data with representatives

## Architecture

### Class Design Principles

All data classes extend `AbstractBase` which provides:
- **JSON Schema generation** via `toJSONSchema()`
- **AJV validation** via `validate()` (throws errors with `_errors` array populated)
- **Immutable instances** - All fields are private readonly (`#field` syntax) with public getters
- **Serialization** - `toPlainObject()` and `toJSON()` methods

### Constructor Pattern

Every class accepts partial inputs with defaults and uses helper functions for type safety:

```typescript
constructor(input: Partial<XInput> = {}) {
    super()
    const { field1, field2 } = input
    this.#field1 = getStringOrNull(field1)
    this.#field2 = getInstanceOfClass<SomeClass>(field2, SomeClass)
}
```

### Type Definitions

Each class has three type definitions:
- `XInput` - Constructor input (all fields optional)
- `XOutput` - Serialized plain object output
- `XJSONSchema` - JSON Schema structure for validation

## Migrating from Version 8

If you're upgrading from version 8.x, the library provides a migration utility:

```typescript
import { fromLegacyClientData } from '@cyrrus/client-data-structure'

const v8Data = { /* version 8 structure */ }
const v9Data = fromLegacyClientData(v8Data)
```

**Note**: Capitol-related ID fields are removed during migration as they have been replaced with Cytron IDs in the new system.

## Development

```bash
# Build the library
npm run build

# Run tests
npm test

# Generate documentation
npm run docs

# Lint code
npm run lint
```

## License

See LICENSE file for details.