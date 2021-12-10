const formatter = require('../../shared/formatting/format-puzzle-input');
let allY = {}; // { 0(y): [2, 1, 9, 9, 9...], 1(y): [3, 9, 8, 7, 8...]}
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(((num, index) => allY[index] = num.split('')))

function getLowPointLocations() {
  let lowPointLocations = [];
  const tooHighNum = 10;
  Object.entries(allY).forEach(([yVal, xVals], yIndex) => {
    xVals.forEach((xVal, xIndex) => {
      [up, down, left, right] = [
        allY[yIndex - 1] ? (+allY[yIndex - 1][xIndex] >= 0 ? +allY[yIndex - 1][xIndex] : tooHighNum) : tooHighNum, 
        allY[yIndex + 1] ? (+allY[yIndex + 1][xIndex] >= 0 ? +allY[yIndex + 1][xIndex] : tooHighNum) : tooHighNum, 
        allY[yIndex] ? (+allY[yIndex][xIndex - 1] >= 0 ? +allY[yIndex][xIndex - 1] : tooHighNum) : tooHighNum, 
        allY[yIndex] ? (+allY[yIndex][xIndex + 1] >= 0 ? +allY[yIndex][xIndex + 1] : tooHighNum) : tooHighNum
      ]

      xVal = +xVal;
      if (xVal < up && xVal < down && xVal < left && xVal < right) {
        lowPointLocations.push({ x: xIndex, y: yIndex });
      }
    })
  })
  return lowPointLocations;
}

function getDownsUntilNine(yArr, y, x) {
  let downsUntilNine = [];
  for (let yIndex = y + 1; yIndex < yArr.length; yIndex++) {
    const nextDown = (yArr[yIndex] && yArr[yIndex][1] && yArr[yIndex][1][x]) ? yArr[yIndex][1][x] : '9';
    if (nextDown !== '9') {
      downsUntilNine.push({ x: x, y: yIndex, value: nextDown });
      allY[yIndex][x] = '9';
    }
    else break;
  }

  return downsUntilNine;
}

function getUpsUntilNine(yArr, y, x) {
  let upsUntilNine = [];
  for (let yIndex = y - 1; yIndex >= 0; yIndex--) {
    const nextUp = (yArr[yIndex] && yArr[yIndex][1] && yArr[yIndex][1][x]) ? yArr[yIndex][1][x] : '9';
    if (nextUp !== '9') {
      upsUntilNine.push({ x: x, y: yIndex, value: nextUp });
      allY[yIndex][x] = '9';
    }
    else break;
  }

  return upsUntilNine;
}

function getRightsUntilNine(yArr, y, x) {
  let rightsUntilNine = [];

  for (let xIndex = x + 1; xIndex < yArr[y][1].length; xIndex++) {
    const nextRight = (yArr[y] && yArr[y][1] && yArr[y][1][xIndex]) ? yArr[y][1][xIndex] : '9';
    if (nextRight !== '9') {
      rightsUntilNine.push({ x: xIndex, y: y, value: nextRight })
      allY[y][xIndex] = '9';
    }
    else break;
  }

  return rightsUntilNine;
}

function getLeftsUntilNine(yArr, y, x) {
  let leftsUntilNine = [];

  for (let xIndex = x - 1; xIndex >= 0; xIndex--) {
    const nextLeft = (yArr[y] && yArr[y][1] && yArr[y][1][xIndex]) ? yArr[y][1][xIndex] : '9';
    if (nextLeft !== '9') {
      leftsUntilNine.push({ x: xIndex, y: y, value: nextLeft });
      allY[y][xIndex] = '9';
    }
    else break;
  }

  return leftsUntilNine;
}

let neighbors = [];
function recursivelyFindNonNineNeighbors(lp) {
  const yArr = Object.entries(allY);
  neighbors = [
    ...neighbors,
    ...getDownsUntilNine(yArr, lp.y, lp.x),
    ...getUpsUntilNine(yArr, lp.y, lp.x),
    ...getRightsUntilNine(yArr, lp.y, lp.x),
    ...getLeftsUntilNine(yArr, lp.y, lp.x),
  ]

  allY[lp.y][lp.x] = '9';

  neighbors[neighbors.findIndex(n => n.x === lp.x && n.y === lp.y)].checked = true;
  neighbors.forEach(n => {
    if (!n.checked) recursivelyFindNonNineNeighbors(n)
  });

  return neighbors;
}

function getAllBasinSizes(lowPointLocations) {
  let basinSizes = [];
  for (let i = 0; i < lowPointLocations.length; i++) {
    neighbors = [{ x: lowPointLocations[i].x, y: lowPointLocations[i].y }];
    const oneBasin = recursivelyFindNonNineNeighbors(lowPointLocations[i])
    basinSizes.push(oneBasin.length);
    neighbors = [{ x: lowPointLocations[i].x, y: lowPointLocations[i].y }];
  }

  return basinSizes;
}

const lowPointLocations = getLowPointLocations();
let basinSizes = getAllBasinSizes(lowPointLocations).sort((a, b) => a - b);
console.log(`Part Two Answer: ${basinSizes[basinSizes.length - 1] * basinSizes[basinSizes.length - 2] * basinSizes[basinSizes.length - 3]}`);