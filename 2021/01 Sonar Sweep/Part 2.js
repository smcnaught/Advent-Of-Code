const formatter = require('../../shared/formatting/format-puzzle-input');
let report = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
let bigger = 0;

for (let i = 0; i < report.length; i++) {
  [a, b, c, d] = [report[i], report[i+1], report[i+2], report[i+3]]
  if ((a && b && c && d) && (b+c+d) > (a+b+c)) bigger++;
}

console.log(`Part Two Answer: ${bigger}`);