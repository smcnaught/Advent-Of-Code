const formatter = require('../../shared/formatting/format-puzzle-input');
let report = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
let bigger = 0;


for (let i = 0; i < report.length; i++) {
  if (i > 0 && report[i] > report[i - 1]) bigger++;
}

console.log(`Part One Answer: ${bigger}`);