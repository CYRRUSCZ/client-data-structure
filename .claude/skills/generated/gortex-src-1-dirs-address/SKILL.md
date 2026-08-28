---
name: gortex-src-1-dirs-address
description: "Work in the src +1 dirs · Address area — 29 symbols across 4 files (72% cohesion)"
---

# src +1 dirs · Address

29 symbols | 4 files | 72% cohesion

## When to Use

Use this skill when working on files in:
- `src/Address.ts`
- `src/AddressInformation.ts`
- `test/mock/addressInformationValidations.ts`
- `test/mock/addressValidations.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/Address.ts` | AddressInput, Address, AddressOutput, country, street, ... |
| `src/AddressInformation.ts` | AddressInformationInput, mailingAddress, address |
| `test/mock/addressInformationValidations.ts` | TestCase |
| `test/mock/addressValidations.ts` | TestCase |

## Entry Points

- `src/Address.ts::Address.countryName`

## How to Explore

```
analyze(operation:"communities", id:"community-1")
explore(operation:"context", task:"understand src +1 dirs · Address", format:"gcx")
relations(operation:"usages", target:{symbol:"src/Address.ts::Address.countryName"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
