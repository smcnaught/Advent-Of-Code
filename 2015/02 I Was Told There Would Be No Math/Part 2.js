let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let dimensions = input.replace(/\r/g, '').replace(/x/g, ' ').split('\n').map(e => e.split(' '))

let ribbonForBow = 0;
let totalRibbon = 0;

for (let i = 0; i < dimensions.length; i++) {
  let length = +dimensions[i][0];
  let width = +dimensions[i][1];
  let height = +dimensions[i][2];

  ribbonForBow = (length * width * height);
  let sorted = [length, width, height].sort((a, b) => a - b);
  totalRibbon += sorted[0] + sorted[0] + sorted[1] + sorted[1] + ribbonForBow;
};

console.log(`Part Two Answer: ${totalRibbon}`);