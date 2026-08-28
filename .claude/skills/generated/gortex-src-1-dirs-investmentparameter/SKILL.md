---
name: gortex-src-1-dirs-investmentparameter
description: "Work in the src +1 dirs · InvestmentParameter area — 46 symbols across 4 files (83% cohesion)"
---

# src +1 dirs · InvestmentParameter

46 symbols | 4 files | 83% cohesion

## When to Use

Use this skill when working on files in:
- `src/ClientInformation.ts`
- `src/InvestmentParameter.ts`
- `src/helpers.ts`
- `test/mock/investmentParameterValidations.ts`

## Key Files

| File | Symbols |
|------|---------|
| `src/ClientInformation.ts` | parameterInstance, parameter, addParameter, item, parameterInstance, ... |
| `src/InvestmentParameter.ts` | uid, value, name, isInvestmentCategory, addedAt, ... |
| `src/helpers.ts` | inputDate, getValidDate, throwInvalid, date |
| `test/mock/investmentParameterValidations.ts` | TestCase |

## Entry Points

- `src/InvestmentParameter.ts::InvestmentParameter.constructor`
- `src/ClientInformation.ts::ClientInformation.addParameter`
- `src/ClientInformation.ts::ClientInformation.removeParameter`

## Connected Communities

- **src +1 dirs · getStringOrNull** (4 cross-edges)
- **src +1 dirs · compareWith** (2 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-12")
explore(operation:"context", task:"understand src +1 dirs · InvestmentParameter", format:"gcx")
relations(operation:"usages", target:{symbol:"src/InvestmentParameter.ts::InvestmentParameter.constructor"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
