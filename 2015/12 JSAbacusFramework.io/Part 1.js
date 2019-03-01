let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8').match(/\-*\d+/g)
let total = 0;

for (let i = 0; i < input.length; i++)
{
  total += +input[i];
}

console.log(`Part One Answer: ${total}`);