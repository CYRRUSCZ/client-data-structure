---
name: gortex-src-supportedidcardtypes
description: "Work in the src · SupportedIdCardTypes area — 5 symbols across 1 files (100% cohesion)"
---

# src · SupportedIdCardTypes

5 symbols | 1 files | 100% cohesion

## When to Use

Use this skill when working on files in:
- `src/enums.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/enums.ts` | id_card, SupportedIdCardTypes, other, driver_license, passport |

## How to Explore

```
analyze(operation:"communities", id:"community-16")
explore(operation:"context", task:"understand src · SupportedIdCardTypes", format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
