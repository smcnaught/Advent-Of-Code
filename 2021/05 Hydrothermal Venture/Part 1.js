const formatter = require('../../shared/formatting/format-puzzle-input');
const points = new formatter.Formatter(__dirname).getRaw().replace(/\r|\n/g, ',').replace(/->|\s\s+/g, '').replace(/,/g, ' ').split(' ').filter(n => n).map(Number);
let xy = {}; // x: []

for (let i = 0; i < points.length; i+=4) {
  [x1, y1, x2, y2] = [points[i], points[i + 1], points[i + 2], points[i+3]];

  if (x1 === x2) {
    let start, finish;
    if (y1 < y2) [start, finish] = [y1, y2];
    else [start, finish] = [y2, y1];

    // loop y
    if (!xy[x1]) xy[x1] = [];
    for (let j = start; j <= finish; j++) {
      if (!xy[x1][j]) xy[x1][j] = 0;
      xy[x1][j]++;
    }
  }

  else if (y1 === y2) {
    let start, finish;
    if (x1 < x2) [start, finish] = [x1, x2];
    else [start, finish] = [x2, x1];

    // loop x
    for (let k = start; k <= finish; k++) {
      if (!xy[k]) xy[k] = [];
      if (!xy[k][y1]) xy[k][y1] = 0;
      xy[k][y1]++
    }
  }
}

let overlaps = 0;
Object.entries(xy).forEach(([x, y]) => {
  y.forEach(el => { if (el > 1) overlaps++ })
})

console.log(`Part One Answer: ${overlaps}`);