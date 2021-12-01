// import * as formatter from '../../shared/formatting/format-puzzle-input'
const formatter = require('../../shared/formatting/format-puzzle-input');
let report = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
let bigger = 0;

for (let i = 0; i < report.length; i++) {
    const first = report[i];
    const second = report[i + 1];
    const third = report[i + 2];
    const fourth = report[i + 3];

    if (first && second && third && fourth) {
      if ((second + third + fourth) > (first + second + third)) bigger++;
    } 
}

console.log(`Part Two Answer: ${bigger}`);