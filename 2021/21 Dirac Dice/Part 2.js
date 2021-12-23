let p1 = { position: 0, score: 0 };
let p2 = { position: 0, score: 0 };
let possibles;

const formatter = require('../../shared/formatting/format-puzzle-input');
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(str => {
  let playerInfo = str.split(' ');
  if (playerInfo[1] === '1') p1.position = +playerInfo[4];
  else p2.position = +playerInfo[4];
})

function getPossibilities() {
  let possibilities = {};
  let dice = [1, 2, 3];
  dice.forEach(d1 => {
    dice.forEach(d2 => {
      dice.forEach(d3 => {
        const res = d1 + d2 + d3;
        if (!possibilities[res]) possibilities[res] = 0;
        possibilities[res]++;
      })
    })
  })
  const posArr = Object.keys(possibilities);
  possibles = { all: possibilities, min: Math.min(...posArr), max: Math.max(...posArr) };
}

function playGame(p1, p2, isP1Turn) {
  if (!possibles) getPossibilities();
  let wins = 0;
  const currentPlayer = isP1Turn ? p1 : p2;
  const [cachePosition, cacheScore] = [currentPlayer.position, currentPlayer.score]
  const [p1Won, p2Won] = [p1.score >= 21, p2.score >= 21];
  if (p1Won || p2Won) return p1Won ? 1 : null;
  
  for (let die = possibles.min; die <= possibles.max; die++) {
    currentPlayer.position = ((cachePosition + die - 1) % 10) + 1;
    currentPlayer.score += currentPlayer.position;
    wins += possibles.all[die] * (playGame(p1, p2, !isP1Turn) || 0);
    currentPlayer.position = cachePosition;
    currentPlayer.score = cacheScore;
  }
  return wins;
}

console.log(`Part Two Answer: ${playGame(p1, p2, true)}`)