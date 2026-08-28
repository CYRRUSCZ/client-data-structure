---
name: gortex-src-1-dirs-getstringornull
description: "Work in the src +1 dirs · getStringOrNull area — 67 symbols across 7 files (75% cohesion)"
---

# src +1 dirs · getStringOrNull

67 symbols | 7 files | 75% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/Address.ts`
- `src/BankAccount.ts`
- `src/ClientInformation.ts`
- `src/IdCardInformation.ts`
- `src/PersonalInformation.ts`
- `src/helpers.ts`

## Key Files

| File | Symbols |
|------|---------|
| `` | stringify |
| `src/Address.ts` | input, constructor, country, streetNumber, postalCode, ... |
| `src/BankAccount.ts` | id, constructor, iban, code, account, ... |
| `src/ClientInformation.ts` | instance, type, investmentParameters, externalBrokerContactId, brokerContactId, ... |
| `src/IdCardInformation.ts` | issuedBy, country, type, constructor, number, ... |
| `src/PersonalInformation.ts` | citizenship, lastName, input, taxDomicile, birthNumber, ... |
| `src/helpers.ts` | input, sanitized, output, getStringOrNull, input, ... |

## Entry Points

- `src/ClientInformation.ts::ClientInformation.constructor`
- `src/PersonalInformation.ts::PersonalInformation.constructor`
- `src/BankAccount.ts::BankAccount.constructor`
- `src/Address.ts::Address.constructor`
- `src/IdCardInformation.ts::IdCardInformation.constructor`

## Connected Communities

- **src +1 dirs · validateBirthNumber** (3 cross-edges)
- **src +2 dirs · constructor** (2 cross-edges)
- **. +1 dirs** (2 cross-edges)
- **src +1 dirs · compareWith** (1 cross-edges)
- **src · constructor** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-18")
explore(operation:"context", task:"understand src +1 dirs · getStringOrNull", format:"gcx")
relations(operation:"usages", target:{symbol:"src/ClientInformation.ts::ClientInformation.constructor"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
