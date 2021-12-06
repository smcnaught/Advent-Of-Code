const formatter = require('../../shared/formatting/format-puzzle-input');
const fishies = new formatter.Formatter(__dirname).getArrayOfNumbers(',');

function oneDay() {
  let fishToAdd = 0;
  for (let i = 0; i < fishies.length; i++) {
    fishies[i]--;

    if (fishies[i] < 0) {
      fishies[i] = 6
      fishToAdd++;
    }
  }
  for (let j = 0; j < fishToAdd; j++) fishies.push(8);
}

for (let i = 0; i < 80; i++) oneDay();
console.log(`Part One Answer: ${fishies.length}`);