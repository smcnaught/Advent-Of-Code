const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let map = { 0: { 0: true } } // where first prop is x val; nested props are y values; booleans = visited by tail;
let headCurrentPos = { x: 0, y: 0 };
let otherKnotsCurrentPos = {
  0: { x: 0, y: 0 },
  1: { x: 0, y: 0 },
  2: { x: 0, y: 0 },
  3: { x: 0, y: 0 },
  4: { x: 0, y: 0 },
  5: { x: 0, y: 0 },
  6: { x: 0, y: 0 },
  7: { x: 0, y: 0 },
  8: { x: 0, y: 0 }, // tail
}

for (let i = 0; i < instructions.length; i++) moveHead(+instructions[i][1], instructions[i][0]);

function moveHead(amountToMove, direction) {
  for (let i = 0; i < amountToMove; i++) {
    switch (direction) {
      case 'R': headCurrentPos.x++; break;
      case 'L': headCurrentPos.x--; break;
      case 'U': headCurrentPos.y--; break;
      case 'D': headCurrentPos.y++; break;
    }
    if (!map[headCurrentPos.x]) map[headCurrentPos.x] = { [headCurrentPos.y]: false }
    if (!map[headCurrentPos.x].hasOwnProperty(headCurrentPos.y)) map[headCurrentPos.x][headCurrentPos.y] = false;
    checkMoveKnots();
  }
}

function checkMoveKnots() {
  for (let i = 0; i < 9; i++) {
    const inFrontKnot = i === 0 ? headCurrentPos : otherKnotsCurrentPos[i - 1];
    const currentOtherKnot = otherKnotsCurrentPos[i];
    const sameRow = inFrontKnot.y === currentOtherKnot.y;
    const sameCol = inFrontKnot.x === currentOtherKnot.x;

    if (!(sameRow && sameCol)) {
      if (sameRow) {
        if (inFrontKnot.x - currentOtherKnot.x > 1) currentOtherKnot.x++;
        else if (inFrontKnot.x - currentOtherKnot.x < -1) currentOtherKnot.x--;
      }
      else if (sameCol) {
        if (inFrontKnot.y - currentOtherKnot.y < -1) currentOtherKnot.y--;
        else if (inFrontKnot.y - currentOtherKnot.y > 1) currentOtherKnot.y++;
      }
      else { /**diagonal moves*/
        if (inFrontKnot.x - currentOtherKnot.x > 0 && inFrontKnot.y - currentOtherKnot.y < -1) {
          currentOtherKnot.y--;
          currentOtherKnot.x++;
        }
        else if (inFrontKnot.x - currentOtherKnot.x < 0 && inFrontKnot.y - currentOtherKnot.y < -1) {
          currentOtherKnot.y--;
          currentOtherKnot.x--;
        }
        else if (inFrontKnot.x - currentOtherKnot.x > 1 && inFrontKnot.y - currentOtherKnot.y < 0) {
          currentOtherKnot.y--;
          currentOtherKnot.x++;
        }
        else if (inFrontKnot.x - currentOtherKnot.x < -1 && inFrontKnot.y - currentOtherKnot.y < 0) {
          currentOtherKnot.y--;
          currentOtherKnot.x--;
        }
        else if (inFrontKnot.x - currentOtherKnot.x < 0 && inFrontKnot.y - currentOtherKnot.y > 1) {
          currentOtherKnot.y++;
          currentOtherKnot.x--;
        }
        else if (inFrontKnot.x - currentOtherKnot.x > 0 && inFrontKnot.y - currentOtherKnot.y > 1) {
          currentOtherKnot.y++;
          currentOtherKnot.x++;
        }
        else if (inFrontKnot.x - currentOtherKnot.x < -1 && inFrontKnot.y - currentOtherKnot.y === 1) {
          currentOtherKnot.y++;
          currentOtherKnot.x--;
        }
        else if (inFrontKnot.x - currentOtherKnot.x > 1 && inFrontKnot.y - currentOtherKnot.y === 1) {
          currentOtherKnot.y++;
          currentOtherKnot.x++;
        }
      }
    }

    if (i === 8) { /**If tail, mark visited spots*/
      if (!map[currentOtherKnot.x]) map[currentOtherKnot.x] = {}
      map[currentOtherKnot.x][currentOtherKnot.y] = true;
    }
  }
}

function getTailVisits() {
  let tailVisits = 0;
  Object.values(map).forEach(mappy => {
    Object.values(mappy).forEach(v => {
      if (v) tailVisits++;
    })
  })
  return tailVisits;
}

console.log(`Part Two Answer: ${getTailVisits()}`);