function fearNotLetter(str) {
  const alfabeto = "abcdefghijklmnopqrstuvwxyz";

  const inicio = alfabeto.indexOf(str[0]);
  const sequenciaCorreta = alfabeto.slice(inicio, inicio + str.length);

  const letrasFaltando = sequenciaCorreta.split("").filter(letra => !str.includes(letra));

  return letrasFaltando.length > 0 ? letrasFaltando[0] : undefined;
}

console.log(fearNotLetter("abce"));              // "d"
console.log(fearNotLetter("abcdefghjklmno"));    // "i"
console.log(fearNotLetter("abcdefghijklmnopqrstuvwxyz")); // undefined
