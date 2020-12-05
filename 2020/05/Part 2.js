const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let allSeats = [];

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

  if (allSeats[row]) allSeats[row].push(column);
  else allSeats[row] = [column];
})

for (let i = 0; i < allSeats.length; i++) {
  if (allSeats[i] && allSeats[i].length !== 8 && allSeats[i].length > 2) {
    let missing = 28 - (allSeats[i].reduce((a, b) => a + b, 0));
    const uniqueSeatID = (i * 8) + missing;
    console.log(`Part Two Answer: ${uniqueSeatID}`);
  }
}