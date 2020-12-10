const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
let preambleLength = 25;

for (let i = preambleLength; i < data.length; i++) {
  let preamble = [];
  for (let j = 1; j <= preambleLength; j++) preamble.push(data[i - j])
  const allSumsForPreamble = getAllSums(preamble);
  if (!allSumsForPreamble.includes(data[i])) console.log(`Part One Answer: ${data[i]}`);
}

function getAllSums(preamble) {
  let availableSums = [];

  for (let i = 0; i < preamble.length; i++) {
    for (let j = 0; j < preamble.length; j++) {
      if (i !== j) {
        sum = preamble[i] + preamble[j];
        availableSums.push(sum);
      }
    }
  }

  return availableSums;
}