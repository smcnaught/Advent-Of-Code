let fs = require('fs');
const deckSize = 10007;
let shuffleInstructions = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .replace(/\r/g, '')
  .replace(/deal with increment/g, 'dealWithIncrementN')
  .replace(/deal into new stack/g, 'dealIntoNewStack')
  .replace(/cut/g, 'cutNCards')
  .split('\n').map(e => e.split(' '));

function dealIntoNewStack(deck) {
  return deck.reverse();
}

function cutNCards(deck, n) {
  if (n < 0) {
    let N = Math.abs(n);
    let removed = deck.slice(Math.max(deck.length - N, 1));
    removed.forEach(i => deck.pop());
    return [...removed, ...deck];
  }
  else {
    let removed = deck.splice(0, n);
    return [...deck, ...removed];
  }
}

function dealWithIncrementN(deck, n) {
  let newDeck = [];
  let current = 0;
  for (let i = 0; i < deck.length; i++) {
    newDeck[current] = deck[i];
    current += n;

    if (current > deck.length - 1) {
      current = current - deck.length;
    }
  }

  return newDeck;
}

function main(instructions) {
  let deck = [...Array(deckSize).keys()];

  // loop through shuffle instructions (input)
  for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i][0];
    let n = +instructions[i][1];
    if (instruction === 'dealWithIncrementN') {
      deck = dealWithIncrementN(deck, n);
    }
    else if (instruction === 'dealIntoNewStack') {
      deck = dealIntoNewStack(deck);
    }
    else if (instruction === 'cutNCards') {
      deck = cutNCards(deck, n)
    }
  }

  return deck;
}

let finalDeck = main(shuffleInstructions);

for (let i = 0; i < finalDeck.length; i++) {
  if (finalDeck[i] === 2019) console.log(`Part One Answer: ${i}`);
}