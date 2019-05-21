let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let allClaims = text.replace(/\r/g, "").split("\n");
let grid = Object.create(null);
let claims = Object.create(null);
let mainArr = [];

allClaims.forEach(c => {
  let arr = c.replace(/#/g, "").replace(/@|:|x/g, ",").split(',').map(Number);
  mainArr.push(arr);
})

for (let i = 0; i < mainArr.length; i++) {
  let arr = mainArr[i];
  [num, left, top, width, height] = arr;
  claims[num] = true;

  for (let x = left; x < left + width; x++) {
    for (let y = top; y < top + height; y++) {
      if (grid[`${x},${y}`]) {
        claims[grid[`${x},${y}`]] = false;
        claims[num] = false;
      }
      grid[`${x},${y}`] = num;
    }
  }
}

console.log(`Part Two Answer: ${Object.entries(claims).filter(i => i[1])[0][0]}`);