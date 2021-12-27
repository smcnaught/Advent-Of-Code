const formatter = require('../../shared/formatting/format-puzzle-input');
const data = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');

function getBiggestModelNumber() {
  let uniques = [];
  const numberOfSets = 18; // 18 sets of 14 repeated inputs
  for (let i = 0; i < data.length; i+= numberOfSets) {
    const set = data.slice(i, i + 18);
    let unique = [+set[4][2], +set[5][2], +set[15][2]];
    uniques.push(unique)
  }

  let biggestMN = [];
  let stack = [];
  for (let i = 0; i < uniques.length; i++) {
    [DIV, CHECK, OFFSET] = uniques[i];

    if (DIV === 1) stack.push([i, OFFSET]);
    else {
      [ind, offs] = stack.pop();
      const nextNum = 9 - (offs + CHECK);
      biggestMN[ind] = nextNum > 9 ? 9 : nextNum;
      biggestMN[i] = biggestMN[ind] + (offs + CHECK);
    }
  }

  console.log(`Part One Answer: ${biggestMN.join('')}`);
}

getBiggestModelNumber();