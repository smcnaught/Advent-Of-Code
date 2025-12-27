const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let dial = 50;
let zeroCounts = 0;
data.forEach(line => {
  [direction, moves] = [line.charAt(0), +line.slice(1)]
  dial = (((direction == "R" ? (dial + moves) : (dial - moves)) % 100) + 100) % 100;
  if (dial == 0) zeroCounts += 1
})
console.log(`Part One Answer: ${zeroCounts}`);