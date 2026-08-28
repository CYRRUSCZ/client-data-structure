---
name: gortex-src-1-dirs-validatebirthnumber
description: "Work in the src +1 dirs · validateBirthNumber area — 38 symbols across 3 files (75% cohesion)"
---

# src +1 dirs · validateBirthNumber

38 symbols | 3 files | 75% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/PersonalInformation.ts`
- `src/helpers.ts`

## Key Files

| File | Symbols |
|------|---------|
| `` | assign, replace, split, isArray, reduce, ... |
| `src/PersonalInformation.ts` | birthNumberCountryCode, errorMessage, c, birthNumberToValidate, date, ... |
| `src/helpers.ts` | data, throwInvalid, getNormalizedDate, inputDate, date, ... |

## Entry Points

- `src/PersonalInformation.ts::PersonalInformation.validateBirthNumber`
- `src/helpers.ts::transformDataBeforeValidation`
- `src/PersonalInformation.ts::PersonalInformation.validate`

## Connected Communities

- **src +1 dirs · compareWith** (5 cross-edges)
- **src · PersonalInformation** (1 cross-edges)
- **src +2 dirs · constructor** (1 cross-edges)
- **. +1 dirs** (1 cross-edges)
- **src +1 dirs · getStringOrNull** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-17")
explore(operation:"context", task:"understand src +1 dirs · validateBirthNumber", format:"gcx")
relations(operation:"usages", target:{symbol:"src/PersonalInformation.ts::PersonalInformation.validateBirthNumber"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
