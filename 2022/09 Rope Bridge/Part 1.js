const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let map = { 0: { 0: true } } // where first prop is x val; nested props are y values; booleans = visited by tail;
let headCurrentPos = { x: 0, y: 0 };
let tailCurrentPos = { x: 0, y: 0 };
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
    checkMoveTail();
  }
}

function checkMoveTail() {
  const headAndTailSameRow = headCurrentPos.y === tailCurrentPos.y;
  const headAndTailSameCol = headCurrentPos.x === tailCurrentPos.x;
  if (!(headAndTailSameRow && headAndTailSameCol)) {
    if (headAndTailSameRow) {
      if (headCurrentPos.x - tailCurrentPos.x > 1) tailCurrentPos.x++;
      else if (headCurrentPos.x - tailCurrentPos.x < -1) tailCurrentPos.x--;
    }
    else if (headAndTailSameCol) {
      if (headCurrentPos.y - tailCurrentPos.y < -1) tailCurrentPos.y--;
      else if (headCurrentPos.y - tailCurrentPos.y > 1) tailCurrentPos.y++;
    }
    else { /**diagonal moves*/
      if (headCurrentPos.x - tailCurrentPos.x > 0 && headCurrentPos.y - tailCurrentPos.y < -1) {
        tailCurrentPos.y--;
        tailCurrentPos.x++;
      }
      else if (headCurrentPos.x - tailCurrentPos.x < 0 && headCurrentPos.y - tailCurrentPos.y < -1) {
        tailCurrentPos.y--;
        tailCurrentPos.x--;
      }
      else if (headCurrentPos.x - tailCurrentPos.x > 1 && headCurrentPos.y - tailCurrentPos.y < 0) {
        tailCurrentPos.y--;
        tailCurrentPos.x++;
      }
      else if (headCurrentPos.x - tailCurrentPos.x < -1 && headCurrentPos.y - tailCurrentPos.y < 0) {
        tailCurrentPos.y--;
        tailCurrentPos.x--;
      }
      else if (headCurrentPos.x - tailCurrentPos.x < 0 && headCurrentPos.y - tailCurrentPos.y > 1) {
        tailCurrentPos.y++;
        tailCurrentPos.x--;
      }
      else if (headCurrentPos.x - tailCurrentPos.x > 0 && headCurrentPos.y - tailCurrentPos.y > 1) {
        tailCurrentPos.y++;
        tailCurrentPos.x++;
      }
      else if (headCurrentPos.x - tailCurrentPos.x < -1 && headCurrentPos.y - tailCurrentPos.y === 1) {
        tailCurrentPos.y++;
        tailCurrentPos.x--;
      }
      else if (headCurrentPos.x - tailCurrentPos.x > 1 && headCurrentPos.y - tailCurrentPos.y === 1) {
        tailCurrentPos.y++;
        tailCurrentPos.x++;
      }
    }

    if (!map[tailCurrentPos.x]) map[tailCurrentPos.x] = {}
    map[tailCurrentPos.x][tailCurrentPos.y] = true;
  }
}

function getTailPositionsCount() {
  let tailVisits = 0;
  Object.values(map).forEach(mappy => {
    Object.values(mappy).forEach(v => {
      if (v) tailVisits++;
    })
  })
  return tailVisits;
}

console.log(`Part One Answer: ${getTailPositionsCount()}`);