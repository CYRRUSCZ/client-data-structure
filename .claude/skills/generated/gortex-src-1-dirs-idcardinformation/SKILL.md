---
name: gortex-src-1-dirs-idcardinformation
description: "Work in the src +1 dirs · IdCardInformation area — 28 symbols across 2 files (77% cohesion)"
---

# src +1 dirs · IdCardInformation

28 symbols | 2 files | 77% cohesion

## When to Use

Use this skill when working on files in:
- `src/IdCardInformation.ts`
- `test/mock/idCardInformationValidations.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/IdCardInformation.ts` | toPlainObject, validity, localizedCountryName, plain, locale, ... |
| `test/mock/idCardInformationValidations.ts` | TestCase |

## Entry Points

- `src/IdCardInformation.ts::IdCardInformation.countryName`
- `src/IdCardInformation.ts::IdCardInformation.localizedCountryName`

## How to Explore

```
analyze(operation:"communities", id:"community-11")
explore(operation:"context", task:"understand src +1 dirs · IdCardInformation", format:"gcx")
relations(operation:"usages", target:{symbol:"src/IdCardInformation.ts::IdCardInformation.countryName"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
