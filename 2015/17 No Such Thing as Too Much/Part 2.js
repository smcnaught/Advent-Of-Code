let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let n = 0;
const liters = 150;
let containers = input.replace(/\r/g, '').split('\n').map(getUniqueValues);

function getUniqueValues(c) {
  n++;
  return c + String.fromCharCode(97 + n);
}

function getAllCombos(list) {
  let combos = [];
  let combinationsCount = (1 << list.length);

  for (let i = 1; i < combinationsCount; i++)
  {
    let combination = [];
    for (let j = 0; j < list.length; j++)
    {
      if (i & (1 << j)) combination.push(list[j]);
    }
    combos.push(combination);
  }
  return combos;
}

let combinations = getAllCombos(containers);
let partOneAnswer = [];
combinations.forEach(c => {
  let count = 0;
  c.forEach(i => count += +i.replace(/\D/g, ''))
  if (count === liters) partOneAnswer.push(c);
})

console.log(`Part One Answer: ${partOneAnswer.length}`);


///////////////////////////////////// Part Two /////////////////////////////////////

let minContainers = 0;

// Figure out the minimum number of containers that hold the correct number of liters
partOneAnswer.forEach(i => {
  if (minContainers === 0 || minContainers > i.length) minContainers = i.length;
})

// Figure out how many times the minimum number of containers is used in different combinations
let partTwoAnswer = 0;
partOneAnswer.forEach(i => {
  if (i.length === minContainers) partTwoAnswer++;
})

console.log(`Part Two Answer: ${partTwoAnswer}`);