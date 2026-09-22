function fearNotLetter(str) {
  for (let i = 1; i < str.length; i++) {
    let atual = str.charCodeAt(i);
    let anterior = str.charCodeAt(i - 1);

    if (atual - anterior > 1) {
      return String.fromCharCode(anterior + 1);
    }
  }

  return undefined;
}

console.log(fearNotLetter("abce"));              // "d"
console.log(fearNotLetter("abcdefghjklmno"));    // "i"
console.log(fearNotLetter("abcdefghijklmnopqrstuvwxyz")); // undefined
