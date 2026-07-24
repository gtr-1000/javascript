# Mask Email

A small algorithm exercise from freeCodeCamp: mask the local part of an email address, keeping only the first and last character visible.

## Examples

```
maskEmail("apple.pie@example.com")   -> "a*******e@example.com"
maskEmail("freecodecamp@example.com") -> "f**********p@example.com"
maskEmail("info@test.dev")           -> "i**o@test.dev"
maskEmail("user@domain.org")         -> "u**r@domain.org"
```

## Two approaches

This folder contains two different solutions to the same problem, using different string methods.

### `maskEmail-indexOf.js`

Uses `indexOf` to find the position of `@`, then `slice` to split the string manually.

```javascript
function maskEmail(email) {
  const atIndex = email.indexOf("@");
  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex); // already includes "@"

  const firstChar = localPart.slice(0, 1);
  const lastChar = localPart.slice(-1);
  const middleMask = "*".repeat(localPart.length - 2);

  return firstChar + middleMask + lastChar + domain;
}
```

**When this approach is useful:** when you need to find a specific position inside a string and slice around it, without necessarily splitting the whole string into pieces.

### `maskEmail-split.js`

Uses `split("@")` to break the email into two pieces directly, plus array destructuring to assign them.

```javascript
function maskEmail(email) {
  const [localPart, domain] = email.split("@");

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedLength = localPart.length - 2;

  return `${firstChar}${"*".repeat(maskedLength)}${lastChar}@${domain}`;
}
```

**When this approach is useful:** when you want to divide an entire string into parts using a separator (e.g. splitting a CSV line by commas, or a full name by spaces).

## Takeaway

Both solutions solve this exercise correctly. `split` is more direct for this specific case, since the goal is to divide the string into exactly two parts. `indexOf` + `slice` is more general-purpose: it's the right tool when you need to locate a position and extract text around it, even if you're not splitting the whole string.
