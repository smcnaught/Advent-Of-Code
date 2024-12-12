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
function updateIsCorrect(update) {
  let updateCorrect = true;

  for (let i = 0; i < update.length; i++) {
    let beforeCurrent = update.slice(0, i)
    let current = update[i]
    const rulesForCurrentNum = rules[current] || []
    for (let j = 0; j < beforeCurrent.length; j++) {
      if (rulesForCurrentNum.includes(beforeCurrent[j])) updateCorrect = false;
    }
  }
  return updateCorrect
}

function fixAndGetMiddle(update) {
  for (let i = 1; i < update.length; i++) {
    let currentNum = update[i]
    let beforeCurrent = update.slice(0, i)
    for (let j = 0; j < beforeCurrent.length; j++) {
      let prev = beforeCurrent[j]
      if (rules[currentNum] && rules[currentNum].includes(prev)) {
        fixedUpdate = moveElement(update, i, j)
        if (updateIsCorrect(fixedUpdate)) return fixedUpdate[Math.floor(fixedUpdate.length / 2)];
        else return fixAndGetMiddle(fixedUpdate);
      }
    }
  }
}

function moveElement(array, oldIndex, newIndex) {
  const [element] = array.splice(oldIndex, 1);
  array.splice(newIndex, 0, element);
  return array;
}

updates.forEach(update => {
  if (!updateIsCorrect(update)) middleSum += fixAndGetMiddle(update)
})

console.log(`Part Two Answer: ${middleSum}`);