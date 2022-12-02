const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings();
const combos = { "A X": 4, "A Y": 8, "A Z": 3, "B X": 1, "B Y": 5, "B Z": 9, "C X": 7, "C Y": 2, "C Z": 6 };
let playerTotalScore = 0;
for (let i = 0; i < data.length; i++) {
  let moves = data[i][0].split(' ');
  if (moves[0] === 'A') moves[1] = moves[1] === 'X' ? moves[1] = 'Z' : moves[1] === 'Y' ? moves[1] = 'X' : moves[1] = 'Y';
  else if (moves[0] === 'C') moves[1] === 'X' ? moves[1] = 'Y' : moves[1] === 'Y' ? moves[1] = 'Z' : moves[1] = 'X';
  playerTotalScore += combos[moves.join(' ')];
}
console.log(`Part Two Answer: ${playerTotalScore}`);