let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let input = text.split('\n').map(str => (str.match(/-?[0-9]+/g) || []).map(Number))
let inRegion = 0;

for (let i = -500; i < 900; i++) {
  for (let j = -500; j < 900; j++) {
    let gridPoint = [i, j];
    let totalDist = 0;
    for (const point of input) {
      let dist = Math.abs(point[0] - gridPoint[0]) + Math.abs(point[1] - gridPoint[1]);
      totalDist += dist;
    }
    if (totalDist < 10000) inRegion++;
  }
}

console.log(`Part Two Answer: ${inRegion}`);