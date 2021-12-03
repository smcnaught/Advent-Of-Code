const formatter = require('../../shared/formatting/format-puzzle-input');
const data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let gammaRate = epsilonRate = "";
const positions = [];

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (!positions[j]) positions[j] = [];
    positions[j].push(data[i][j])
  }
}

for (let i = 0; i < positions.length; i++) {
  const arr = positions[i];
  const mostCommon = arr.sort((a,b) => arr.filter(v => v===a).length - arr.filter(v => v===b).length).pop();
  const leastCommon = mostCommon === '1' ? '0' : '1';
  gammaRate+=mostCommon;
  epsilonRate+=leastCommon;
}

const powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
console.log(`Part One Answer: ${powerConsumption}`);