const rowToCheck = 2000000;

const formatter = require('../../shared/formatting/format-puzzle-input');
let sensorInfo = []; // { sensorX: 2, sensorY: 18, manhattanToClosestBeacon: getManhattanDist(2, 18, -2, 15) }
[highestX, highestY, lowestX, lowestY] = [0, 0, Number.MAX_VALUE, Number.MAX_VALUE];
let beacons = {};
let sensors = {};
let grid = {}; // { '15': {'-2': '.' } }; where 15 = y && -2 = x
new formatter.Formatter(__dirname, rowToCheck === 10).getArrayOfStringsByLine().map(line => {
  [sensorX, sensorY, beaconX, beaconY] = line.replace(/Sensor at x=|y=| closest beacon is at x=| /g, '').replace(/:/g, ',').split(',').map(Number);
  [highX, highY, lowX, lowY] = [Math.max(sensorX, beaconX), Math.max(sensorY, beaconY), Math.min(sensorX, beaconX), Math.min(sensorY, beaconY)];

  if (highX > highestX) highestX = highX;
  if (lowX < lowestX) lowestX = lowX;

  sensorInfo.push({ sensorX: sensorX, sensorY: sensorY, manhattanToClosestBeacon: getManhattanDist(sensorX, sensorY, beaconX, beaconY) });

  if (!beacons[beaconY]) beacons[beaconY] = {};
  beacons[beaconY][beaconX] = true;

  if (!sensors[sensorY]) sensors[sensorY] = {};
  sensors[sensorY][sensorX] = true;
})

function getManhattanDist(sensorX, sensorY, beaconX, beaconY) {
  return Math.abs(sensorX-beaconX) + Math.abs(sensorY-beaconY);
}

function setupGrid() {
  lowestX = -2109096
  highestX = 13997998

  for (let y = rowToCheck; y <= rowToCheck; y++) {
    for (let x = lowestX; x <= highestX; x++) {
      if (!grid.hasOwnProperty(y)) grid[y] = {};
      if (beacons[y] && beacons[y][x]) grid[y][x] = 'B'
      else if (sensors[y] && sensors[y][x]) grid[y][x] = 'S'
      else grid[y][x] = '.';
    }
  }
}

function loopThroughSensors() {
  Object.entries(grid).forEach(([yValue, row]) => {
    Object.entries(row).forEach(([xValue, symbol]) => {
      for (let i = 0; i < sensorInfo.length; i++) {
        const s = sensorInfo[i];
        if (symbol === '.') {
          const manhattanToGridPt = getManhattanDist(s.sensorX, s.sensorY, +xValue, +yValue);
          if (manhattanToGridPt <= s.manhattanToClosestBeacon) {
            grid[yValue][xValue] = '#';
            break;
          }
        }
      }
    })
  })
}

lowestX = Number.MIN_SAFE_INTEGER;
highestX = Number.MAX_SAFE_INTEGER;

setupGrid();
loopThroughSensors();
let count = 0;
Object.values(grid[rowToCheck]).forEach(v => { if (v === '#') count++ })
console.log(`Part One Answer: ${count}`)