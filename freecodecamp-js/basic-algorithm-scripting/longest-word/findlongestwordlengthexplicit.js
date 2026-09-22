function findLongestWordLength(string) {
  const words = string.split(" ");
  const lengths = words.map(word => word.length);
  return Math.max(...lengths);
}

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog")); // 6
