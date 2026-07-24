# Lunch Picker Program

A freeCodeCamp exercise: manage a list of lunch options with functions to add, remove, randomly pick, and display items from a shared array.

## Rules

Each function operates on the same `lunches` array, passed in as an argument:

- `addLunchToEnd(arr, str)` — adds `str` to the end, logs a confirmation, returns the updated array.
- `addLunchToStart(arr, str)` — same, but adds to the start.
- `removeLastLunch(arr)` — removes the last item, logs what was removed (or a "no lunches" message if empty), returns the updated array.
- `removeFirstLunch(arr)` — same, but removes the first item.
- `getRandomLunch(arr)` — logs a randomly picked item (or a message if empty). Doesn't return anything.
- `showLunchMenu(arr)` — logs every item in the array as a comma-separated list (or a message if empty).

## Why every function both logs *and* returns

At first glance, mixing `console.log()` (a side effect — printing to the screen) with `return` (handing a value back to whoever called the function) can look inconsistent. It's intentional here, and it mirrors a common real-world pattern: a function that changes something, reports what it did, and still hands back the result so the caller can keep working with it.

```javascript
function addLunchToEnd(arr, str) {
  arr.push(str);
  console.log(`${str} added to the end of the lunch menu.`);
  return arr;
}
```

This lets the same function be useful in two different contexts: as a step in a longer chain of operations (using the returned array), or as a one-off action where only the console message matters. `getRandomLunch` and `showLunchMenu` skip the `return` because their job stops at reporting — they don't change the array, so there's nothing new to hand back.

## Why `if` blocks need their own `return`

Several functions must stop early when the array is empty, instead of continuing on to code that assumes there's data to work with:

```javascript
function removeLastLunch(arr) {
  if (arr.length === 0) {
    console.log("No lunches to remove.");
    return arr;
  }

  const removed = arr.pop();
  console.log(`${removed} removed from the end of the lunch menu.`);
  return arr;
}
```

Without the `return` inside the `if` block, execution would fall through to `arr.pop()` even on an empty array, producing `undefined` and a second, incorrect log message. The `return` inside the `if` is what makes the "empty" case a genuine stopping point rather than just a warning.

## Shared state across functions

All six functions operate on the same array reference (`lunches`), rather than each keeping their own private copy. This is the same shape as state management in a real app — several actions (add, remove, display) all reading and modifying one shared list of data, rather than isolated, disconnected pieces.
