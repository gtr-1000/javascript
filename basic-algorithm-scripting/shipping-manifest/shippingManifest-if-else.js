function normalizeUnits(manifest) {
  const novo = { ...manifest };
  if (novo.unit === "lb") {
    novo.weight = novo.weight * 0.45;
    novo.unit = "kg";
  }
  return novo;
}

function validateManifest(manifest) {
  const erros = {};

  if (!("containerId" in manifest)) {
    erros.containerId = "Missing";
  } else if (!Number.isInteger(manifest.containerId) || manifest.containerId <= 0) {
    erros.containerId = "Invalid";
  }

  if (!("destination" in manifest)) {
    erros.destination = "Missing";
  } else if (typeof manifest.destination !== "string" || manifest.destination.trim().length === 0) {
    erros.destination = "Invalid";
  }

  if (!("weight" in manifest)) {
    erros.weight = "Missing";
  } else if (typeof manifest.weight !== "number" || Number.isNaN(manifest.weight) || manifest.weight <= 0) {
    erros.weight = "Invalid";
  }

  if (!("unit" in manifest)) {
    erros.unit = "Missing";
  } else if (manifest.unit !== "kg" && manifest.unit !== "lb") {
    erros.unit = "Invalid";
  }

  if (!("hazmat" in manifest)) {
    erros.hazmat = "Missing";
  } else if (typeof manifest.hazmat !== "boolean") {
    erros.hazmat = "Invalid";
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
