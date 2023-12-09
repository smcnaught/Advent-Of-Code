const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let sum = 0
data.forEach((line, row) => {
  wholeNum = ''
  startingPos = null
  endingPos = null

  line.forEach((d, pos) => {
    if (!isNaN(d)) {
      if (wholeNum === '') startingPos = pos
      wholeNum+=d

      if (pos == line.length - 1) {
        check(wholeNum, data, startingPos, pos, row)
        if (wholeNum !== '') wholeNum = ''
      }
    }
    else {
      check(wholeNum, data, startingPos, pos, row)
      if (wholeNum !== '') wholeNum = ''
    }
  })
})

function check(wholeNum, data, startingPos, pos, row) {
  isPartNum = false
  if (wholeNum !== '') {
    endingPos = (pos - 1) >= 0 ? (pos - 1) : 0
    if (row !== 0) {
      // check above
      rowAbove = data[row - 1]
      for (let i = startingPos; i <= endingPos; i++) {
        currentAbove = rowAbove[i]
        if (currentAbove && isNaN(currentAbove) && currentAbove !== '.') {
          console.log(`above is part: ${currentAbove}`)
          isPartNum = true
        }
      }

      // get diags above
      for (let i = startingPos - 1; i <= endingPos + 1; i++) {
        upDiag = rowAbove[i]
        if (upDiag && isNaN(upDiag) && upDiag !== '.') {
          console.log(`above diag is part: ${upDiag}`)
          isPartNum = true
        }
      }
    }
    if (row !== data.length - 1) {
      // check below
      rowBelow = data[row + 1]
      for (let i = startingPos; i <= endingPos; i++) {
        currentBelow = rowBelow[i]
        if (currentBelow && isNaN(currentBelow) && currentBelow !== '.') {
          console.log(`below is part: ${currentBelow}`)
          isPartNum = true
        }

        // get diags below
        for (let i = startingPos - 1; i <= endingPos + 1; i++) {
          downDiag = rowBelow[i]
          if (downDiag && isNaN(downDiag) && downDiag !== '.') {
            console.log(`down diag is part: ${downDiag}`)
            isPartNum = true
          }
        }
      }
    }

    itemRight = data[row][endingPos+1]
    itemLeft = data[row][startingPos-1]

    if (
      (itemRight && isNaN(itemRight) && itemRight !== '.') ||
      (itemLeft && isNaN(itemLeft) && itemLeft !== '.')
    ) {
      isPartNum = true
      console.log(`right or left is part: ${itemLeft}  ${itemRight}`)
    }

    if (isPartNum) {
      sum += +wholeNum
      // console.log(wholeNum)
    }
  }
}

console.log(sum)

// 540131 = right