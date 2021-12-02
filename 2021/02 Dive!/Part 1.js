const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let horizontal = depth = 0;

instructions.forEach(([dir, steps]) => {
  if (dir === 'forward') horizontal+= +steps;
  else if (dir === 'down') depth+= +steps;
  else if (dir === 'up') depth-= +steps;
})

console.log(`Part One Answer: ${horizontal * depth}`);