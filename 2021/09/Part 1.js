const formatter = require('../../shared/formatting/format-puzzle-input');
let y = {}; // { 0(y): [2, 1, 9, 9, 9...], 1(y): [3, 9, 8, 7, 8...]}
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(((num, index) => y[index] = num.split('')))

function getLowPoints() {
  let lowest = [];
  const tooHighNum = 10;
  Object.entries(y).forEach(([yVal, xVals], yIndex) => {
    xVals.forEach((xVal, xIndex) => {
      [up, down, left, right] = [
        y[yIndex - 1] ? (+y[yIndex - 1][xIndex] >= 0 ? +y[yIndex - 1][xIndex] : tooHighNum) : tooHighNum, 
        y[yIndex + 1] ? (+y[yIndex + 1][xIndex] >= 0 ? +y[yIndex + 1][xIndex] : tooHighNum) : tooHighNum, 
        y[yIndex] ? (+y[yIndex][xIndex - 1] >= 0 ? +y[yIndex][xIndex - 1] : tooHighNum) : tooHighNum, 
        y[yIndex] ? (+y[yIndex][xIndex + 1] >= 0 ? +y[yIndex][xIndex + 1] : tooHighNum) : tooHighNum
      ]

      xVal = +xVal;
      if (xVal < up && xVal < down && xVal < left && xVal < right) {
        lowest.push(xVal + 1);
      }
    })
  })
  return lowest;
}

let lowest = getLowPoints();
console.log(`Part One Answer: ${lowest.reduce((prev, cur) => prev + cur)}`)