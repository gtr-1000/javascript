# Find Longest Word Length

A freeCodeCamp exercise: given a sentence, return the length of its longest word.

## The approach (shared by all three versions)

1. Split the sentence into individual words (`split(" ")`)
2. Map each word to its length (`map(word => word.length)`)
3. Return the highest number in that list (`Math.max(...lengths)`)

The three files differ in how that same logic is written — and the third one goes further than the exercise asks.

## Three versions

### `findLongestWordLength-explicit.js`

Each step lives in its own named variable: `words`, `lengths`, then `Math.max`.

```javascript
function findLongestWordLength(string) {
  const words = string.split(" ");
  const lengths = words.map(word => word.length);
  return Math.max(...lengths);
}
```

The most readable version for tracing what's happening step by step.

### `findLongestWordLength-oneliner.js`

The same three steps chained into a single expression — no intermediate variables, no named function, one line.

```javascript
const findLongestWordLength = str =>
  Math.max(...str.split(" ").map(word => word.length));
```

Relies on arrow function syntax and method chaining. Compact, but requires reading right-to-left (from `split` to `map` to `Math.max`) to trace the data flow — the opposite of how the explicit version reads.

### `findLongestWordLength-with-name.js` ⚠️ Extended — does not match the exercise spec

This version goes beyond what the exercise asks: instead of returning just the length (a number), it sorts the words by length and returns a formatted string with both the word and its length.

```javascript
const findLongestWordLength = (str) => {
  const words = str.split(" ");
  const sortedWords = words.sort((a, b) => b.length - a.length);
  const longestWord = sortedWords[0];
  return `${longestWord} - ${longestWord.length}`;
};
// "jumped - 6"
```

**This would fail the freeCodeCamp tests** because the return type is a string, not a number. It's included as a deliberate extension: returning more context (the word itself, not just its length) is a reasonable real-world requirement. The sort approach (`b.length - a.length`) is also a different technique for finding the longest word — instead of computing all lengths and taking the max, it reorders the words and picks the first.

## `Math.max(...lengths)` — why the spread?

`Math.max()` expects individual numbers as arguments (`Math.max(3, 6, 4)`), not an array. The spread operator (`...`) "unpacks" the array into individual arguments, so `Math.max(...[3, 6, 4])` becomes `Math.max(3, 6, 4)` at call time. Without the spread, `Math.max([3, 6, 4])` would return `NaN`.
