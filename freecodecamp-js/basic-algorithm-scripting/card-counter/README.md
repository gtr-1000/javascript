# Card Counting Assistant

A freeCodeCamp exercise: build a Blackjack card counter. Every card seen updates a running `count`. Positive count favors the player (bet high); zero or negative count means hold.

## Rules

```
Cards 2, 3, 4, 5, 6        -> count + 1
Cards 7, 8, 9              -> count unchanged
Cards 10, J, Q, K, A       -> count - 1
```

The function returns a string combining the current count and the decision, e.g. `"-3 Hold"` or `"5 Bet"`.

## Two approaches

Both versions share the same first step: normalizing the input. `card` can arrive as a number (2-10) or as a string (`"j"`, `"K"`, etc, in any case), so both solutions first convert string values to uppercase before comparing, using a local variable (`cardValue`) instead of `card` directly.

### `cardCounter-switch.js`

Uses a `switch` statement with **fallthrough**: multiple `case` labels stacked without a `break` between them share the same block of code.

```javascript
switch (cardValue) {
  case 2:
  case 3:
  case 4:
  case 5:
  case 6:
    count++;
    break;
  // ...
}
```

Cards 7, 8 and 9 aren't mentioned anywhere — since no `case` matches them, nothing happens and `count` stays the same.

### `cardCounter-array.js`

Uses two arrays (`lowCards`, `highCards`) declared outside the function, and the `.includes()` method to check if `cardValue` belongs to a group.

```javascript
if (lowCards.includes(cardValue)) {
  count++;
} else if (highCards.includes(cardValue)) {
  count--;
}
```

Same logic as the switch version: if `cardValue` doesn't belong to either array (7, 8, 9), no `else` is needed — `count` simply isn't touched.

## Why this design

- `count` is declared with `let` **outside** the function because it must persist across multiple calls (it tracks the running total as more cards are seen).
- `cardValue` is declared **inside** the function because it's only needed during a single call — it doesn't need to "remember" anything between calls, so it lives and dies within each execution.
- `lowCards` and `highCards` are declared outside the function with `const`: their content never changes, and recreating them on every function call would be wasteful.

## Takeaway

`switch` with fallthrough works well when you have a limited number of exact values to group together. The array + `.includes()` approach tends to read more clearly (the code states its intent directly: "is this card in the low group?") and is easier to extend — adding a new card to a group means adding one item to an array, instead of finding the right place to edit inside a `switch` block.
