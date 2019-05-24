let fs = require("fs");
let input = fs.readFileSync('./input.txt').toString().replace(/ players; last marble is worth /g, ',').replace(/ points/g, '').split(',');
let numOfPlayers = +input[0];
let marblePoints = +input[1] * 100;

function getPlayers() {
  let players = []; // [{ id: 1, marblesPlayed: [2, 3, 4], score: 0 }]
  for (let i = 1; i <= numOfPlayers; i++) {
    players.push({ id: i, marblesPlayed: [], score: 0 });
  }
  return players;
}

function getWinningElfsScore() {
  let players = getPlayers();
  let currentPlayer = 0;
  let currentPosition = 0;
  let playedMarbles = [0]; // in order
  let indexOfNext = 0;

  for (let marble = 1; marble <= marblePoints; marble++) {
    // check if marble is a multiple of 23
    let isMult = false;
    if (marble % 23 === 0) isMult = true;

    if (currentPlayer === numOfPlayers) currentPlayer = 0;
    currentPlayer++;

    if (!isMult) {
      for (let j = 0; j < numOfPlayers; j++) {
        if (currentPlayer === players[j]) player.marblesPlayed.push(marble);
      }

      // insert the marble at the correct position. 
      // loop through (and all the way around) the playedMarbles array
      // insert marble at position between marbles that are 1 & 2 marbles clockwise of current
      let atEnd = currentPosition == playedMarbles.length - 1;
      if (atEnd) indexOfNext = 1;
      else indexOfNext = currentPosition + 2;
      playedMarbles.splice(indexOfNext, 0, marble)

      // reset the currentPosition to the position where the current 
      currentPosition = indexOfNext
    }
    else {
      // The marble 7 marbles counter-clockwise from the current position is removed from the circle and also added to the current player's score.
      let index7 = currentPosition - 7;
      if (index7 < 0) index7 += playedMarbles.length;
      let marble7 = playedMarbles[index7];
      playedMarbles.splice(playedMarbles.indexOf(marble7), 1);

      for (let k = 0; k < numOfPlayers; k++) {
        if (currentPlayer === players[k].id) {
          players[k].score += marble;
          players[k].score += marble7;
        }
      }

      // The marble located immediately clockwise of the marble that was removed becomes the new current position.
      currentPosition = index7;
    }
  }

  let answer = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].score > answer) answer = players[i].score;
  }

  return answer;
}

console.log(`Part Two Answer: ${getWinningElfsScore()}`);