function getLoanMessage(annualIncome, creditScore) {
  const tiers = [
    {
      minIncome: 60000,
      minCreditScore: 700,
      message: "You qualify for a duplex, condo, and car loan.",
    },
    {
      minIncome: 45000,
      minCreditScore: 680,
      message: "You qualify for a condo and car loan.",
    },
    {
      minIncome: 30000,
      minCreditScore: 650,
      message: "You qualify for a car loan.",
    },
  ];

  for (const tier of tiers) {
    if (annualIncome >= tier.minIncome && creditScore >= tier.minCreditScore) {
      return tier.message;
    }
  }

  return "You don't qualify for any loans.";
}

const duplexLoanMsg = getLoanMessage(85000, 850);
const condoLoanMsg = getLoanMessage(65000, 690);
const carLoanMsg = getLoanMessage(45000, 660);
const noLoanMsg = getLoanMessage(25000, 550);

console.log(duplexLoanMsg);
console.log(condoLoanMsg);
console.log(carLoanMsg);
console.log(noLoanMsg);
