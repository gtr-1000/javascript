const findLongestWordLength = (str) => {
  const words = str.split(" ");

  // Sort from longest to shortest
  const sortedWords = words.sort((a, b) => b.length - a.length);
  const longestWord = sortedWords[0];

  return `${longestWord} - ${longestWord.length}`;
};

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));
// Output: "jumped - 6"
