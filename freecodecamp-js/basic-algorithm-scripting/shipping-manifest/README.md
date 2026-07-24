# Shipping Manifest Validator

A freeCodeCamp exercise: validate and normalize a shipping container's manifest data (id, destination, weight, unit, and hazmat flag), without mutating the original object.

## The three functions

- **`normalizeUnits(manifest)`** — returns a new object with `weight` converted to kilograms (if it was in pounds) and `unit` set to `"kg"`. Never mutates the input.
- **`validateManifest(manifest)`** — returns a new object listing any missing (`"Missing"`) or invalid (`"Invalid"`) properties. Returns an empty object `{}` when everything is valid. Never mutates the input.
- **`processManifest(manifest)`** — ties the two together: validates first, and only normalizes (to log the total weight) if the manifest is valid.

## Why validation happens before normalization

`validateManifest` accepts both `"kg"` and `"lb"` as valid units — normalization to kilograms is a separate, later step (handled by `processManifest`), not part of deciding whether the data is well-formed. A manifest in pounds isn't invalid data; it's valid data in a different unit that gets standardized afterward. Validating already-normalized data would also risk hiding real problems in what was originally submitted.

## Why `{ ...manifest }` matters in `normalizeUnits` but not in `validateManifest`

`normalizeUnits` returns a modified copy of the *same shape* as the input, so it needs to copy the object first (`{ ...manifest }`) and only change what's necessary — otherwise mutating the copy would mutate the original too, since objects are compared and modified by reference, not by value.

`validateManifest` builds a *completely different* object from scratch (an error report, not a modified manifest) and only ever reads from `manifest` — it never writes to it. Since `const erros = {}` is already a brand new object, there's nothing to copy.

## Two approaches to `validateManifest`

### `shippingManifest-if-else.js`

Each property gets its own explicit `if / else if` block: check if it exists, then check if its value is valid.

```javascript
if (!("containerId" in manifest)) {
  erros.containerId = "Missing";
} else if (!Number.isInteger(manifest.containerId) || manifest.containerId <= 0) {
  erros.containerId = "Invalid";
}
```

Repeated five times, once per property, with only the validity condition changing.

### `shippingManifest-validators-map.js`

The validity rule for each property is stored as a function inside a `VALIDATORS` object, and a `for...in` loop applies the same existence + validity check to every property in turn:

```javascript
const VALIDATORS = {
  containerId: (value) => Number.isInteger(value) && value > 0,
  destination: (value) => typeof value === "string" && value.trim().length > 0,
  weight: (value) => typeof value === "number" && !Number.isNaN(value) && value > 0,
  unit: (value) => value === "kg" || value === "lb",
  hazmat: (value) => typeof value === "boolean",
};

function validateManifest(manifest) {
  const erros = {};

  for (const campo in VALIDATORS) {
    if (!(campo in manifest)) {
      erros[campo] = "Missing";
    } else if (!VALIDATORS[campo](manifest[campo])) {
      erros[campo] = "Invalid";
    }
  }

  return erros;
}
```

This is the same pattern used in `loan-qualification`: instead of writing near-identical branches by hand, the rules become data, and one small piece of logic (existence check + calling the matching validator) is written once and reused for every property.

## Trade-offs

The `if/else` version is easier to read top to bottom for a fixed, small set of fields — no indirection, no need to understand how the loop connects to the map. The validators-map version is more compact and scales better: adding a sixth field to validate means adding one entry to `VALIDATORS`, instead of writing a whole new `if/else if` block. It also isolates each field's validity rule as a small, independently readable (and testable) function.
