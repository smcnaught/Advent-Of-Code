const formatter = require('../../shared/formatting/format-puzzle-input');
let sub = [];
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(e => {
  if (e == '') return;
  else if (e.includes('Tile')) {
    sub = [];
    sub.push(+e.replace(/Tile |:/g, ''));
  }
  else if (e) sub.push(e);
  if (sub.length === 11) return sub;
})

let tiles = getTiles(data.filter(n => n));
const corners = findCorners(tiles);
console.log(`Part One Answer: ${corners.reduce((a, b) => a * b)}`);

function getTiles(allTileInfo) {
  let tiles = []; // [ { tileNum: 3079, sides: [..all sides] } ]
  let tile = { tileNum: null, sides: [] }

  allTileInfo.forEach(t => {
    tile.tileNum = t[0];
    [top, bottom, left, right] = [t[1], t[10], [], []];

    // get "left" && "right"
    for (let i = 1; i < t.length; i++) {
      left.push(t[i][0]);
      right.push(t[i][9])
    }

    tile.sides.push(top, bottom, left.join(''), right.join(''));
    tiles.push(tile);
    tile = { tileNum: null, sides: [] };
  })

  return tiles;
}

function findCorners(tiles) {
  let corners = [];

  for (let i = 0; i < tiles.length; i++) {
    const current = tiles[i];
    let matches = 0;

    for (let j = 0; j < tiles.length; j++) {
      if (i !== j) {
        const compareTo = tiles[j];
        current.sides.forEach(t => {
          const reverseT = t.split('').reverse().join('');
          compareTo.sides.forEach(m => {
            const reverseM = m.split('').reverse().join('');
            if (t === m || reverseT === m || reverseM === t ||reverseT === reverseM) matches++;
          })
        })
      }
    }

    /** 2 matches = corner; 3 matches = side (but not corner); 4 matches = middle piece */
    if (matches === 2) corners.push(current.tileNum)
  }

  return corners;
}