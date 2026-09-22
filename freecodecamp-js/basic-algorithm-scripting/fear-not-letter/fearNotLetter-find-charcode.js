function fearNotLetter(str) {
  let codigoFaltando;

  str.split("").find((letra, i) => {
    if (i === 0) return false;

    let codigoAtual = letra.charCodeAt(0);
    let codigoAnterior = str.charCodeAt(i - 1);

    if (codigoAtual - codigoAnterior > 1) {
      codigoFaltando = codigoAnterior + 1;
      return true; // stops .find() immediately
    }
  });

  return codigoFaltando ? String.fromCharCode(codigoFaltando) : undefined;
}

console.log(fearNotLetter("abce"));              // "d"
console.log(fearNotLetter("abcdefghjklmno"));    // "i"
console.log(fearNotLetter("abcdefghijklmnopqrstuvwxyz")); // undefined
