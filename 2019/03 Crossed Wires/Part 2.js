let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arrayOfStrings = source.replace(/\r/g, '').split('\n');
let first = arrayOfStrings[0].split(',');
let second = arrayOfStrings[1].split(',');

function getMovements(lineArray) {
  let linex = liney = 0;
  let totalMovement = 0;
  let movements = [];

  for (let i = 0; i < lineArray.length; i++) {
    let direction = lineArray[i].charAt(0);
    let num = +lineArray[i].substring(1);

    // loop through number of given direction
    for (let j = 0; j < num; j++) {
      if (direction === 'R') linex++;
      else if (direction === 'L') linex--;
      else if (direction === 'U') liney++;
      else if (direction === 'D') liney--;
      movements.push({ x: linex, y: liney, steps: ++totalMovement })
    }
  }

  return movements;
}


let l1Coords = getMovements(first);
let l2Coords = getMovements(second);

let leastSteps = [];
for (let i = 0; i < l1Coords.length; i++) {
  let one = l1Coords[i];
  for (let j = 0; j < l2Coords.length; j++)
  {
    let two = l2Coords[j];
    if (one.x === two.x && one.y === two.y)
    {
      leastSteps.push(one.steps + two.steps)
    }
  }
}

console.log(`Part Two Answer: ${leastSteps.sort((a, b) => a - b)[0]}`);