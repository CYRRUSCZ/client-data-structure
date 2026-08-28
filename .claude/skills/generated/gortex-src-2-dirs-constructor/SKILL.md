---
name: gortex-src-2-dirs-constructor
description: "Work in the src +2 dirs · constructor area — 48 symbols across 6 files (79% cohesion)"
---

# src +2 dirs · constructor

48 symbols | 6 files | 79% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/CompanyInformation.ts`
- `src/Representative.ts`
- `src/fromLegacyClientData.ts`
- `src/helpers.ts`
- `test/mock/companyInformationValidations.ts`

## Key Files

| File | Symbols |
|------|---------|
| `` | toUpperCase |
| `src/CompanyInformation.ts` | CompanyInformation, lei, create, representatives, dic, ... |
| `src/Representative.ts` | RepresentativeInput |
| `src/fromLegacyClientData.ts` | typeMap, legacy, migrateIdCardInformation, migrateIdCardType, mappedType, ... |
| `src/helpers.ts` | sanitized, input, getLegalIdOrNull |
| `test/mock/companyInformationValidations.ts` | TestCase |

## Entry Points

- `src/CompanyInformation.ts::CompanyInformation.constructor`
- `src/fromLegacyClientData.ts::migrateRepresentative`

## Connected Communities

- **src +1 dirs · compareWith** (3 cross-edges)
- **src +1 dirs · getStringOrNull** (2 cross-edges)
- **src +1 dirs · validateBirthNumber** (2 cross-edges)
- **. +1 dirs** (1 cross-edges)
- **src · constructor** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-9")
explore(operation:"context", task:"understand src +2 dirs · constructor", format:"gcx")
relations(operation:"usages", target:{symbol:"src/CompanyInformation.ts::CompanyInformation.constructor"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
