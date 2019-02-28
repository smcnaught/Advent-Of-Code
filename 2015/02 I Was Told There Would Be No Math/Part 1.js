let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let dimensions = input.replace(/\r/g, '').replace(/x/g, ' ').split('\n').map(e => e.split(' '))
let areaPlusSlack;
let count = 0;

for (let i = 0; i < dimensions.length; i++) {
  let length = +dimensions[i][0];
  let width = +dimensions[i][1];
  let height = +dimensions[i][2];

  areaPlusSlack = (2 * length * width) + (2 * width * height) + (2 * height * length) + Math.min(length * width, width * height, height * length);
  count += areaPlusSlack;
};

console.log(`Part One Answer: ${count}`);