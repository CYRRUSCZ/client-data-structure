---
name: gortex-src-clientdata
description: "Work in the src · ClientData area — 64 symbols across 2 files (82% cohesion)"
---

# src · ClientData

64 symbols | 2 files | 82% cohesion

## When to Use

Use this skill when working on files in:
- `src/ClientData.ts`
- `src/fromLegacyClientData.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/ClientData.ts` | personal, isSelfemployed, plainObject, address, toPlainObject, ... |
| `src/fromLegacyClientData.ts` | migratedInput, fromLegacyClientData, legacyClientData, bankAccountsConfirmedByAffidavit, migrateClientInformation, ... |

## Entry Points

- `src/ClientData.ts::ClientData.create`
- `src/fromLegacyClientData.ts::migrateBankAccounts`

## Connected Communities

- **src +1 dirs · compareWith** (3 cross-edges)
- **src +2 dirs · constructor** (2 cross-edges)
- **src +1 dirs · Address** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-6")
explore(operation:"context", task:"understand src · ClientData", format:"gcx")
relations(operation:"usages", target:{symbol:"src/ClientData.ts::ClientData.create"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
