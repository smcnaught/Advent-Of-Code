const formatter = require('../../shared/formatting/format-puzzle-input');
let coords = [] // 2d array, each sub array is a y index
let instructions = [];
let highX = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map((str) => {
  [x, y] = str.split(',');
  if (x && +x > highX) highX = +x;
  return str
})
.map(coordStr => {
  [x, y] = coordStr.split(',');
  if (x && y) {
    if (!coords[y]) coords[y] = new Array(highX + 1).fill('.');
    coords[y][x] = '#';
  }
  else if (x) {
    [foldAlong, foldIndex] = coordStr.replace(/fold along /g, '').split('=');
    instructions.push({ foldAlong: foldAlong, foldIndex: foldIndex })
  }
})

function foldUp(y) {
  let changeIter = y - 1;
  for (let i = y + 1; i < coords.length; i++) {
    if (!coords[i]) coords[i] = [];
    if (!coords[changeIter]) coords[changeIter] = new Array(highX + 1).fill('.');
    for (let j = 0; j < coords[i].length; j++) {
      const oldVal = coords[changeIter][j];
      const newVal = coords[i][j];

      if (oldVal === '.' && newVal === '#') coords[changeIter][j] = newVal;
    }

    changeIter--;
  }

  coords.splice(y)
}

function foldLeft(x) {
  for (let i = 0; i < coords.length; i++) {
    let changeIter = 0;

    if (!coords[i]) coords[i] = new Array(highX + 1).fill('.');
    for (let j = coords[i].length - 1; j > x; j--) {
      const newVal = coords[i][j];
      if (newVal) {
        const oldVal = coords[i][changeIter];
        const newVal = coords[i][j];

        if (oldVal === '.' && newVal === '#') coords[i][changeIter] = newVal;
      }

      changeIter++;
    }

    coords[i].splice(x)
  }
}

instructions.forEach(ins => {
  if (ins.foldAlong === 'x') foldLeft(+ins.foldIndex);
  else foldUp(+ins.foldIndex);
})

console.log(`Part Two Answer: `);
coords.forEach(c => console.log(c.join('')));