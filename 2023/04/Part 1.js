const formatter = require('../../shared/formatting/format-puzzle-input');
let cards = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let pileWorth = 0
cards.forEach(card => {
  let cardPoints = 0
  let allNums = card.replace(/Card \s \d+: /g, '').split('|')
  ;[winningNums, myNums] = [allNums[0].trim().split(' ').map(Number), allNums[1].trim().split(' ').map(Number)]
  myNums.forEach(myNum => {
    if (myNum !== 0 && winningNums.includes(myNum)) cardPoints = cardPoints === 0 ? 1 : cardPoints * 2
  })
  pileWorth += cardPoints
})
console.log(`Part One Answer: ${pileWorth}`)