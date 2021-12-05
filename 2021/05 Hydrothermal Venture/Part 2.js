const formatter = require('../../shared/formatting/format-puzzle-input');
const points = new formatter.Formatter(__dirname).getRaw().replace(/\r|\n/g, ',').replace(/->|\s\s+/g, '').replace(/,/g, ' ').split(' ').filter(n => n).map(Number);
let xy = {}; // x: []

function getAll(a, b) {
  let start, finish;
  let reverse = false;
  if (a < b) [start, finish] = [a, b];
  else {
    [start, finish] = [b, a];
    reverse = true;
  }

  let all = [];
  for (let j = start; j <= finish; j++) {
    all.push(j);
  }

  if (reverse) all.reverse();
  return all;
}

for (let i = 0; i < points.length; i+=4) {
  [x1, y1, x2, y2] = [points[i], points[i + 1], points[i + 2], points[i+3]];
  const allX = getAll(x1, x2);
  const allY = getAll(y1, y2);
  let loop = allY;
  if (allX.length >= allY.length) loop = allX;

  for (let j = 0; j < loop.length; j++) {
    let x = (typeof allX[j] !== 'undefined') ? allX[j] : allX[allX.length - 1];
    let y = (typeof allY[j] !== 'undefined') ? allY[j] : allY[allY.length - 1];

    if (!xy[x]) xy[x] = [];
    if (!xy[x][y]) xy[x][y] = 0;
    xy[x][y]++;
  }
}

let overlaps = 0;
Object.entries(xy).forEach(([x, y]) => {
  y.forEach(el => { if (el > 1) overlaps++ })
})

console.log(`Part 2 Answer: ${overlaps}`);