let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let allClaims = text.replace(/\r/g, "").split("\n");
let grid = Object.create(null);
let mainArr = [];

allClaims.forEach(c => {
  let arr = c.replace(/#/g, "").replace(/@|:|x/g, ",").split(',').map(Number);
  mainArr.push(arr);
})

for (let i = 0; i < mainArr.length; i++) {
  let arr = mainArr[i];
  [num, left, top, width, height] = arr;

  for (let x = left; x < left + width; x++) {
    for (let y = top; y < top + height; y++) {
      grid[`${x},${y}`] = (grid[`${x},${y}`] || 0) + 1;
    }
  }
}

console.log(`Part One Answer: ${Object.values(grid).filter(inchOfFab => inchOfFab > 1).length}`);