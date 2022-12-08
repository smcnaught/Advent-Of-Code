const formatter = require('../../shared/formatting/format-puzzle-input');
let rows = [];
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => rows.push(line.split('').map(Number)))

let highestScore = 0;
for (let i = 1; i < rows.length - 1; i++) {
  for (let j = 1; j < rows[i].length - 1; j++) {
    // all trees (numbers) in the middle
    const tree = rows[i][j];
    const treeScore = topScore(i, j, tree) * bottomScore(i, j, tree) * rightScore(i, j, tree) * leftScore(i, j, tree);
    if (treeScore > highestScore) highestScore = treeScore;
  }
}

function topScore(row, col, tree) {
  let treesSeen = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (tree > rows[i][col]) treesSeen++;
    else  if (rows[i][col] >= tree) return ++treesSeen;
  }
  return treesSeen;
}

function bottomScore(row, col, tree) {
  let treesSeen = 0;
  for (let i = row + 1; i < rows.length; i++) {
    if (tree > rows[i][col]) treesSeen++;
    else if (rows[i][col] >= tree) return ++treesSeen;
  }
  return treesSeen;
}

function rightScore(row, col, tree) {
  let treesSeen = 0;
  for (let i = col + 1; i <= rows[row].length; i++) {
    if (tree > rows[row][i]) treesSeen++;
    else if (rows[row][i] >= tree) return ++treesSeen;
  }
  return treesSeen;
}

function leftScore(row, col, tree) {
  let treesSeen = 0;
  for (let i = col - 1; i >= 0; i--) {
    if (tree > rows[row][i]) treesSeen++;
    else if (rows[row][i] >= tree) return ++treesSeen;
  }
  return treesSeen;
}

console.log(`Part Two Answer: ${highestScore}`);