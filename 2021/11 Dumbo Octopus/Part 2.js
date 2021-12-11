const formatter = require('../../shared/formatting/format-puzzle-input');
let flashes = 0;
let y = {}; // { 0(y): [5,4,8,3...], 1(y): [2,7,2,6...]}
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(((num, index) => {
  const octArr = num.split('');
  octArr.forEach((oct, ind) => {
    if (!y[index]) y[index] = [];
    y[index].push({ x: ind, y: index, val: +oct, flashed: false })
  })
}))

function increaseAdjByOne(xInd, yInd) {
  let moreAdjToChange = [];
  let allDirs = [
    y[yInd - 1] && y[yInd - 1][xInd - 1] ? y[yInd - 1][xInd - 1] : null,
    y[yInd - 1] && y[yInd - 1][xInd] ? y[yInd - 1][xInd] : null,
    y[yInd - 1] && y[yInd - 1][xInd + 1] ? y[yInd - 1][xInd + 1] : null,
    y[yInd + 1] && y[yInd + 1][xInd - 1] ? y[yInd + 1][xInd - 1] : null,
    y[yInd + 1] && y[yInd + 1][xInd] ? y[yInd + 1][xInd] : null,
    y[yInd + 1] && y[yInd + 1][xInd + 1] ? y[yInd + 1][xInd + 1] : null,
    y[yInd] && y[yInd][xInd - 1] ? y[yInd][xInd - 1] : null,
    y[yInd] && y[yInd][xInd + 1] ? y[yInd][xInd + 1] : null,
  ]

  allDirs.forEach(dir => {
    if (dir) {
      dir.val++;
      if (dir.val > 9 && !dir.flashed) {
        flashes++;
        dir.flashed = true;
        moreAdjToChange.push({ x: dir.x, y: dir.y })
      }
    }
  })

  let i = moreAdjToChange.length
  while (i--) {
    increaseAdjByOne(moreAdjToChange[i].x, moreAdjToChange[i].y);
    moreAdjToChange.splice(i, 1); 
  }
}

function increaseAllByOne() {
  Object.keys(y).forEach((key, yInd) => {
    for (let i = 0; i < 10; i++) {
      y[key][i].val++;

      if (y[key][i].val > 9 && !y[key][i].flashed) {
        y[key][i].flashed = true;
        flashes++;
        increaseAdjByOne(i, yInd);
      }
    }
  })
}

function resetAllFlashedToZero() {
  let countFlashed = 0;
  Object.keys(y).forEach((key, yInd) => {
    for (let i = 0; i < 10; i++) {
      if (y[key][i].flashed) {
        countFlashed++;
        y[key][i].val = 0;
        y[key][i].flashed = false;
      }
    }
  })

  return countFlashed === 100;
}

function runSingleStep() {
  increaseAllByOne()
  const allFlashed = resetAllFlashedToZero();
  return allFlashed;
}

function runAllSteps() {
  let stepCount = 0;
  let allFlashed = false;
  while (!allFlashed) {
    stepCount++;
    allFlashed = runSingleStep();
  }

  console.log(`Part Two Answer: ${stepCount}`);
}

runAllSteps();