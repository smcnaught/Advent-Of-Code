const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data.length; j++) {
    if (i !== j && data[i] + data[j] === 2020) return console.log(`Part One Answer: ${data[i] * data[j]}`);
  }
}