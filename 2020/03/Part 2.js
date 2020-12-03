const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let allTrees = [];

for (let i = 0; i < data.length; i++) {
  let repeat = JSON.parse(JSON.stringify(data[i]));
  for (let j = 0; j < 75; j++) data[i].push(...repeat);
}

function getSlope(r, d) {
  let treeCount = currentRight = 0;

  for (let i = 0; i < data.length; i += d) {
    if (i === 0) currentRight += r;
    else {
      if (data[i][currentRight] === "#") treeCount++;
      // else if (data[i][currentRight] !== ".") console.log(data[i][currentRight]) // if you get this, you don't have enough repeats
      currentRight += r;
    }
  }

  return treeCount;
}

let slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
slopes.forEach(s => allTrees.push(getSlope(s[0], s[1])));
console.log(`Part Two Answer: ${allTrees.reduce((prev, cur) => prev * cur, 1)}`);