let count = 0;

const lowCards = [2, 3, 4, 5, 6];
const highCards = [10, "J", "Q", "K", "A"];

function cardCounter(card) {
 
  const cardValue = typeof card === "string" ? card.toUpperCase() : card;

  if (lowCards.includes(cardValue)) {
    count++;
  } else if (highCards.includes(cardValue)) {
    count--;
  }

  if (count > 0) {
    return `${count} Bet`;
  } else {
    return `${count} Hold`;
  }
  
}
