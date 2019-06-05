let fs = require('fs');
let molecule = fs.readFileSync('./input.txt').toString('utf-8');
const allElements = molecule.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1);
const totalElements = allElements.length;
let countRnAr = 0;
let countY = 0;

allElements.forEach(m => {
  if (m === 'Rn' || m === 'Ar') countRnAr++;
  else if (m === 'Y') countY++;
})

let stepCount = totalElements - countRnAr - (2*countY) - 1;
console.log(`Part Two Answer: ${stepCount}`);