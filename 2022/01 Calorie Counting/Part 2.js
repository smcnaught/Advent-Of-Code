const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
let calsByElf = [];

let singleElfCals = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i] === 0) {
    calsByElf.push(singleElfCals);
    singleElfCals = 0;
  }
  else singleElfCals += data[i];
}

let sorted = calsByElf.sort((a, b) => b - a);
console.log(`Part Two Answer: ${sorted[0] + sorted[1] + sorted[2]}`);