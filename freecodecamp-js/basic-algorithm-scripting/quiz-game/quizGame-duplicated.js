const questions = [
  {
    category: "Ciência",
    question: "Qual é o planeta mais próximo do Sol?",
    choices: ["Terra", "Marte", "Mercúrio"],
    answer: "Mercúrio",
  },
  {
    category: "Geografia",
    question: "Qual é a capital da França?",
    choices: ["Londres", "Paris", "Berlim"],
    answer: "Paris",
  },
  {
    category: "História",
    question: "Em que ano começou a Segunda Guerra Mundial?",
    choices: ["1914", "1939", "1945"],
    answer: "1939",
  },
  {
    category: "Entretenimento",
    question: "Quem escreveu a peça 'Romeu e Julieta'?",
    choices: ["William Shakespeare", "Machado de Assis", "Charles Dickens"],
    answer: "William Shakespeare",
  },
  {
    category: "Esportes",
    question: "Quantos jogadores de linha compõem um time de futebol em campo?",
    choices: ["5", "10", "11"],
    answer: "11",
  },
];

function getRandomQuestion(questionsArray) {
  const randomIndex = Math.floor(Math.random() * questionsArray.length);
  return questionsArray[randomIndex];
}

function getRandomComputerChoice(choicesArray) {
  const randomIndex = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[randomIndex];
}

function getResults(questionObject, computerChoice) {
  if (computerChoice === questionObject.answer) {
    return "The computer's choice is correct!";
  } else {
    return `The computer's choice is wrong. The correct answer is: ${questionObject.answer}`;
  }
}

const random = getRandomQuestion(questions);
console.log(random);
const pc = getRandomComputerChoice(random.choices);
console.log(pc);
const res = getResults(random, pc);
console.log(res);
