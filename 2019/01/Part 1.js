let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arrayOfNumbers = source.replace(/\r/g, '').split('\n').map(Number);

let total = 0;
arrayOfNumbers.forEach(n => total += Math.floor(n / 3) - 2);

console.log(`Part One Answer: ${total}`);