function maskEmail(email) {
  const atIndex = email.indexOf("@");
  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex); 
  const firstChar = localPart.slice(0, 1);
  const lastChar = localPart.slice(-1);
  const middleMask = "*".repeat(localPart.length - 2);

  return firstChar + middleMask + lastChar + domain;
}

const email = "freecodecamp@example.com";
console.log(maskEmail(email));
