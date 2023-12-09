const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
const r = /\d+/g;
let sum = 0
data.forEach((line, row) => {
  line.forEach((d, pos) => {
    if (d === "*") {
      let allAdj = getAdj(data, row, pos)
      if (allAdj.length == 2) {
        res = allAdj.reduce((a, b) => +a * +b)
        sum += res
      }
    }
  })
})

function getAdj(data, rowId, pos) {
  let nums = []
  const rowAbove = data[rowId - 1] || []
  const rowBelow = data[rowId + 1] || []
  const rowSides = data[rowId]
  let rowsToCheck = [rowAbove, rowBelow, rowSides]

  for (let i = 0; i < rowsToCheck.length; i++) {
    const strCurrentRow = rowsToCheck[i].join('')
    const allInRow = strCurrentRow.match(r)
    let indOfNumsInRow = []
    while ((match = r.exec(strCurrentRow)) != null) indOfNumsInRow.push(match.index)

    if (allInRow) {
      for (let j = 0; j < allInRow.length; j++) {
        let startingPos = indOfNumsInRow[j]
        let numLength = allInRow[j].length
        let endingPos = startingPos + (numLength - 1)
        if ((startingPos >= pos - 1 && startingPos <= pos + 1) || (endingPos >= pos - 1 && endingPos <= pos + 1)) nums.push(allInRow[j])
      }
    }
  }

  return nums
}

console.log(`Part Two Answer: ${sum}`)