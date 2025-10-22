# CYRRUS Client Data Structure - AI Coding Agent Instructions

## Instructions Usage
This library is used by the dochub-nsure monorepo and other CYRRUS systems. When working in projects that depend on this library, combine these instructions with project-specific ones.

Code may contain `/** <COPILOT_INSTRUCTION> ... </COPILOT_INSTRUCTION> */` blocks - always consider those instructions for the specific file context.

## Project Overview
This is a **TypeScript library** for representing client data structures used in CYRRUS DocHub API integrations. It provides normalized, serializable DTOs for client information (both persons and companies) with built-in JSON Schema validation using AJV.

**Package Type**: Dual-format (ESM + CJS) TypeScript library with full type definitions

## Architecture & Key Patterns

### Class Hierarchy
All data classes extend `AbstractBase` which provides:
- JSON Schema generation via `toJSONSchema()` 
- AJV validation via `validate()` (throws errors with `_errors` array populated)
- Private readonly fields (using `#field` syntax) with public getters
- Immutable instances - no setters allowed

### Constructor Pattern
Every class follows this pattern:
```typescript
constructor(input: Partial<XInput> = {}) {
    super()
    const { field1, field2 } = input
    this.#field1 = getStringOrNull(field1)
    this.#field2 = getInstanceOfClass<SomeClass>(field2, SomeClass)
}
```
- Always accept partial inputs with defaults
- Use helper functions: `getStringOrNull()`, `getNormalizedDate()`, `getInstanceOfClass()`
- Nested classes are instantiated via `getInstanceOfClass()` to handle both plain objects and class instances

### Input/Output Types
Every class has three type definitions:
- `XInput` - constructor input (all fields optional)
- `XOutput` - serialized plain object output
- `XJSONSchema` - JSON Schema structure for validation

### Validation
- Validation is **opt-in** via peer dependencies (ajv, ajv-formats, cdigit, ibantools, libphonenumber-js)
- Call `validate()` to trigger - it throws with validation errors in `error.cause`
- Date fields are normalized to `YYYY-MM-DDTHH:MM:SS.SSSZ` before validation
- JSON Schema uses conditional logic (if/then/else) for client type-specific validation (person vs company)

### Client Data Structure
`ClientData` is the root class with 7 main components:
- `client` - ClientInformation (system metadata, investment parameters)
- `personal` - PersonalInformation (name, birth info, citizenship)
- `idCard` - IdCardInformation (document details)
- `address` - AddressInformation (postal + mailing addresses)
- `contact` - ContactInformation (email, phone)
- `bankAccounts` - BankAccount[] (account details)
- `company` - CompanyInformation (company details + representatives[])

**Type-specific fields**: Companies use `company` with `representatives[]`, persons/self-employed use `personal` and `idCard`.

## Development Workflows

### Building
```bash
npm run build  # tsup builds ESM + CJS + .d.ts files to dist/
npm run docs   # Generate TypeDoc documentation
```
- Outputs to `dist/`: `.js` (ESM), `.cjs` (CJS), `.d.ts` (types)
- Source maps generated
- Code is minified
- **Critical for monorepos**: Dependent apps/packages use compiled `/dist` outputs, not source files

### Testing
```bash
npm test  # runs testBuild.mjs then Jest
```
- **Pre-test**: `testBuild.mjs` uses esbuild to bundle `src/index.ts` → `test/client-data-structure.cjs`
- Tests import from bundled CJS file (not source)
- Test pattern: Create instances → serialize → deserialize → compare equality
- Mock data in `test/mock/` provides validation test cases

### Linting
```bash
npm run lint
```
- Uses TypeScript ESLint with strict type checking
- Stylistic rules: 4-space indent, no semicolons, 1tbs braces
- `@typescript-eslint/explicit-function-return-type` enforced (except expressions)

## Key Conventions

### Date Handling
- All dates stored as `Date` objects internally
- Use `getNormalizedDate()` to parse - ensures `12:00:00.000Z` time
- Serialized as ISO strings via `toJSON()`
- Test files expect `YYYY-MM-DDTHH:MM:SS.SSSZ` format

### Null vs Undefined
- **Never use `undefined`** in outputs - use `null` for empty values
- Input fields can be optional/undefined
- `getStringOrNull()` converts empty strings, undefined, null → `null`

### Static Constants
Export constants for plain object keys:
```typescript
static get PLAIN_OBJECT_KEY_FIELD() { return 'field' }
```
This provides type-safe key access: `ClientData.PLAIN_OBJECT_KEY_CLIENT`

### Legacy Migration
`fromLegacyClientData.ts` migrates from v8.2.1 → v9.0.0:
- Field renames: `dataOriginId→internalId`, `residency→isResident`, `foreign→isForeign`
- ID card type changes: `'OP'→'id'`, `'Pas'→'passport'`
- Removed: InvestmentProfile, InvestmentService, phonePassword
- Capitol IDs → Cytron IDs (set to null in migration)

## Important Notes

### Representative vs Person
- `Representative` is for company representatives (no ContactInformation.phonePassword)
- `PersonalInformation` is reused in both `ClientData.personal` and `Representative.personal`

### Data Examples
See `dataExamples/person.json` and `dataExamples/company.json` for complete structure examples

### Capitol Web Service Mapping
README.md contains detailed mapping to Capitol API calls (GetClient.dll methods) - reference when integrating with external systems

## Common Pitfalls
- Don't validate without peer dependencies installed - calls will fail
- Don't mutate instances after creation - all fields are readonly
- Don't forget to bundle test file before running Jest (`testBuild.mjs` runs automatically with `npm test`)
- Date parsing: always use helper functions, not raw `new Date()`
- JSON Schema validation happens on plain objects, not class instances - use `toPlainObject()` first
- In monorepo contexts, ensure this package is built before dependent apps (`npm run build` in this package)

## Writing Testable Code

### Testing Philosophy
This library demonstrates testable patterns that should be followed when extending:

```typescript
// ✅ Good - Pure transformation functions
export function getStringOrNull(input: unknown): string | null {
    // Pure logic, easily testable
}

// ✅ Good - Immutable data structures with clear contracts
class ClientData extends AbstractBase {
    readonly #field: Type
    get field(): Type { return this.#field }
}

// ✅ Good - Dependency injection for validation
constructor(input: Partial<XInput> = {}) {
    // Accepts partial inputs, uses helper functions
}
```

### Testable Patterns Used Here
- **Pure helper functions** in `helpers.ts` for data transformation
- **Immutable classes** with readonly fields prevent side effects
- **Type-safe interfaces** define clear Input/Output contracts
- **Validation separation** via AbstractBase with opt-in peer dependencies
- **Serialization/deserialization** cycle ensures data integrity

## Code Style & Conventions

### General Guidelines
- **No semicolons** - ESLint enforces semicolon-free style
- **4-space indentation** - Stylistic plugin enforces consistent spacing
- **1tbs brace style** - Opening brace on same line
- **Explicit return types** - Required on all functions except expressions (`@typescript-eslint/explicit-function-return-type`)
- **Private fields** - Use `#field` syntax with public getters only
- **Null over undefined** - All outputs must use `null`, never `undefined`

### TypeScript Specifics
```typescript
// ✅ Correct - Explicit return type
function getData(): string | null {
    return getStringOrNull(value)
}

// ✅ Correct - Private field with getter
class Example {
    readonly #name: string | null = null
    get name(): string | null { return this.#name }
}

// ❌ Wrong - Missing return type
function getData() {
    return value
}

// ❌ Wrong - Using undefined in output
toJSON(): Output {
    return { field: undefined } // Should be null
}
```

### Generated Files Warning
**Never edit generated files** - they are overwritten by build processes:
- `dist/**/*` - All compiled outputs from tsup
- Type definition files regenerated on each build

## Cost-Effective AI Agent Usage

### Best Practices for This Library

#### **Batch Related Changes**
- When adding new fields to classes, update Input/Output/JSONSchema types together
- Handle validation rules, type definitions, and tests in the same session
- Update related classes together (e.g., ClientData + Representative + CompanyInformation)

#### **Provide Comprehensive Context**
- Include relevant class files when asking about structure changes
- Show existing patterns from similar classes before requesting new ones
- Reference test patterns from `test/` directory for validation examples

#### **Use Specific, Actionable Requests**
- "Add `middleName` field to PersonalInformation following the existing pattern for `firstName`"
- "Create new BankAccountType class with validation, following BankAccount pattern"
- Include type requirements: "field should be string | null with validation for email format"

#### **Leverage Existing Patterns**
- Use `grep_search` to find similar implementations before asking
- Reference helper functions (`getStringOrNull`, `getNormalizedDate`, `getInstanceOfClass`)
- Check existing JSON Schema patterns in other classes for conditional validation

#### **Optimize Follow-ups**
- Include full validation error output when debugging
- Request complete class implementation rather than incremental additions
- Use "follow the pattern in X class" to leverage existing code structure
