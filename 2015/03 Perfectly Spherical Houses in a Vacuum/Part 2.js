let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');

let houses = new Set(['0,0']),
  santaX = 0,
  santaY = 0,
  roboX = 0,
  roboY = 0,
  robotsTurn = false;

for (let letter of input)
{
  if (robotsTurn)
  {
    if (letter == '>') roboX++; 
    else if (letter == '<') roboX--;
    else if (letter == '^') roboY++;
    else if (letter == 'v') roboY--;
    houses.add(roboX + ',' + roboY);
  }
  else
  {
    if (letter == '>') santaX++;
    else if (letter == '<') santaX--;
    else if (letter == '^') santaY++;
    else if (letter == 'v') santaY--;
    houses.add(santaX + ',' + santaY);
  }

  robotsTurn = !robotsTurn;
}

console.log(`Part Two Answer: ${[...houses.values()].length}`);