const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let currentRight = treeCount = 0;

for (let i = 0; i < data.length; i++) {
  let repeat = JSON.parse(JSON.stringify(data[i]));
  for (let j = 0; j < 75; j++) data[i].push(...repeat);
}

for (let i = 0; i < data.length; i++) {
  if (i === 0) currentRight += 3;
  else {
    if (data[i][currentRight] === "#") treeCount++;
    // else if (data[i][currentRight] !== ".") console.log(data[i][currentRight]) // if you get this, you don't have enough repeats
    currentRight += 3;
  }
}

console.log(`Part One Answer: ${treeCount}`);