const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine().filter(e => e !== "");
let playerOne = data.slice(1, data.indexOf("Player 2:")).map(Number);
let playerTwo = data.slice(data.indexOf("Player 2:") + 1, data.length).map(Number);
let multiplier = playerOne.length + playerTwo.length;
let subGame = 1;

let p1PreviousRoundsByGame = {}; // { 1: [], 2: []}
let p2PreviousRoundsByGame = {}; // { 1: [], 2: []}

const gameStillOn = (p1, p2) => p1.length > 0 && p2.length > 0;

function recursiveCombat(playerOne, playerTwo, game) {
  let round = 0;
  
  if (!p1PreviousRoundsByGame.hasOwnProperty(game)) p1PreviousRoundsByGame[game] = [];
  if (!p2PreviousRoundsByGame.hasOwnProperty(game)) p2PreviousRoundsByGame[game] = [];

  while (gameStillOn(playerOne, playerTwo))
  {
    round++;

    console.log(`=============================================GAME:${ game } ROUND:${ round }===========================================`);
    console.log(`Player 1's Deck: ${playerOne}`);
    console.log(`Player 2's Deck: ${playerTwo}`);
    
    const p1Card = playerOne.shift();
    const p2Card = playerTwo.shift();
    
    console.log(`Player 1 plays:${p1Card}`);
    console.log(`Player 2 plays:${p2Card}`);

    if (p1PreviousRoundsByGame[game].includes(playerOne.join('')) || p2PreviousRoundsByGame[game].includes(playerTwo.join(''))) {
      playerOne.push(p1Card, p2Card);
      console.log(`Player 1 wins round ${round} of game ${game}!`);
      continue;
    }
  
    const p1RemainingCards = playerOne.length;
    const p2RemainingCards = playerTwo.length;

    if (p1RemainingCards >= p1Card && p2RemainingCards >= p2Card) {
      let cloneOne = playerOne.slice(0, p1Card);
      let cloneTwo = playerTwo.slice(0, p2Card);
      console.log(`Playing a sub-game to determine the winner...`);
      subGame++;
      let winner = recursiveCombat(cloneOne, cloneTwo, subGame);

      if (winner === 1) {
        playerOne.push(p1Card, p2Card);
        console.log(`Player 1 wins round ${round} of game ${game}!`);
      }
      else {
        playerTwo.push(p2Card, p1Card);
        console.log(`Player 2 wins round ${round} of game ${game}!`);
      }
    }
    else
    {
      if (p1Card > p2Card)
      {
        playerOne.push(p1Card, p2Card);
        console.log(`Player 1 wins round ${round} of game ${game}!`);
      }
      else
      {
        playerTwo.push(p2Card, p1Card);
        console.log(`Player 2 wins round ${round} of game ${game}!`);
      }
    }
  
    if (!gameStillOn(playerOne, playerTwo)) {
      const winner = playerOne.length > 0 ? 1 : 2;  
      console.log(`The winner of game ${game} is player ${winner}!`);
      return winner;
    }
    else {
      p1PreviousRoundsByGame[game].push(playerOne.join(''));
      p2PreviousRoundsByGame[game].push(playerTwo.join(''));
    }
  }
}

const winner = recursiveCombat(playerOne, playerTwo, 1);
getFinalScore = (winner) => {
  const winningPlayer = winner === 1 ? playerOne : playerTwo;
  let score = 0;
  winningPlayer.forEach(card => {
    score += card * multiplier;
    multiplier--;
  })
  return score;
}
console.log(`
---------------------------------------
Part Two Answer: ${getFinalScore(winner)}
---------------------------------------
`);