# Library Catalog Parser

A small JavaScript utility that takes a "raw" library catalog (pipe-delimited
text lines) and turns it into structured data: parsing, search by author,
grouping by decade, entry validation, and export to JSON/CSV.

This project exists in **two versions** on purpose — they're not the same
solution with different syntax by accident, but two ways of approaching the
same problem:

| File | Style | Why |
|---|---|---|
| `library-catalog-classic.js` | Traditional `for` loops, no high-level array methods | Solid foundation: shows the algorithm is understood at the level of iteration, indexing, and manual accumulation |
| `library-catalog-modern.js` | ES6+: `map`, `filter`, `reduce`, destructuring, arrow functions | Idiomatic code: shows the fluency in modern JavaScript expected in production today |

## What each version does

- **`parseCard` / `parseCatalog`** — turns each raw line
  (`"Title | Author | Year | Location"`) into a `{ title, author, year, location }`
  object, filling in `"Unknown"` for missing fields.
- **`findByAuthor`** — partial, case-insensitive search by author name.
- **`groupByDecade`** — groups books by decade (`"1980s"`, etc.), with an
  `"Unknown"` bucket for books with no known year.
- **`renderEntry`** — formats a single entry as a readable text block.
- **`validateEntry`** — checks whether an entry has all required fields
  filled in (none missing or equal to `"Unknown"`).
- **`exportToJSON` / `exportToCSV`** — exports the full catalog in both formats.

## Why the modern version is written the way it is

It's not just "swap `for` for `map`." Each change solves something specific:

- **`reduce` in `groupByDecade`** avoids writing the "create the bucket if it
  doesn't exist yet" logic twice (once for `"Unknown"`, once for the decade) —
  the `??=` operator covers both cases in one line.
- **Destructuring with default values** in `renderEntry` replaces four
  repeated `|| "Unknown"` fallbacks with a single fallback point, right in
  the function signature.
- **`.every()` in `validateEntry`** turns four nearly identical `if` blocks
  into a list of required fields — adding a new required field becomes a
  one-line change instead of a new `if`.
- **`Math.min`/`Math.max` with spread** instead of manual accumulators
  (`Infinity` / `0`) removes the risk of initializing the wrong starting
  value.

Both versions share the exact same function signatures and behavior — the
same test cases can be run against both and the output compared.

## How to run

```bash
node library-catalog-classic.js
node library-catalog-modern.js
```

## Edge cases covered

The sample catalog deliberately includes entries with missing data:

- Missing title
- Missing author
- Missing year
- Missing location

These lines test whether the parser correctly falls back to `"Unknown"`
instead of breaking or propagating `undefined`.
