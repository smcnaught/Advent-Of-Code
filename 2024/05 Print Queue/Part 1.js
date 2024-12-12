const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let rules = { /** 75: [29] - 75 must come before 29. */ }
let updates = []
let findingRules = true;
data.forEach(row => {
  if (row == '') findingRules = false;
  if (findingRules) {
    [before, after] = row.split('|').map(Number)
    if (before in rules) rules[before].push(after)
    else rules[before] = [after]
  }
  else if (row !== '') updates.push(row.split(',').map(Number))
})

let middleSum = 0;
updates.forEach(update => {
  let updateCorrect = true;
  for (let i = 0; i < update.length; i++) {
    let beforeCurrent = update.slice(0, i)
    let current = update[i]
    const rulesForCurrentNum = rules[current] || []

    for (let j = 0; j < beforeCurrent.length; j++) {
      if (rulesForCurrentNum.includes(beforeCurrent[j])) updateCorrect = false;
    }
  }

  if (updateCorrect) {
    const middle = update[Math.floor(update.length / 2)];
    middleSum += middle;
  }
})

console.log(`Part One Answer: ${middleSum}`);