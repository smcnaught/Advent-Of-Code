const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let uniqueSeatIDs = [];

data.forEach(d => {
  let rowMin = 0;
  let rowMax = 127;
  let row;

  for (let i = 0; i < 6; i++) {
    if (d[i] === 'F') rowMax = Math.floor(((rowMax - rowMin) / 2) + rowMin);
    else if (d[i] === 'B') rowMin = Math.round(((rowMax - rowMin) / 2) + rowMin);
  }

  row = d[6] === 'F' ? rowMin : rowMax;

  let columnMin = 0;
  let columnMax = 7;
  let column;

  for (let j = 7; j < 9; j++) {
    if (d[j] === 'L') columnMax = Math.floor(((columnMax - columnMin) / 2) + columnMin);
    else if (d[j] === 'R') columnMin = Math.round(((columnMax - columnMin) / 2) + columnMin);
  }

  column = d[9] === 'L' ? columnMin : columnMax;

  const uniqueSeatID = (row * 8) + column;
  uniqueSeatIDs.push(uniqueSeatID);
})

console.log(`Part One Answer: ${uniqueSeatIDs.sort((a, b) => b - a)[0]}`);