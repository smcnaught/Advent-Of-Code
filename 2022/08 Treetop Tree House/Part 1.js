const formatter = require('../../shared/formatting/format-puzzle-input');
let rows = [];
let visibleTrees = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map((line, index) => rows.push(line.split('').map(Number)))

visibleTrees += (rows[0].length * 2) + (rows[0].length * 2) - 4;

for (let i = 1; i < rows.length - 1; i++) {
  for (let j = 1; j < rows[i].length - 1; j++) {
    // all trees (numbers) in the middle
    const tree = rows[i][j];
    const treeIsVisible = visibleTop(i, j, tree) || visibleBottom(i, j, tree) || visibleRight(i, j, tree) || visibleLeft(i, j, tree);
    if (treeIsVisible) visibleTrees++;
  }
}

function visibleTop(row, col, tree) {
  let visible = true;
  for (let i = row - 1; i >= 0; i--) {
    if (rows[i][col] >= tree) return visible = false;
  }
  return visible;
}

function visibleBottom(row, col, tree) {
  let visible = true;
  for (let i = row + 1; i < rows.length; i++) {
    if (rows[i][col] >= tree) return visible = false;
  }
  return visible;
}

function visibleRight(row, col, tree) {
  let visible = true;
  for (let i = col + 1; i < rows[row].length; i++) {
    if (rows[row][i] >= tree) return visible = false;
  }
  return visible;
}

function visibleLeft(row, col, tree) {
  let visible = true;
  for (let i = col - 1; i >= 0; i--) {
    if (rows[row][i] >= tree) return visible = false;
  }
  return visible;
}

console.log(`Part One Answer: ${visibleTrees}`);