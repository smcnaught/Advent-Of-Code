const formatter = require('../../shared/formatting/format-puzzle-input');

let data = new formatter.Formatter(__dirname).get2DArrayOfStrings().map(e => e[0].split(''));
const emptySeat = "L";
const occupiedSeat = "#";

let goAnotherRound = true;
let allRounds = [];
let final = [];

while (goAnotherRound) {
  let oneRound = [];

  for (let i = 0; i < data.length; i++) { // loop through each row
    let row = data[i];
    let oneRow = [];

    for (let j = 0; j < row.length; j++) { // loop through each seat in current row
      [currentSeat, up, down, right, left, diagUpLeft, diagUpRight, diagDownLeft, diagDownRight] = [
        (data[i][j]), // currentSeat
        (data[i - 1] ? data[i - 1][j] : undefined), // up
        (data[i + 1] ? data[i + 1][j] : undefined), // down
        (data[i] ? data[i][j + 1] : undefined), // right
        (data[i] ? data[i][j - 1] : undefined), // left
        (data[i - 1] ? data[i - 1][j - 1] : undefined), // diagUpLeft
        (data[i - 1] ? data[i - 1][j + 1] : undefined), // diagUpRight
        (data[i + 1] ? data[i + 1][j - 1] : undefined), // diagDownLeft
        (data[i + 1] ? data[i + 1][j + 1] : undefined), // diagDownRight
      ];

      const noOccupiedSeatsAdj = (
        up !== occupiedSeat &&
        down !== occupiedSeat &&
        right !== occupiedSeat &&
        left !== occupiedSeat &&
        diagUpLeft !== occupiedSeat &&
        diagUpRight !== occupiedSeat &&
        diagDownLeft !== occupiedSeat &&
        diagDownRight !== occupiedSeat);

      const fourOrMoreOccupied = [up, down, right, left, diagUpLeft, diagUpRight, diagDownLeft, diagDownRight].filter((x) => x === occupiedSeat).length >= 4;

      if (currentSeat === emptySeat && noOccupiedSeatsAdj) oneRow.push(occupiedSeat);
      else if (currentSeat === occupiedSeat && fourOrMoreOccupied) oneRow.push(emptySeat);
      else oneRow.push(currentSeat);
    }

    oneRound.push(oneRow);
  }

  allRounds.push(oneRound);

  if (roundsRepeat()) {
    goAnotherRound = false;
    final = [...oneRound];
  }
  else data = [...oneRound];
}

function roundsRepeat() {
  const repeatExists = true;
  for (let i = 0; i < allRounds.length; i++) {
    let currentRound = allRounds[i];
    for (let j = 0; j < allRounds.length; j++) {
      if (i !== j) {
        let nextRound = allRounds[j];
        if (currentRound.toString() === nextRound.toString()) return repeatExists;
      }
    }
  }
  return !repeatExists;
}

console.log(`Part One Answer: ${final.toString().split('').filter(x => x === occupiedSeat).length}`);