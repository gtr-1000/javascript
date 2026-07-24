# freeCodeCamp JS

A collection of JavaScript exercises from freeCodeCamp's curriculum. Each folder holds a single lab, sometimes with more than one solution to compare different approaches (e.g. `slice` vs `split`, `switch` vs array + `.includes()`).

## Structure

```
basic-algorithm-scripting/
├── mask-email/
├── card-counter/
├── leap-year/
├── truncate-string/
└── confirm-ending/
```

Each lab folder contains:
- One or more `.js` files with the solution(s)
- A `README.md` explaining the exercise and comparing approaches, when more than one solution is included

## Labs

| Folder | Exercise |
|---|---|
| `mask-email` | Mask the local part of an email address, keeping the first and last character visible |
| `card-counter` | Blackjack card counting assistant — track a running count and decide Bet/Hold |
| `leap-year` | Check whether a given year is a leap year |
| `truncate-string` | Shorten a string to a given length, appending `...` when truncated |
| `confirm-ending` | Check whether a string ends with a given target string, without `.endsWith()` |

## Why more than one solution per lab

Some folders include multiple versions of the same function, each using different JavaScript methods (e.g. `indexOf`/`slice` vs `split`, or `slice` vs `substring`). The goal is to compare trade-offs between approaches — conciseness, readability, and when one method fits better than another — rather than just getting a single passing solution.
