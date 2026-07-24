function confirmEnding(str, target) {
  const slice = str.slice(-target.length);
  return slice === target;
}

console.log(confirmEnding("If you want to save our world, you must hurry. We don't know how much longer we can withstand the nothing", "mountain")); // false

