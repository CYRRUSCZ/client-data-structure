---
name: gortex-src-personalinformation
description: "Work in the src · PersonalInformation area — 56 symbols across 2 files (80% cohesion)"
---

# src · PersonalInformation

56 symbols | 2 files | 80% cohesion

## When to Use

Use this skill when working on files in:
- `src/PersonalInformation.ts`
- `src/enums.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/PersonalInformation.ts` | taxDomicile, create, PersonalInformation, prenominal, personalInformation, ... |
| `src/enums.ts` | en_US, hr_HR, cs_CZ, AvailableLanguages, sk_SK |

## Entry Points

- `src/PersonalInformation.ts::PersonalInformation.fullName`
- `src/PersonalInformation.ts::PersonalInformation.birthNumberCountryName`
- `src/PersonalInformation.ts::PersonalInformation.citizenshipCountryName`
- `src/PersonalInformation.ts::PersonalInformation.localizedBirthNumberCountryName`
- `src/PersonalInformation.ts::PersonalInformation.localizedCitizenshipCountryName`

## Connected Communities

- **src +1 dirs · compareWith** (2 cross-edges)
- **. +1 dirs** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-13")
explore(operation:"context", task:"understand src · PersonalInformation", format:"gcx")
relations(operation:"usages", target:{symbol:"src/PersonalInformation.ts::PersonalInformation.fullName"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
