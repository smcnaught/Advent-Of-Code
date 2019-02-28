let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');

let houses = new Set(['0,0']),
  x = 0,
  y = 0;

for (let letter of input)
{
  if (letter == '>') x++;
  else if (letter == '<') x--;
  else if (letter == '^') y++;
  else if (letter == 'v') y--;

  houses.add(x + ',' + y);
}

console.log(`Part One Answer: ${[...houses.values()].length}`)