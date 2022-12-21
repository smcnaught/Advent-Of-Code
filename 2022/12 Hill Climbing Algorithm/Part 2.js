const formatter = require('../../shared/formatting/format-puzzle-input');
let grid = [];
let startCoords;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map((line, index) => {
  let lineArr = line.split('');
  for (let i = 0; i < lineArr.length; i++) {
    if (!grid[index]) grid[index] = [];
    // swap start and finish (reverse search) and look for nearest valid 'a'
    if (lineArr[i] === 'S') lineArr[i] = 'E'
    else if (lineArr[i] === 'E') {
      lineArr[i] = 'S';
      startCoords = [index, i];
    }
    grid[index][i] = lineArr[i];
  }
})

function findShortestPath(startCoordinates, grid) {
  [distanceFromTop, distanceFromLeft] = startCoordinates;
  const startLocation = {
    distanceFromTop,
    distanceFromLeft,
    path: [],
    status: 'Start',
    sym: grid[distanceFromTop][distanceFromLeft]
  }

  let queue = [startLocation];
  while (queue.length > 0) {
    const currentLocation = queue.shift();
    const directions = ["North", "East", "South", "West"];
    for (dir in directions) {
      let newLocation = exploreInDirection(currentLocation, directions[dir], grid);
      if (newLocation.status === 'Goal') return newLocation.path;
      else if (newLocation.status === 'Valid') queue.push(newLocation);
    }
  }

  return 'No valid path';
}

function exploreInDirection(currentLocation, direction, grid) {
  let newPath = currentLocation.path.slice();
  newPath.push(direction);
  [distFromTop, distFromLeft] = [currentLocation.distanceFromTop, currentLocation.distanceFromLeft]

  if (direction === 'North') distFromTop--;
  else if (direction === 'East') distFromLeft++;
  else if (direction === 'South') distFromTop++;
  else if (direction === 'West') distFromLeft--;

  let sym = grid[distFromTop] ? grid[distFromTop][distFromLeft] : null
  let newLocation = {
    distanceFromTop: distFromTop,
    distanceFromLeft: distFromLeft,
    path: newPath,
    status: null,
    sym: sym
  }

  newLocation.status = locationStatus(currentLocation, newLocation, grid);
  if (newLocation.status === 'Valid') grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  return newLocation;
}

function locationStatus(currentLocation, newLocation, grid) {
  [gridHeight, gridWidth] = [grid.length, grid[0].length];
  [distFromTop, distFromLeft] = [newLocation.distanceFromTop, newLocation.distanceFromLeft]
  let locationNotOnGrid = distFromLeft < 0 || distFromLeft >= gridWidth || distFromTop < 0 || distFromTop >= gridHeight;
  if (locationNotOnGrid) return 'Invalid';

  const passedElevationCheck = passElevationCheck(currentLocation.sym, newLocation.sym);
  if (grid[distFromTop][distFromLeft] === 'E' && passedElevationCheck) return 'Goal';
  else if (grid[distFromTop][distFromLeft] === 'Visited') return 'Blocked';
  else if (passedElevationCheck) return newLocation.sym === 'a' ? 'Goal' : 'Valid';
}

function passElevationCheck(currentVal, nextVal) {
  const currentElevation = currentVal === 'S' ? 26 : (currentVal.charCodeAt(0) - 96);
  const nextElevation = nextVal === 'S' ? 26 : nextVal === 'E' ? 1 : (nextVal.charCodeAt(0) - 96);
  return (currentElevation - nextElevation) <= 1;
}

const shortestPath = findShortestPath(startCoords, grid);
console.log(`Part Two Answer: ${shortestPath.length}`);