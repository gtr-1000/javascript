function confirmEnding(str, target) {
  const startPosition = str.length - target.length;
  const slice = str.slice(startPosition);
  return slice === target;
}
