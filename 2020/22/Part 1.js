const formatter = require('../../shared/formatting/format-puzzle-input');
const isSample = true;
let data = new formatter.Formatter(__dirname, isSample).getArrayOfStringsByLine().filter(e => e !== "");
let playerOne = data.slice(1, data.indexOf("Player 2:")).map(Number);
let playerTwo = data.slice(data.indexOf("Player 2:") + 1, data.length).map(Number);
let multiplier = playerOne.length + playerTwo.length;
let round = 0;

const gameStillOn = (p1, p2) => p1.length > 0 && p2.length > 0;

while (gameStillOn(playerOne, playerTwo))
{
  round++;

  const p1Card = playerOne[0];
  const p2Card = playerTwo[0];
  
  if (p1Card > p2Card)
  {
    playerOne.push(playerOne.shift(), p2Card);
    playerTwo.shift();
  }
  else
  {
    playerTwo.push(playerTwo.shift(), p1Card);
    playerOne.shift();
  }

  console.log(`=============================================${ round }===========================================`);
  console.log(`P1:${p1Card}, P2:${p2Card}`);
  console.log(`Player One Deck: ${playerOne}`);
  console.log(`Player Two Deck: ${playerTwo}`);

  if (!gameStillOn(playerOne, playerTwo)) {
    // // get the winning players score.
    const winningPlayer = playerOne.length > 0 ? playerOne : playerTwo;
    let score = 0;
    winningPlayer.forEach(card => {
      score += card * multiplier;
      multiplier--;
    })

    console.log(`Part One Answer: ${score}`);
  }
}