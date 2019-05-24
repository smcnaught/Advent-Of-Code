/**
 * ** Change serialNumber to your input **
 */
const serialNumber = 3031;

// make grid
let grid = [];
let coordsOnly = [];
for (let y = 1; y < 301; y++) {
  for (let x = 1; x < 301; x++) {
    grid.push({ x: x, y: y, powerLevel: 0 });
    coordsOnly.push(x, y);
  }
}

const calcPowerLevel = (x, y) => {
  let rackID = x + 10;
  let powerLevelStart = ((rackID * y + serialNumber) * rackID).toString();
  return parseInt(powerLevelStart[powerLevelStart.length - 3]) - 5;
}

for (let x = 1; x < 300; x++) {
  grid[x] = [];
  for (let y = 1; y < 300; y++)
    grid[x][y] = calcPowerLevel(x, y);
}

function getPowerLevel(cell) // cell looks like: { x: x, y: y, powerLevel: 0 }
{
  // Find the fuel cell's rack ID, which is its X coordinate plus 10.
  let rackID = cell.x + 10;

  // Begin with a power level of the rack ID times the Y coordinate.
  let startingPowerLevel = rackID * cell.y;

  // Increase the power level by the value of the grid serial number(your puzzle input).
  let plusSerial = startingPowerLevel + serialNumber;

  // Set the power level to itself multiplied by the rack ID.
  let powerLevel = plusSerial * rackID;

  // Keep only the hundreds digit of the power level(so 12345 becomes 3; numbers with no hundreds digit become 0).
  let hundredDigit = Math.abs(powerLevel / 100 % 10);
  let wholeNum = Math.floor(hundredDigit);

  // Subtract 5 from the power level.
  return wholeNum - 5;
}

let currentLargestCell = []; // { x: 1, y: 1, power3X3: 29 } push the x, y coordinate of the top-left cell with the largest total power in a 3x3 square
let currentHighestPower = 0; // number representing the current highest 3X3 power ONLY 
function getLargest() {
  // loop through the grid
  for (let i = 0; i < grid.length; i++) // grid[i] === { x: x, y: y, powerLevel: 0 }
  {
    // given the current xy coordinate of i, get the 3X3 square's total power
    let power3X3 = 0;
    let startingX = grid[i].x;
    let startingY = grid[i].y;
    power3X3 += grid[i].powerLevel;

    // loop through the grid again to find all these points in the 3X3 and then add their powerLevel to power3X3
    for (let j = 0; j < grid.length; j++) {
      let current = grid[j];

      if (current.x === startingX) {
        // next point is : [x, y + 1] - - [1, 2] || [x, y + 2] - - [1, 3] (this is top-left cell)
        if (current.y === startingY + 1 || current.y === startingY + 2) power3X3 += current.powerLevel;
      }
      else if (current.x === startingX + 1) {
        // next point is : [x + 1, y] - - [2, 1] || [x + 1, y + 1] -- [2, 2] || [x + 1, y + 2] - - [2, 3]
        if (current.y === startingY || current.y === startingY + 1 || current.y === startingY + 2) power3X3 += current.powerLevel;
      }
      else if (current.x === startingX + 2) {
        // next point is : [x + 2, y] - - [3, 1] || [x + 2, y + 1] - - [3, 2] || [x + 2, y + 2] - - [3, 3]
        if (current.y === startingY || current.y === startingY + 1 || current.y === startingY + 2) power3X3 += current.powerLevel;
      }
    }

    if (power3X3 > currentHighestPower) {
      currentHighestPower = power3X3;
      currentLargestCell.push({ x: startingX, y: startingY, power3X3: power3X3 })
    }
  }

  return currentLargestCell[currentLargestCell.length - 1];
}

function run() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].powerLevel = getPowerLevel(grid[i])
  }

  let partOneAnswer = getLargest();
  console.log(`Part One Answer: ${partOneAnswer.x}, ${partOneAnswer.y}`);
}

run();