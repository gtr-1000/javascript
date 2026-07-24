# Loan Qualification Tool

A freeCodeCamp exercise: given an annual income and a credit score, return a message describing which loans the person qualifies for.

## Rules

```
Income >= 60000 and credit score >= 700   -> qualifies for duplex, condo, and car loan
Income >= 45000 and credit score >= 680   -> qualifies for condo and car loan
Income >= 30000 and credit score >= 650   -> qualifies for car loan
Otherwise                                  -> doesn't qualify for any loan
```

Each tier is a stricter version of the one below it — someone who qualifies for the duplex loan automatically qualifies for the condo and car loans too, so the checks must be ordered from the strictest tier down to the loosest.

## Two approaches

### `getLoanMessage-if-else.js`

Uses a chain of named constants (`minIncomeForDuplex`, `minCreditScoreForDuplex`, etc.) and an `if/else if/else` that checks the strictest tier first, falling through to looser tiers.

```javascript
if (creditScore >= minCreditScoreForDuplex && annualIncome >= minIncomeForDuplex) {
  return "You qualify for a duplex, condo, and car loan.";
} else if (annualIncome >= minIncomeForCondo && creditScore >= minCreditScoreForCondo) {
  return "You qualify for a condo and car loan.";
}
// ...
```

Straightforward and easy to follow line by line, but each tier's data (income, score, message) is spread across separate constants and a separate `if` branch, three or four lines apart from each other.

### `getLoanMessage-tiers-array.js`

Groups each tier's data into a single object, and stores all tiers in an array ordered from strictest to loosest. A `for...of` loop walks through the tiers and returns the first one the person qualifies for.

```javascript
const tiers = [
  { minIncome: 60000, minCreditScore: 700, message: "You qualify for a duplex, condo, and car loan." },
  { minIncome: 45000, minCreditScore: 680, message: "You qualify for a condo and car loan." },
  { minIncome: 30000, minCreditScore: 650, message: "You qualify for a car loan." },
];

for (const tier of tiers) {
  if (annualIncome >= tier.minIncome && creditScore >= tier.minCreditScore) {
    return tier.message;
  }
}

return "You don't qualify for any loans.";
```

If no tier matches inside the loop, the function falls through to the final `return` after it — same idea as the `else` in the first version.

## Trade-offs

The `if/else` version is simpler to read for a fixed, small number of tiers — no loop to trace through. The array + loop version keeps each tier's income, score, and message together in one place, and scales better: adding a new loan tier means adding one object to the array, instead of declaring new constants and writing a new `else if` branch.
