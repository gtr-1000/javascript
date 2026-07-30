# Quiz Game

A freeCodeCamp exercise: pick a random question, let the computer randomly pick one of its choices, and report whether the computer's guess was correct.

## The functions

- `getRandomQuestion(questionsArray)` — returns one random question object from `questions`.
- `getRandomComputerChoice(choicesArray)` — returns one random choice from a question's `choices`.
- `getResults(questionObject, computerChoice)` — compares the computer's pick to the question's real `answer` and returns a success or failure message, including the correct answer when wrong.

## Two versions

### `quizGame-duplicated.js`

`getRandomQuestion` and `getRandomComputerChoice` each independently calculate a random index and return the item at that position:

```javascript
function getRandomQuestion(questionsArray) {
  const randomIndex = Math.floor(Math.random() * questionsArray.length);
  return questionsArray[randomIndex];
}

function getRandomComputerChoice(choicesArray) {
  const randomIndex = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[randomIndex];
}
```

Both functions do exactly the same thing under the hood — pick one random element from whatever array they receive — just applied to a different array (`questions` vs. a question's `choices`).

### `quizGame-shared-helper.js`

The shared logic is pulled out into one small function, `getRandomItem`, and the other two just call it:

```javascript
function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomQuestion(questionsArray) {
  return getRandomItem(questionsArray);
}

function getRandomComputerChoice(choicesArray) {
  return getRandomItem(choicesArray);
}
```

## Why this matters

Both versions pass the exercise's tests — the outward behavior is identical. The difference is in maintenance: if the random-selection logic ever needed to change (say, weighting some items more heavily, or avoiding repeats), the duplicated version requires updating it in two places and keeping them in sync by hand. The shared-helper version only needs the change made once, in `getRandomItem`, and both callers pick it up automatically.

This is the same idea behind the "don't repeat yourself" (DRY) principle: when two pieces of code are doing the same thing for the same reason (not just coincidentally similar), it's usually worth naming that shared behavior once and reusing it, rather than keeping two independent copies that could quietly drift apart over time.
