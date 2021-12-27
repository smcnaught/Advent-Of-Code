const formatter = require('../../shared/formatting/format-puzzle-input');
const data = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');

function getSmallestModelNumber() {
  let uniques = [];
  const numberOfSets = 18; // 18 sets of 14 repeated inputs
  for (let i = 0; i < data.length; i+= numberOfSets) {
    const set = data.slice(i, i + 18);
    let unique = [+set[4][2], +set[5][2], +set[15][2]];
    uniques.push(unique)
  }

  let smallestMN = [];
  let stack = [];
  for (let i = 0; i < uniques.length; i++) {
    [DIV, CHECK, OFFSET] = uniques[i];

    if (DIV === 1) stack.push([i, OFFSET]);
    else {
      [ind, offs] = stack.pop();
      const nextNum = 1 - (offs + CHECK);
      smallestMN[ind] = nextNum < 1 ? 1 : nextNum;
      smallestMN[i] = smallestMN[ind] + (offs + CHECK);
    }
  }

  console.log(`Part Two Answer: ${smallestMN.join('')}`);
}

getSmallestModelNumber();