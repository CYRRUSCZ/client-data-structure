---
name: gortex-1-dirs
description: "Work in the . +1 dirs area — 7 symbols across 2 files (45% cohesion)"
---

# . +1 dirs

7 symbols | 2 files | 45% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/Address.ts`

## Key Files

| File | Symbols |
|------|---------|
| `` | trim |
| `src/Address.ts` | countryAlpha3, locale, locale, localizedCountryName, localizedFullAddress, ... |

## Entry Points

- `src/Address.ts::Address.localizedFullAddress`
- `src/Address.ts::Address.localizedCountryName`

## Connected Communities

- **src +1 dirs · compareWith** (3 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-2")
explore(operation:"context", task:"understand . +1 dirs", format:"gcx")
relations(operation:"usages", target:{symbol:"src/Address.ts::Address.localizedFullAddress"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
