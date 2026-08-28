---
name: gortex-src-1-dirs-comparewith
description: "Work in the src +1 dirs · compareWith area — 132 symbols across 12 files (83% cohesion)"
---

# src +1 dirs · compareWith

132 symbols | 12 files | 83% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/Address.ts`
- `src/AddressInformation.ts`
- `src/BankAccount.ts`
- `src/ClientData.ts`
- `src/ClientInformation.ts`
- `src/CompanyInformation.ts`
- `src/ContactInformation.ts`
- `src/IdCardInformation.ts`
- `src/InvestmentParameter.ts`
- `src/PersonalInformation.ts`
- `src/Representative.ts`

## Key Files

| File | Symbols |
|------|---------|
| `` | entries, filter, keys, includes, map, ... |
| `src/Address.ts` | fullAddress, compareWith, current, passedEntries, currentEntries, ... |
| `src/AddressInformation.ts` | differences, compareWith |
| `src/BankAccount.ts` | input, modifiedValue, compareWith, toJSON, current, ... |
| `src/ClientData.ts` | ClientDataDifference, differences, modifiedValue, currentEntries, current, ... |
| `src/ClientInformation.ts` | modifiedKey, modifiedValue, ownKeys, currentEntries, investmentCategories, ... |
| `src/CompanyInformation.ts` | modifiedValue, ownKeys, modifiedKey, differences, passedEntries, ... |
| `src/ContactInformation.ts` | currentEntries, current, compareWith, currentValue, modifiedKey, ... |
| `src/IdCardInformation.ts` | ownKeys, modifiedValue, currentEntries, modifiedKey, currentDate, ... |
| `src/InvestmentParameter.ts` | differences, modifiedKey, ownKeys, modifiedValue, address, ... |
| `src/PersonalInformation.ts` | current, ownKeys, modifiedValue, currentDate, modifiedDate, ... |
| `src/Representative.ts` | modifiedKey, currentEntries, passedEntries, compareWith, ownKeys, ... |

## Entry Points

- `src/Address.ts::Address.fullAddress`
- `src/IdCardInformation.ts::IdCardInformation.compareWith`
- `src/ClientData.ts::ClientData.compareWith`
- `src/PersonalInformation.ts::PersonalInformation.compareWith`
- `src/ClientInformation.ts::ClientInformation.investmentCategories`

## Connected Communities

- **src +1 dirs · validateBirthNumber** (8 cross-edges)
- **src · ClientData** (2 cross-edges)
- **src +1 dirs · ClientInformation** (2 cross-edges)
- **src +2 dirs · constructor** (2 cross-edges)
- **src +2 dirs · ContactInformation** (2 cross-edges)
- **src +1 dirs · InvestmentParameter** (2 cross-edges)
- **src · PersonalInformation** (2 cross-edges)
- **src +1 dirs · Address** (2 cross-edges)
- **src +1 dirs · create** (2 cross-edges)
- **src +1 dirs · IdCardInformation** (2 cross-edges)
- **src · constructor** (2 cross-edges)
- **. +1 dirs** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-5")
explore(operation:"context", task:"understand src +1 dirs · compareWith", format:"gcx")
relations(operation:"usages", target:{symbol:"src/Address.ts::Address.fullAddress"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
