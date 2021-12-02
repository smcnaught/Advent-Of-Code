const formatter = require('../../shared/formatting/format-puzzle-input');
let instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let horizontal = 0;
let depth = 0;
let aim = 0;

instructions.forEach(([dir, steps]) => {
  if (dir === 'forward') {
    horizontal+= +steps;
    depth+= aim * +steps
  }
  else if (dir === 'down') aim+= +steps;
  else if (dir === 'up') aim-= +steps;
})

console.log(`Part Two Answer: ${horizontal * depth}`);