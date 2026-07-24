function confirmEnding(str, target) {
  const startPosition = str.length - target.length;
  const slice = str.substring(startPosition);
  return slice === target;
}
