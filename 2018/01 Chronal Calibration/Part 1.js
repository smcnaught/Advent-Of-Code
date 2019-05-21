let fs = require('fs');
let raw = fs.readFileSync('./input.txt').toString('utf-8');
let input = raw.replace(/\r/g, '').split('\n').map(Number);
let partOneAnswer = 0;
input.forEach(i => partOneAnswer += i);
console.log(`Part One Answer: ${partOneAnswer}`);