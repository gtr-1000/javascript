# freeCodeCamp — JavaScript Algorithm Scripting

This folder started as freeCodeCamp's Basic Algorithm Scripting exercises, but it's grown into something closer to a personal study project than a checklist of completed assignments. For most labs, the version the exercise asked for was the starting point, not the finish line — from there, most folders include one or more additional implementations exploring a different method, data structure, or design decision, with a README comparing the trade-offs.

## Why more than one solution per lab

Getting a lab's tests to pass proves the logic works once. Rebuilding it a second way — with a different JavaScript method, a different data structure, or a different way of organizing state — is what actually surfaces the trade-offs between approaches: readability, how well it scales if a rule changes, whether it mutates data it shouldn't, and so on. That comparison is the actual point of this folder, not just the passing tests.

Examples of the kinds of alternatives explored:

- **Comparison strategy:** `switch` with fallthrough vs. an array/`set` + `.includes()`/`in` — grouping values by data instead of by branching (`card-counter`).
- **Branching strategy:** repeated `if/else if` blocks vs. a data-driven map of rules applied in a loop — trading explicitness for scalability (`shipping-manifest`).
- **String method choice:** `indexOf` + `slice` vs. `split`, or `slice` vs. `substring` — same result, different built-in tools and their edge cases (`mask-email`, `confirm-ending`).
- **State management:** a plain function with a global variable vs. a class encapsulating its own state — a design choice, not just a syntax one (explored further in the parallel Python version of `card-counter`).

## Labs

| Folder | Exercise | Notes |
|---|---|---|
| `mask-email` | Mask the local part of an email address | `indexOf`/`slice` vs `split` |
| `card-counter` | Blackjack card counting assistant | `switch` (fallthrough) vs array + `.includes()` |
| `leap-year` | Check whether a year is a leap year | `if/else` vs ternary; two equivalent logical framings of the same rule |
| `truncate-string` | Shorten a string, appending `...` | `if/else` vs ternary |
| `confirm-ending` | Check if a string ends with a target string, without `.endsWith()` | `slice` (negative index) vs `slice` (positive index) vs `substring` |
| `loan-qualification` | Loan qualification message from income/credit tiers | `if/else if` chain vs array of tier objects + loop |
| `lunch-picker` | Manage a shared array of lunch options | Functions combining logging (side effect) and returning (state) by design |
| `golf-score` | Convert par/strokes into a golf nickname | Ordering conditions to resolve overlapping rules correctly |
| `shipping-manifest` | Validate and normalize shipping container data | Explicit `if/else` validation vs a validators-map + loop |

## What this folder isn't

It's not a from-scratch app or an original product — the exercise prompts and test suites still come from freeCodeCamp. What's authored here is everything past the minimum: the alternate implementations, the comparisons between them, and the reasoning written up in each lab's README.
