const formatter = require('../../shared/formatting/format-puzzle-input');
let cards = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let cardCounts = {}
cards.forEach(c => cardCounts[+c.split('Card ').pop().trim().split(':')[0]] = 1)
cards.forEach(card => {
  let cardWins = 0
  let cardId = +card.split('Card ').pop().trim().split(':')[0]
  let allNums = card.replace(/Card \s \d+: /g, '').split('|')
  ;[winningNums, myNums] = [allNums[0].trim().split(' ').map(Number), allNums[1].trim().split(' ').map(Number)]
  myNums.forEach(myNum => {
    if (myNum !== 0 && winningNums.includes(myNum)) cardWins++
  })
  for (let i = cardId+1; i <= (cardId + cardWins); i++) cardCounts[i]+=cardCounts[cardId]
})

let totalCards = 0
Object.values(cardCounts).forEach(v => totalCards += v)
console.log(`Part Two Answer: ${totalCards}`)