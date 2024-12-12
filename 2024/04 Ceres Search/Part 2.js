const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let count = 0;
for (let i = 0; i < data.length; i++) {
  let currentRow = data[i]
  for (let j = 0; j < currentRow.length; j++) {
    [currentLetter, diagUpLeft1, diagUpRight1, diagDownLeft1, diagDownRight1] = [
      (data[i][j]), // currentLetter
      (data[i - 1] ? data[i - 1][j - 1] : undefined), // diagUpLeft1
      (data[i - 1] ? data[i - 1][j + 1] : undefined), // diagUpRight1
      (data[i + 1] ? data[i + 1][j - 1] : undefined), // diagDownLeft1
      (data[i + 1] ? data[i + 1][j + 1] : undefined), // diagDownRight1
    ];

    if (currentLetter == 'A') {
      crossOne = (diagUpLeft1 && diagDownRight1) ? (diagUpLeft1 + currentLetter + diagDownRight1) : ''
      crossTwo = (diagUpRight1 && diagDownLeft1) ? (diagUpRight1 + currentLetter + diagDownLeft1) : ''
      if ((crossOne === 'SAM' || crossOne === 'MAS') && (crossTwo === 'SAM' || crossTwo === 'MAS')) count++;
    }
  }
}
console.log(`Part Two Answer: ${count}`);