---
name: gortex-
description: "Work in the . area — 7 symbols across 1 files (100% cohesion)"
---

# .

7 symbols | 1 files | 100% cohesion

## When to Use

Use this skill when working on files in:
- ``

## Key Files

| File | Symbols |
|------|---------|
| `` | getInstanceOfClass, getNormalizedDate, isESClass, getValidDate, transformDataBeforeValidation, ... |

## How to Explore

```
analyze(operation:"communities", id:"community-0")
explore(operation:"context", task:"understand .", format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
