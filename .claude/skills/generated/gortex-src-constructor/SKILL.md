---
name: gortex-src-constructor
description: "Work in the src · constructor area — 64 symbols across 3 files (81% cohesion)"
---

# src · constructor

64 symbols | 3 files | 81% cohesion

## When to Use

Use this skill when working on files in:
- `src/ClientData.ts`
- `src/Representative.ts`
- `src/helpers.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/ClientData.ts` | company, client, bankAccounts, contact, idCard, ... |
| `src/Representative.ts` | idCard, hasPowerOfAttorney, create, _id, address, ... |
| `src/helpers.ts` | input, getInstanceOfClass, T, isESClass, ClassInstancePrototype, ... |

## Entry Points

- `src/ClientData.ts::ClientData.constructor`
- `src/Representative.ts::Representative.constructor`

## Connected Communities

- **src +1 dirs · getStringOrNull** (2 cross-edges)
- **src +1 dirs · validateBirthNumber** (1 cross-edges)
- **src +1 dirs · compareWith** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-14")
explore(operation:"context", task:"understand src · constructor", format:"gcx")
relations(operation:"usages", target:{symbol:"src/ClientData.ts::ClientData.constructor"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
