---
name: gortex-src-1-dirs-jsonschema
description: "Work in the src +1 dirs · JSONSchema area — 19 symbols across 13 files (91% cohesion)"
---

# src +1 dirs · JSONSchema

19 symbols | 13 files | 91% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/AbstractBase.ts`
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
| `` | values |
| `src/AbstractBase.ts` | JSONSchemaObject, JSONSchemaType, JSONSchema |
| `src/Address.ts` | AddressJSONSchema |
| `src/AddressInformation.ts` | AddressInformationJSONSchema |
| `src/BankAccount.ts` | toJSONSchema, BankAccountJSONSchema |
| `src/ClientData.ts` | ClientDataJSONSchema |
| `src/ClientInformation.ts` | ClientInformationJSONSchema |
| `src/CompanyInformation.ts` | CompanyInformationJSONSchema |
| `src/ContactInformation.ts` | ContactInformationJSONSchema |
| `src/IdCardInformation.ts` | IdCardInformationJSONSchema, toJSONSchema |
| `src/InvestmentParameter.ts` | InvestmentParameterJSONSchema |
| `src/PersonalInformation.ts` | toJSONSchema, PersonalInformationJSONSchema |
| `src/Representative.ts` | RepresentativeJSONSchema, toJSONSchema |

## Entry Points

- `src/IdCardInformation.ts::IdCardInformation.toJSONSchema`
- `src/PersonalInformation.ts::PersonalInformation.toJSONSchema`
- `src/BankAccount.ts::BankAccount.toJSONSchema`

## How to Explore

```
analyze(operation:"communities", id:"community-7")
explore(operation:"context", task:"understand src +1 dirs · JSONSchema", format:"gcx")
relations(operation:"usages", target:{symbol:"src/IdCardInformation.ts::IdCardInformation.toJSONSchema"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
