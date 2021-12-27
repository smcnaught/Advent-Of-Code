const formatter = require('../../shared/formatting/format-puzzle-input');
let origY = {};
let biggestY = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(((num, index) => {
  const arr = num.split('');
  const xArr = [];
  arr.forEach((sym, i) => xArr.push({ x: i, sym: sym }))
  origY[index] = xArr;
  if (index > biggestY) biggestY = index;
}));

function oneStep(y) {
  const yClone = JSON.parse(JSON.stringify(y));

  // move east
  for (let yIndex = 0; yIndex < Object.keys(y).length; yIndex++) {
    const xArr = y[yIndex];
    for (let xIndex = 0; xIndex < xArr.length; xIndex++) {
      const currentIsEast = y[yIndex][xIndex].sym === '>';
      const nextIndex = xIndex === xArr.length - 1 ? 0 : (xIndex + 1);
      
      if (currentIsEast && y[yIndex][nextIndex].sym === '.') {
        yClone[yIndex][nextIndex].sym = '>';
        yClone[yIndex][xIndex].sym = '.';
      }
    }
  }

  const yClone2 = JSON.parse(JSON.stringify(yClone));
  // move south
  for (let yIndex = 0; yIndex < Object.keys(y).length; yIndex++) {
    const xArr = y[yIndex];
    for (let xIndex = 0; xIndex < xArr.length; xIndex++) {
      const currentIsSouth = y[yIndex][xIndex].sym === 'v';
      const nextIndex = yIndex === biggestY ? 0 : (yIndex + 1);

      if (currentIsSouth && yClone[nextIndex][xIndex].sym === '.') {
        yClone2[yIndex][xIndex].sym = '.';
        yClone2[nextIndex][xIndex].sym = 'v'
      }
    }
  }

  return [yClone2, JSON.stringify(y) === JSON.stringify(yClone2)];
}

function run(y) {
  let newY = JSON.parse(JSON.stringify(y));
  let step = 0;

  while (true) {
    [newY, noChangesMade] = oneStep(newY);
    step++;
    if (noChangesMade) return step;
  }
}

console.log(`Part One Answer: ${run(origY)}`);