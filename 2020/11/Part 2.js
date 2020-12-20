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
        upsIsOccupied(j, i),
        downsIsOccupied(j, i),
        rightsAreOccupied(i, j),
        leftsAreOccupied(i, j),
        diagUpLeftOccupied(j, i),
        diagUpRightOccupied(j, i),
        diagDownLeftOccupied(j, i),
        diagDownRightOccupied(j, i)
      ];

      const noOccupiedSeatsAdj = (
        !up &&
        !down &&
        !right &&
        !left &&
        !diagUpLeft &&
        !diagUpRight &&
        !diagDownLeft &&
        !diagDownRight);

      const fiveOrMoreOccupied = [up, down, right, left, diagUpLeft, diagUpRight, diagDownLeft, diagDownRight].filter((x) => x === true).length >= 5;

      if (currentSeat === emptySeat && noOccupiedSeatsAdj) oneRow.push(occupiedSeat);
      else if (currentSeat === occupiedSeat && fiveOrMoreOccupied) oneRow.push(emptySeat);
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

console.log(`Part Two Answer: ${final.toString().split('').filter(x => x === occupiedSeat).length}`);

// ---------------------------------------------------------------------------------------------------
//                                         HELPER METHODS
// ---------------------------------------------------------------------------------------------------
function upsIsOccupied(pos, stopAt)
{
  let ups = [];
  for (let i = 0; i < stopAt; i++) {
    ups.push(data[i][pos]);
  }
  let rev = ups.reverse();
  return checkOccupied(rev);
}

function downsIsOccupied(pos, startAt) {
  let downs = [];
  for (let i = startAt + 1; i < data.length; i++) {
    downs.push(data[i][pos])
  }
  return checkOccupied(downs);
}

function leftsAreOccupied(pos, startAt) {
  let lefts = [];
  for (let i = startAt - 1; i >= 0; i--) {
    lefts.push(data[pos][i])
  }
  return checkOccupied(lefts);
}

function rightsAreOccupied(pos, startAt) {
  let rights = [];
  for (let i = startAt + 1; i < data[pos].length; i++) {
    rights.push(data[pos][i]);
  }
  return checkOccupied(rights);
}

function diagUpLeftOccupied(pos, startAt) {
  let diagUpLeft = [];
  for (let i = startAt - 1; i >= 0; i--) {
    diagUpLeft.push(data[i][--pos])
  }
  return checkOccupied(diagUpLeft);
}

function diagUpRightOccupied(pos, startAt) {
  let diagUpRight = [];
  for (let i = startAt - 1; i >= 0; i--) {
    diagUpRight.push(data[i][++pos])
  }
  return checkOccupied(diagUpRight);
}

function diagDownLeftOccupied(position, startAt) {
  let diagDownLeft = [];
  for (let i = startAt + 1; i < data.length; i++) {
    if (position > 0) diagDownLeft.push(data[i][--position])
  }
  return checkOccupied(diagDownLeft);
}

function diagDownRightOccupied(posi, startAt) {
  let diagDownRight = [];
  for (let i = startAt + 1; i < data.length; i++) {
    diagDownRight.push(data[i][++posi]);
  }
  return checkOccupied(diagDownRight);
}

function checkOccupied(arr) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === occupiedSeat) return true;
    else if (arr[j] === emptySeat) return false;
  }
  return false;
}