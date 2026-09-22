# Fear Not Letter

A freeCodeCamp exercise: given a string of consecutive letters from the alphabet, find and return the first missing letter. If no letter is missing, return `undefined`.

```
fearNotLetter("abce")           → "d"
fearNotLetter("abcdefghjklmno") → "i"
fearNotLetter("abcdefghijklmnopqrstuvwxyz") → undefined
```

## Two fundamentally different approaches

The four versions split into two families, each with a different mental model for the problem.

### Family 1 — Numeric comparison (charCode)

These versions treat letters as numbers. Every character has a numeric code (`charCodeAt`), and consecutive letters always differ by exactly 1. If two adjacent letters differ by more than 1, a letter was skipped — and its code is `anterior + 1`.

**`fearNotLetter-for-charcode.js`** — classic `for` loop, most explicit:

```javascript
for (let i = 1; i < str.length; i++) {
  let atual = str.charCodeAt(i);
  let anterior = str.charCodeAt(i - 1);
  if (atual - anterior > 1) {
    return String.fromCharCode(anterior + 1);
  }
}
return undefined;
```

Starts at index 1 (comparing current to previous), returns as soon as a gap is found, falls through to `undefined` if the loop finishes cleanly. Minimal moving parts.

**`fearNotLetter-find-charcode.js`** — same logic, using `.find()` instead of `for`:

```javascript
str.split("").find((letra, i) => {
  if (i === 0) return false;
  if (codigoAtual - codigoAnterior > 1) {
    codigoFaltando = codigoAnterior + 1;
    return true; // stops .find() immediately
  }
});
return codigoFaltando ? String.fromCharCode(codigoFaltando) : undefined;
```

`.find()` was designed to return the matching *element*, but here we only care about a side effect (saving `codigoFaltando`) and use `return true` purely as a stop signal. It works, but using `.find()` for its early-exit behavior rather than its return value is a repurposing of the method — the `for` version communicates the intent more clearly.

### Family 2 — Alphabet comparison

These versions don't do math on character codes. Instead, they use the full alphabet as a reference, extract the slice that *should* match the input, and compare the two directly — finding which letters are in the reference but not in the input.

**`fearNotLetter-alphabet-find.js`**:

```javascript
const inicio = alfabeto.indexOf(str[0]);
const sequenciaCorreta = alfabeto.slice(inicio, inicio + str.length);
return sequenciaCorreta.split("").find(letra => !str.includes(letra));
```

Reads almost like plain English: "cut the right slice of the alphabet, find the first letter missing from the input." `.find()` returns `undefined` automatically when nothing matches, so no explicit `undefined` return is needed — the shortest of the four versions.

**`fearNotLetter-alphabet-filter.js`** — same idea, using `.filter()` instead:

```javascript
const letrasFaltando = sequenciaCorreta.split("").filter(letra => !str.includes(letra));
return letrasFaltando.length > 0 ? letrasFaltando[0] : undefined;
```

`.filter()` collects *all* missing letters instead of stopping at the first. For this exercise (where at most one letter is missing), the result is identical to the `.find()` version. The advantage appears when the input could have multiple gaps: `filter` naturally handles that case, while `find` would only catch the first. The explicit `undefined` fallback is also slightly clearer than relying on `.find()`'s implicit behavior.

## Trade-offs at a glance

| Version | Technique | Stops early | Handles multiple gaps | Explicit `undefined`? |
|---|---|---|---|---|
| `for-charcode` | numeric diff, `for` loop | Yes (`return`) | No | Yes |
| `find-charcode` | numeric diff, `.find()` | Yes (side-effect trick) | No | Yes |
| `alphabet-find` | alphabet slice, `.find()` | Yes | No | No (implicit) |
| `alphabet-filter` | alphabet slice, `.filter()` | No (checks all) | Yes | Yes |

## Key methods used

- **`charCodeAt(i)`** — returns the UTF-16 code of the character at index `i`. For lowercase letters, `"a"` is 97, `"b"` is 98, and so on — always consecutive, always differing by 1.
- **`String.fromCharCode(n)`** — the reverse: converts a numeric code back into a character.
- **`str.includes(letra)`** — checks whether a string contains a substring or character. Used here to test if a letter from the reference slice is also present in the input.
