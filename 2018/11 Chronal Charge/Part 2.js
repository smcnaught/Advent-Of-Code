/**
 * ** Change serialNumber to your input **
 */
const serialNumber = 3031; // input

// make grid
let grid = [];
const calcPowerLevel = (x, y) => {
  let rackID = x + 10;
  let powerLevelStart = ((rackID * y + serialNumber) * rackID).toString();
  return +powerLevelStart[powerLevelStart.length - 3] - 5;
}

for (let x = 1; x < 300; x++) {
  grid[x] = [];
  for (let y = 1; y < 300; y++)
    grid[x][y] = calcPowerLevel(x, y);
}

function getAnyLargest() {
  let largest = { x: 0, y: 0, power: 0, size: 0 };
  let power = 0;

  for (let size = 1; size < 18; size++)
    for (let x = 1; x < 301 - size; x++)
      for (let y = 1; y < 301 - size; y++) {
        power = 0;
        for (let row = 0; row < size; row++)
          for (let col = 0; col < size; col++)
            power += grid[x + row][y + col]

        if (power > largest.power) largest = { x, y, power, size }
      }

  return `${largest.x},${largest.y},${largest.size}`;
}

console.log(`Part Two Answer: ${getAnyLargest()}`)