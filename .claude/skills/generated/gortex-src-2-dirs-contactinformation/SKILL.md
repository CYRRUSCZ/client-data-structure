---
name: gortex-src-2-dirs-contactinformation
description: "Work in the src +2 dirs · ContactInformation area — 36 symbols across 6 files (71% cohesion)"
---

# src +2 dirs · ContactInformation

36 symbols | 6 files | 71% cohesion

## When to Use

Use this skill when working on files in:
- `src/ContactInformation.ts`
- `src/Interfaces/JsonSchemaAware.ts`
- `src/Interfaces/ValidationAware.ts`
- `src/helpers.ts`
- `test/mock/contactInformationValidations.ts`
- `test/mock/representativeContactInformationValidations.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/ContactInformation.ts` | phoneNumber, constructor, error, phoneNumber, plainObject, ... |
| `src/Interfaces/JsonSchemaAware.ts` | JSONSchemaAware |
| `src/Interfaces/ValidationAware.ts` | ValidationAware |
| `src/helpers.ts` | SupportedClasses |
| `test/mock/contactInformationValidations.ts` | TestCase |
| `test/mock/representativeContactInformationValidations.ts` | TestCase |

## Entry Points

- `src/ContactInformation.ts::ContactInformation.constructor`
- `src/ContactInformation.ts::ContactInformation.validate`
- `src/ContactInformation.ts::ContactInformation.validatePhoneNumber`

## Connected Communities

- **src +1 dirs · compareWith** (3 cross-edges)
- **src +1 dirs · getStringOrNull** (2 cross-edges)
- **src +1 dirs · validateBirthNumber** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-10")
explore(operation:"context", task:"understand src +2 dirs · ContactInformation", format:"gcx")
relations(operation:"usages", target:{symbol:"src/ContactInformation.ts::ContactInformation.constructor"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
