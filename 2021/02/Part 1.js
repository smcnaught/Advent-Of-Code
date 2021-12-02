const formatter = require('../../shared/formatting/format-puzzle-input');
let instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let horizontal = 0;
let depth = 0;

instructions.forEach(([dir, steps]) => {
  if (dir === 'forward') horizontal+= +steps;
  else if (dir === 'down') depth+= +steps;
  else if (dir === 'up') depth-= +steps;
})

console.log(`Part One Answer: ${horizontal * depth}`);