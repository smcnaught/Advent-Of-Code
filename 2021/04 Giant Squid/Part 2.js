const formatter = require('../../shared/formatting/format-puzzle-input');
let toDraw;
let cards = []; // each index is a card: { 22: {c: 0, r: 0, marked: false}, 13: {}, 17: {}, ...}
let cardNumber = -1;
let rowNumber = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  if (!toDraw) toDraw = line.split(',');
  else if (line === '') {
    cardNumber++;
    rowNumber = 0;
  }
  else {
    const row = line.split(' ').filter(n => n);
    row.forEach((number, index) => {
      if (!cards[cardNumber]) cards[cardNumber] = {};
      cards[cardNumber][number] = { c: index, r: rowNumber, marked: false };
      cards[cardNumber]['hasWon'] = false;
    })
    rowNumber++;
  }
});

function checkForWinners(numberCalled) {
  let finalScore = false;
  for (let i = 0; i < cards.length; i++) {
    let columnMarked = Array(5).fill(0);
    let rowMarked = Array(5).fill(0);
    let sumUnmarked = 0;

    Object.entries(cards[i]).forEach(([num, info]) => {
      if (info.marked) {
        columnMarked[info.c]++;
        rowMarked[info.r]++;
      }
      else sumUnmarked += +num || 0;
    })
  
    const winningCard = columnMarked.some(c => c === 5) || rowMarked.some(c => c === 5);
    if (winningCard) {
      cards[i]['hasWon'] = true;
      const wasLast = cards.every(i => i['hasWon']);
      if (wasLast && !finalScore) finalScore = sumUnmarked * +numberCalled;
    }
  }

  return finalScore;  
}

function playOneNumber(num) {
  cards.forEach(card => {
    if (card[num]) card[num].marked = true;
  });
}

function playGame() {
  for (let i = 0; i < toDraw.length; i++) {
    playOneNumber(toDraw[i]);
    const finalScore = checkForWinners(toDraw[i]);
    if (finalScore) return console.log(`Part Two Answer: ${finalScore}`);
  }
}

playGame();