# Client Data Structure Agent Instructions

## Scope And Sources Of Truth

Apply these instructions throughout this repository. Apply any file-local `<COPILOT_INSTRUCTION>` block as a more specific rule.

Use the owning files for volatile facts:

- `package.json` for scripts, exports, dependencies, and versions
- `tsdown.config.ts`, `jest.config.ts`, and `eslint.config.ts` for tool behavior
- source and focused tests for runtime behavior
- `README_v8_LEGACY.md` and `src/fromLegacyClientData.ts` for legacy migration behavior

This package is consumed by DocHub and other systems, but its consumers may use compiled package exports or custom development aliases. Inspect the consumer configuration instead of assuming source or `dist` consumption.

## Package Model

`@cyrrus/client-data-structure` is an immutable TypeScript DTO library for person and company client data. It publishes dual ESM/CJS JavaScript and matching declaration files.

Most data classes:

- extend `AbstractBase`
- accept a partial input object with a default empty object
- normalize missing scalar values to `null`
- store private readonly fields and expose getters
- define matching `Input`, `Output`, and JSON Schema types
- instantiate nested DTOs through helpers such as `getInstanceOfClass`

Follow the nearest existing class rather than assuming every class has identical fields or validation rules.

## Commands

Use the scripts declared in `package.json`:

```bash
npm run build
npm test
npm run lint
npm run docs
```

- `npm run build` uses tsdown to create ESM, CJS, source maps, and declarations in `dist/`.
- The current build is not minified.
- `npm test` runs Jest; `ts-jest` transforms TypeScript directly. There is no pre-test bundle step.
- Tests import source modules and use fixtures under `test/mock/`.

Run a focused Jest test first when possible, then lint and build when public types or package exports change.

## Serialization And Validation

- Outputs use `null`, not `undefined`, for absent values.
- Use the existing normalization helpers instead of ad hoc coercion.
- Date fields use `getNormalizedDate`, which normalizes valid dates to noon UTC before ISO serialization.
- `toPlainObject()` is the serialized representation used for schema validation and transport.
- `validate()` performs AJV validation and throws with validation details attached as the error cause.
- Validation dependencies are peer dependencies at runtime; do not silently bundle or replace them.
- Preserve conditional JSON Schema rules for person, self-employed, and company variants.

When adding or changing a field, update the constructor normalization, private field/getter, input/output types, plain-object serialization, JSON Schema, key constant where that class uses them, examples if applicable, and focused tests.

## Type And Export Rules

- Use explicit return types as required by ESLint.
- Preserve four-space indentation, semicolon-free style, and existing brace conventions.
- Use `export type` for interfaces and type aliases in barrel files; tsdown must not emit type-only names as runtime exports.
- Preserve both import and require conditions in `package.json` exports when adding a public subpath.
- Do not expose `undefined` in serialized output types.

## Legacy Migration

`fromLegacyClientData` is the one-way v8-to-v9 migration boundary. Keep migration behavior aligned with its focused tests and legacy type package.

Important invariants include:

- legacy Capitol identifiers are not carried into v9 fields
- new Cytron/contact identifiers initialize to `null`
- client-level bank-account affidavit confirmation moves to each migrated account
- renamed fields and ID-card enum values are converted explicitly
- migration does not imply a supported v9-to-v8 conversion

Do not expand migration behavior from prose alone; verify the legacy source type and the migration implementation.

## Generated Files And Validation

Do not edit `dist/`, generated declarations, source maps, or generated TypeDoc output directly. Regenerate them with the owning script.

After changes, run the cheapest relevant check:

1. Focused Jest test
2. `npm test` for model or migration changes
3. `npm run lint`
4. `npm run build` for public API or export changes

Do not fix unrelated failures as part of a focused change; report them separately.

<!-- gortex:communities:start -->
## Community Skills

| Area | Description | Explore |
|------|-------------|---------|
| Src 1 Dirs Comparewith | 132 symbols | `analyze(operation:"communities", id:"community-5")` |
| Src 1 Dirs Getstringornull | 67 symbols | `analyze(operation:"communities", id:"community-18")` |
| Src Clientdata | 64 symbols | `analyze(operation:"communities", id:"community-6")` |
| Src Constructor | 64 symbols | `analyze(operation:"communities", id:"community-14")` |
| Src Personalinformation | 56 symbols | `analyze(operation:"communities", id:"community-13")` |
| Src 2 Dirs Constructor | 48 symbols | `analyze(operation:"communities", id:"community-9")` |
| Src 1 Dirs Investmentparameter | 46 symbols | `analyze(operation:"communities", id:"community-12")` |
| Src 1 Dirs Clientinformation | 41 symbols | `analyze(operation:"communities", id:"community-8")` |
| Src 1 Dirs Validatebirthnumber | 38 symbols | `analyze(operation:"communities", id:"community-17")` |
| Src 1 Dirs Create | 37 symbols | `analyze(operation:"communities", id:"community-4")` |
| Src 2 Dirs Contactinformation | 36 symbols | `analyze(operation:"communities", id:"community-10")` |
| Src 1 Dirs Address | 29 symbols | `analyze(operation:"communities", id:"community-1")` |
| Src 1 Dirs Idcardinformation | 28 symbols | `analyze(operation:"communities", id:"community-11")` |
| Src Addressinformation | 22 symbols | `analyze(operation:"communities", id:"community-3")` |
| Src 1 Dirs Jsonschema | 19 symbols | `analyze(operation:"communities", id:"community-7")` |
| Community 0 | 7 symbols | `analyze(operation:"communities", id:"community-0")` |
| 1 Dirs | 7 symbols | `analyze(operation:"communities", id:"community-2")` |
| Src Supportedidcardtypes | 5 symbols | `analyze(operation:"communities", id:"community-16")` |
| Src Supportedgenderoptions | 4 symbols | `analyze(operation:"communities", id:"community-15")` |

<!-- gortex:communities:end -->
