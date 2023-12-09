// A gear is any * symbol that is adjacent to exactly two part numbers.
// Its gear ratio is the result of multiplying those two numbers together.

const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
const r = /\d+/g;
let sum = 0
data.forEach((line, row) => {
  wholeNum = ''
  startingPos = null
  endingPos = null

  line.forEach((d, pos) => {
    if (d === "*") {
      let numsAboveBelow = getWholeNumsAboveBelow(data, row, pos)
      let numsLeftRight = getWholeNumsSides(data[row], pos)
      let uniq = [...numsAboveBelow, ...numsLeftRight]
      // uniq = [...new Set([...numsAboveBelow, ...numsLeftRight])]
      if (uniq.length == 2) {
        res = uniq.reduce((a, b) => +a * +b)
        console.log(uniq, res)
        sum+= res
      }
      else {
        console.log(uniq)
      }
    }
  })
})

function getWholeNumsAboveBelow(data, rowId, pos) {
  let nums = []
  let rowAbove = data[rowId - 1] || []
  // ;[leftAbove, above, rightAbove] = [rowAbove[pos-1], rowAbove[pos], rowAbove[pos+1]]
  let strRowAbove = rowAbove.join('')
  const allInRowAbove = strRowAbove.match(r)
  const indOfNumsInRowAbove = []
  while ((match = r.exec(strRowAbove)) != null) {
    indOfNumsInRowAbove.push(match.index)
  }


  if (allInRowAbove) {
    for (let i = 0; i < allInRowAbove.length; i++) {
      // let startingPos = strRowAbove.indexOf(allInRowAbove[i])
      let startingPos = indOfNumsInRowAbove[i]
      let numLength = allInRowAbove[i].length
      let endingPos = startingPos + (numLength - 1)
  
      if (
        (startingPos >= pos - 1 && startingPos <= pos + 1) ||
        (endingPos >= pos - 1 && endingPos <= pos + 1)
      ) {
        nums.push(allInRowAbove[i])
      }
    }
  }
  
  let rowBelow = data[rowId + 1] || []
  let strRowBelow = rowBelow.join('')
  const allInRowBelow = strRowBelow.match(r)

  const indOfNumsInRowBelow = []
  while ((match = r.exec(strRowBelow)) != null) {
    indOfNumsInRowBelow.push(match.index)
  }

  if (allInRowBelow) {
    for (let i = 0; i < allInRowBelow.length; i++) {
      // let startingPos = strRowBelow.indexOf(allInRowBelow[i])
      let startingPos = indOfNumsInRowBelow[i]
      let numLength = allInRowBelow[i].length
      let endingPos = startingPos + (numLength - 1)
  
      if (
        (startingPos >= pos - 1 && startingPos <= pos + 1) ||
        (endingPos >= pos - 1 && endingPos <= pos + 1)
      ) {
        nums.push(allInRowBelow[i])
      }
    }
  }

  return nums
}

function getWholeNumsSides(row, pos) {
  let nums = []

  let strRow = row.join('')
  const allInRow = strRow.match(r)
  const indOfNumsInRowSides = []
  while ((match = r.exec(strRow)) != null) {
    indOfNumsInRowSides.push(match.index)
  }


  if (allInRow) {
    for (let i = 0; i < allInRow.length; i++) {
      // let startingPos = strRow.indexOf(allInRow[i])
      let startingPos = indOfNumsInRowSides[i]
      let numLength = allInRow[i].length
      let endingPos = startingPos + (numLength - 1)
      if (
        (startingPos >= pos - 1 && startingPos <= pos + 1) ||
        (endingPos >= pos - 1 && endingPos <= pos + 1)
      ) {
        nums.push(allInRow[i])
      }
    }
  }

  return nums
}


console.log(sum)

// 83039232 = too low