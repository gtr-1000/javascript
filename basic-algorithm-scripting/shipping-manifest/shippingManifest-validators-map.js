function normalizeUnits(manifest) {
  const novo = { ...manifest };
  if (novo.unit === "lb") {
    novo.weight = novo.weight * 0.45;
    novo.unit = "kg";
  }
  return novo;
}

// Each property maps to a function that answers one question:
// "is this value valid?" (true/false). The property is only reached
// if it already exists on the manifest.
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

function processManifest(manifest) {
  const erros = validateManifest(manifest);

  if (Object.keys(erros).length === 0) {
    console.log(`Validation success: ${manifest.containerId}`);
    console.log(`Total weight: ${normalizeUnits(manifest).weight} kg`);
  } else {
    console.log(`Validation error: ${manifest.containerId}`);
    console.log(erros);
  }
}
