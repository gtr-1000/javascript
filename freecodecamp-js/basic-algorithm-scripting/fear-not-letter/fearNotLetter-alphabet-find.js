function fearNotLetter(str) {
  const alfabeto = "abcdefghijklmnopqrstuvwxyz";

  const inicio = alfabeto.indexOf(str[0]);
  const sequenciaCorreta = alfabeto.slice(inicio, inicio + str.length);

  return sequenciaCorreta.split("").find(letra => !str.includes(letra));
}

console.log(fearNotLetter("abce"));              // "d"
console.log(fearNotLetter("abcdefghjklmno"));    // "i"
console.log(fearNotLetter("abcdefghijklmnopqrstuvwxyz")); // undefined
