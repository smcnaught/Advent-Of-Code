let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arrayOfNumbers = source.replace(/\r/g, '').split(',').map(Number);
const goal = 19690720;

function tryValues(noun, verb)
{
  arrayOfNumbers[1] = noun;
  arrayOfNumbers[2] = verb;

  for (let i = 0; i < arrayOfNumbers.length; i++) {
    if (i % 4 === 0) {
      let first = arrayOfNumbers[arrayOfNumbers[i + 1]];
      let second = arrayOfNumbers[arrayOfNumbers[i + 2]];
      let store = arrayOfNumbers[i + 3];

  
      if (arrayOfNumbers[i] === 1) {
        arrayOfNumbers[store] = first + second;
      }
      else if (arrayOfNumbers[i] === 2) {
        arrayOfNumbers[store] = first * second;
      }
    }
  }

  if (arrayOfNumbers[0] === goal) return true;
  else return false;
}

for (let noun = 0; noun < 100; noun++)
{
  for (let verb = 0; verb < 100; verb++)
  {
    if (tryValues(noun, verb))
    {
      let answer = 100 * noun + verb;
      console.log(`Part Two Answer: ${answer}`);
      return;
    }
    else
    {
      arrayOfNumbers = source.replace(/\r/g, '').split(',').map(Number);
    }
  }
}