---
name: gortex-src-addressinformation
description: "Work in the src · AddressInformation area — 22 symbols across 1 files (81% cohesion)"
---

# src · AddressInformation

22 symbols | 1 files | 81% cohesion

## When to Use

Use this skill when working on files in:
- `src/AddressInformation.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/AddressInformation.ts` | address, plain, fromPlainObject, plainObject, ADDRESS_TYPE_REGULAR, ... |

## How to Explore

```
analyze(operation:"communities", id:"community-3")
explore(operation:"context", task:"understand src · AddressInformation", format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
