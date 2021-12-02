const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let horizontal = depth = aim = 0;

instructions.forEach(([dir, steps]) => {
  if (dir === 'forward') {
    horizontal+= +steps;
    depth+= aim * +steps
  }
  else if (dir === 'down') aim+= +steps;
  else if (dir === 'up') aim-= +steps;
})

console.log(`Part Two Answer: ${horizontal * depth}`);