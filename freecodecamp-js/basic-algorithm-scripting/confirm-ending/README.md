# Confirm the Ending

A freeCodeCamp exercise: check whether a string ends with a given target string, without using `.endsWith()`.

## Rules

- `confirmEnding(str, target)` returns `true` if `str` ends with `target`, `false` otherwise.
- Must use a substring method instead of `.endsWith()`.

## Three approaches

All three grab the last `target.length` characters of `str` and compare them to `target` — they only differ in which method does the grabbing, and how the starting position is expressed.

### `confirmEnding-negative-index.js`

Uses `slice` with a **negative index**, counting from the end of the string.

```javascript
const slice = str.slice(-target.length);
```

`slice(-3)` means "start 3 characters before the end". This is the most compact version, since it skips calculating a position manually.

### `confirmEnding-positive-index.js`

Uses `slice`, but calculates the starting position explicitly, counting from the start of the string.

```javascript
const startPosition = str.length - target.length;
const slice = str.slice(startPosition);
```

Mathematically equivalent to the negative-index version — if `target` really is the ending, it must start at position `str.length - target.length`. This version is more explicit about where the comparison begins, which can help when debugging.

### `confirmEnding-substring.js`

Uses `substring` instead of `slice`, with the same positive starting position.

```javascript
const startPosition = str.length - target.length;
const slice = str.substring(startPosition);
```

**Key difference between `slice` and `substring`:** they behave the same with positive numbers, but handle negative numbers differently. `slice(-3)` counts backward from the end, while `substring(-3)` treats any negative number as `0`. That's why this version needs the positive `startPosition` calculated first — passing a negative number directly to `substring` wouldn't work as intended.

## Takeaway

`slice` with a negative index is the most concise solution here. `substring` is a close relative of `slice`, but it's worth remembering it doesn't support negative indices the same way — a common source of subtle bugs when switching between the two methods.
