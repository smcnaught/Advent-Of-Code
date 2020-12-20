const formatter = require('../../shared/formatting/format-puzzle-input');
let sorted = new formatter.Formatter(__dirname).getArrayOfNumbersByLine().sort((a, b) => a - b);

let partTwo = sorted.reduce((all, adapter) => {
  [a, b, c] = [all[adapter - 3] || 0, all[adapter - 2] || 0, all[adapter - 1] || 0];
  all[adapter] = a + b + c;
  return all;
}, [1]).pop();

console.log(`Part Two Answer: ${partTwo}`);