const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data.length; j++) {
    for (let k = 0; k < data.length; k++) {
      if (i !== j && i !== k && j !== k) {
        if (data[i] + data[j] + data[k] === 2020) {
          return console.log(`Part Two Answer: ${data[i] * data[j] * data[k]}`);
        }
      }
    }
  }
}