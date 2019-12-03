let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arrayOfStrings = source.replace(/\r/g, '').split('\n');
let first = arrayOfStrings[0].split(',');
let second = arrayOfStrings[1].split(',');

function getLineCoords(lineArray) {
  let coords = [];
  let linex = liney = 0;
  for (let i = 0; i < lineArray.length; i++) {
    let direction = lineArray[i].charAt(0);
    let num = +lineArray[i].substring(1);

    // loop through number of given direction
    for (let j = 0; j < num; j++) {
      if (direction === 'R') linex++;
      else if (direction === 'L') linex--;
      else if (direction === 'U') liney++;
      else if (direction === 'D') liney--;
      coords.push({ x: linex, y: liney });
    }
  }
  return coords;
}

let l1Coords = getLineCoords(first);
let l2Coords = getLineCoords(second);

let possibleAnswers = [];
for (let i = 0; i < l1Coords.length; i++) {
  for (let j = 0; j < l2Coords.length; j++) {
    if (l1Coords[i].x === l2Coords[j].x &&
      l1Coords[i].y === l2Coords[j].y) {
      let x = Math.abs(l1Coords[i].x);
      let y = Math.abs(l1Coords[i].y);

      possibleAnswers.push(x + y)
    }
  }
}

console.log(`Part One Answer: ${possibleAnswers.sort((a, b) => a - b)[0]}`);