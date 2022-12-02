const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings();
const combos = { "A X": 4, "A Y": 8, "A Z": 3, "B X": 1, "B Y": 5, "B Z": 9, "C X": 7, "C Y": 2, "C Z": 6 };
let playerTotalScore = 0;
for (let i = 0; i < data.length; i++) playerTotalScore += combos[data[i][0]];
console.log(`Part One Answer: ${playerTotalScore}`);