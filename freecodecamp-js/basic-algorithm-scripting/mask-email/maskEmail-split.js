function maskEmail(email) {
  const [localPart, domain] = email.split("@");
  
  if (localPart.length <= 2) {
    return `${localPart[0]}${"*".repeat(localPart.length - 1)}@${domain}`;
  }
  
  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedLength = localPart.length - 2;
  
  return `${firstChar}${"*".repeat(maskedLength)}${lastChar}@${domain}`;
}

const email = "freecodecamp@example.com";
console.log(maskEmail(email));
