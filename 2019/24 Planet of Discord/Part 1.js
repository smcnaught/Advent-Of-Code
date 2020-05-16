let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8').split('\n').map(t => t.split(''));
// let source = fs.readFileSync('./sampleInput.txt').toString('utf-8').split('\n').map(t => t.split(''));
let tiles = [];
let complexCoordVar = 2000; // **Important: Must be bigger than your largest coordinate**
let allSnapshots = [];

for (let x = 0; x < source.length; x++) {
  for (let y = 0; y < source[x].length; y++) {
    tiles.push({ type: source[x][y], coord: createComplexCoordinate(x, y), needsChange: false })
  }
}

function createComplexCoordinate(x, y) {
  return x + y * complexCoordVar;
}

function getNumberOfBugs(coord) {
  // ** tiles on the edge have fewer than four adjacent tiles. missing tiles count as empty space.
  let getTile = (whereTo) => tiles[tiles.map(tile => tile.coord).indexOf(whereTo)];

  const up = getTile(coord - 1);
  const upIsBug = up ? up.type === "#" : false;

  const down = getTile(coord + 1);
  const downIsBug = down ? down.type === "#" : false;

  const right = getTile(coord + 2000);
  const rightIsBug = right ? right.type === "#" : false;

  const left = getTile(coord - 2000);
  const leftIsBug = left ? left.type === "#" : false;

  let numberOfBugs = [upIsBug, downIsBug, rightIsBug, leftIsBug].filter(Boolean).length;

  return numberOfBugs;
}

function oneMinute() {
  // loop through tiles
  tiles.forEach(tile => {
    const type = tile.type;
    const coord = tile.coord;

    // for each tile, check 4 adjacent tiles
    let numberOfBugs = getNumberOfBugs(coord);

    if (type === "#") {
      // bug dies (becomes empty space) unless there is exactly one bug adjacent to it
      if (numberOfBugs !== 1) {
        tile.needsChange = true;
      }
    }
    else if (type === ".") {
      // empty space becomes a bug if exactly one or two bugs are adjacent to it
      if (numberOfBugs === 1 || numberOfBugs === 2) {
        tile.needsChange = true;
      }
    }
  })

  // loop through tiles again
  tiles.forEach(tile => {
    if (tile.needsChange) {
      tile.type = tile.type === "#" ? "." : "#";
      tile.needsChange = false;
    }
  })

  let snapshot = "";
  for (let i = 0; i < tiles.length; i += 5) {
    snapshot += tiles[i].type + tiles[i + 1].type + tiles[i + 2].type + tiles[i + 3].type + tiles[i + 4].type;
  }

  allSnapshots.push(snapshot);

}

let minutesToRun = 200;

for (let i = 0; i < minutesToRun; i++) {
  oneMinute();
}

loop1:
for (let i = 0; i < allSnapshots.length; i++) {
  loop2:
  for (let j = 0; j < allSnapshots.length; j++) {
    if (i !== j) {
      if (allSnapshots[i] === allSnapshots[j]) {
        let dup = allSnapshots[i].split("");
        let biodiversity = 0;
        loop3:
        for (let k = 0; k < dup.length; k++) {
          if (dup[k] === "#") biodiversity += Math.pow(2, k);
        }

        console.log(`Part One Answer: ${biodiversity}`)
        break loop1;
      }
    }
  }
}