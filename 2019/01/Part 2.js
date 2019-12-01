let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');

let arrayOfNumbers = source.replace(/\r/g, '').split('\n').map(Number);
let moduleTotals = [];

arrayOfNumbers.forEach(n => {
  while (n >= 0)
  {
    n = Math.floor(n / 3) - 2;
    if (n >= 0) moduleTotals.push(n);
  }
});

console.log(`Part Two Answer: ${moduleTotals.reduce((total, num) => total + num)}`);