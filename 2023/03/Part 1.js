const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let sum = 0
data.forEach((line, row) => {
  let wholeNum = ''
  let startingPos = null

  line.forEach((d, pos) => {
    if (!isNaN(d)) {
      if (wholeNum === '') startingPos = pos
      wholeNum+=d
    }
    if (isNaN(d) || pos == line.length - 1) {
      check(wholeNum, data, startingPos, pos, row)
      wholeNum = ''
    }
  })
})

function check(wholeNum, data, startingPos, pos, row) {
  isPartNum = false
  if (wholeNum !== '') {
    endingPos = (pos - 1) >= 0 ? (pos - 1) : 0
    ;[itemRight, itemLeft, rowAbove, rowBelow] = [data[row][endingPos+1], data[row][startingPos-1], data[row - 1], data[row + 1]]

    if ((itemRight && isNaN(itemRight) && itemRight !== '.') || (itemLeft && isNaN(itemLeft) && itemLeft !== '.')) isPartNum = true
    else {
      let rowsToCheck = []
      if (row !== 0) rowsToCheck.push(rowAbove)
      if (row !== data.length - 1) rowsToCheck.push(rowBelow)
  
      for (let i = 0; i < rowsToCheck.length; i++) {
        currentRow = rowsToCheck[i]
        for (let j = startingPos - 1; j <= endingPos + 1; j++) {
          current = currentRow[j]
          if (current && isNaN(current) && current !== '.') isPartNum = true
        }
      }
    }

    if (isPartNum) sum += +wholeNum
  }
}

console.log(`Part One Answer: ${sum}`)