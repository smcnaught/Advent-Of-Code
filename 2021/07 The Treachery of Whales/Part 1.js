const formatter = require('../../shared/formatting/format-puzzle-input');
let positions = new formatter.Formatter(__dirname).getArrayOfNumbers(',').sort((a, b) => a - b);
const half = Math.floor(positions.length / 2);
const median = positions.length % 2 ? positions[half] : (positions[half - 1] + positions[half]) / 2;

let fuel = 0;
positions.forEach(pos => fuel += Math.abs(pos - median));
console.log(`Part One Answer: ${fuel}`);