const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine()[1].split(',');
let busInfo = [];

for (let i = 0; i < data.length; i++) {
  if (!isNaN(data[i])) busInfo.push([+data[i], i])
}

let earliestTime = 0;
let multiplier = 1;
for (let i = 0; i < busInfo.length; i++) {
  let foundEarliest = false;
  [bus, order] = [busInfo[i][0], busInfo[i][1]]

  while (!foundEarliest) {
    if ((earliestTime + order) % bus === 0) {
      foundEarliest = true;
      multiplier *= bus;
    }
    else earliestTime += multiplier;
  }
}
console.log(`Part Two Answer: ${earliestTime}`);