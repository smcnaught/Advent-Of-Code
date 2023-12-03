const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
sum = 0
const nums = {"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}
data.forEach(d => {
  [firstInd, lastInd, firstNum, lastNum] = [Number.MAX_SAFE_INTEGER, 0, "", ""]
  Object.keys(nums).forEach(n => {
    inds = [d.indexOf(n), d.lastIndexOf(n)]
    inds.forEach(ind => {
      if (ind !== -1 && ind < firstInd) {
        firstNum = nums[n]
        firstInd = ind
      }
      if (ind !== -1 && ind > lastInd) {
        lastNum = nums[n]
        lastInd = ind
      }
    })
  })

  if (lastNum == "") lastNum = firstNum
  sum += +(`${firstNum}${lastNum}`)
})

console.log(`Part Two Answer: ${sum}`);