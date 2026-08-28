---
name: gortex-src-1-dirs-create
description: "Work in the src +1 dirs · create area — 37 symbols across 2 files (77% cohesion)"
---

# src +1 dirs · create

37 symbols | 2 files | 77% cohesion

## When to Use

Use this skill when working on files in:
- `src/BankAccount.ts`
- `test/mock/bankAccountValidations.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/BankAccount.ts` | cytronId, id, validateSWIFT, create, currency, ... |
| `test/mock/bankAccountValidations.ts` | TestCase |

## Entry Points

- `src/BankAccount.ts::BankAccount.validateIBAN`

## How to Explore

```
analyze(operation:"communities", id:"community-4")
explore(operation:"context", task:"understand src +1 dirs · create", format:"gcx")
relations(operation:"usages", target:{symbol:"src/BankAccount.ts::BankAccount.validateIBAN"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
