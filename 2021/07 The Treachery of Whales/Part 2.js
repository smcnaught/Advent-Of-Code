const formatter = require('../../shared/formatting/format-puzzle-input');
let positions = new formatter.Formatter(__dirname).getArrayOfNumbers(',');
const mean = positions.reduce((a, b) => a + b) / positions.length;
const meanCeil = Math.ceil(mean);
const meanFloor = Math.floor(mean);

function getFuel(mean) {
  let fuel = 0;
  positions.forEach(pos => {
    const steps = Math.abs(pos - mean);
    for (let i = 0; i < steps; i++) fuel += i + 1;
  })

  return fuel;
}

console.log(`Part Two Answer: ${Math.min(getFuel(meanCeil), getFuel(meanFloor))}`);