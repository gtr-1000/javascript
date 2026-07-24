# Truncate a String

A freeCodeCamp exercise: shorten a string to a given length, appending `"..."` when it gets cut off.

## Rules

- If the string's length is **greater** than the given number, cut it down to that number of characters and append `"..."` at the end.
- If the string's length is **equal to or less** than the given number, return it unchanged (no `"..."` added).

## Solution

```javascript
function truncateString(string, number) {
  if (string.length > number) {
    return `${string.slice(0, number)}...`;
  } else {
    return string;
  }
}
```

Or, as a ternary (same logic, more compact — a good fit here since each branch is a single return value):

```javascript
function truncateString(string, number) {
  return string.length > number ? `${string.slice(0, number)}...` : string;
}
```

## Key detail: `slice(0, number)`

The second argument of `.slice()` is not "the index of the last character you want" — it's the number of characters counted from the start, since it's an exclusive end index starting at 0. That's why `slice(0, number)` always returns exactly `number` characters, which lines up directly with what the exercise asks for: making the string's `length` equal to `number`.

Example: `"cacau".slice(0, 2)` returns `"ca"` — 2 characters, matching the second argument exactly, even though in terms of *index positions* it only reaches index 1.
