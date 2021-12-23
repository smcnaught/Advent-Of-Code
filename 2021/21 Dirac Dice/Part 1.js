let p1 = { position: 0, score: 0 };
let p2 = { position: 0, score: 0 };

const formatter = require('../../shared/formatting/format-puzzle-input');
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(str => {
  let playerInfo = str.split(' ');
  if (playerInfo[1] === '1') p1.position = +playerInfo[4];
  else p2.position = +playerInfo[4];
})

const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function move(currentPosition, stepsToMove) {
  return ((currentPosition + stepsToMove) % positions.length) + 1;
}

let dicePosition = 0;
let totalDieRolls = 0;
function getSumNextThree() {
  totalDieRolls+=3;
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    dicePosition++;
    if (dicePosition > 100) dicePosition = 1;
    sum+=dicePosition;
  }
  return sum;
}

function playGame() {
  while(true) {
    const p1Move = getSumNextThree();
    p1.position = move(p1.position - 1, p1Move);
    p1.score += p1.position;
    if (p1.score >= 1000) return p2.score * totalDieRolls
  
    const p2Move = getSumNextThree();
    p2.position = move(p2.position - 1, p2Move);
    p2.score += p2.position;
    if (p2.score >= 1000) return p1.score * totalDieRolls
  }
}

console.log(`Part One Answer: ${playGame()}`)