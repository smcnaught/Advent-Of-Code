const formatter = require('../../shared/formatting/format-puzzle-input');
let children = [];
let singles = [];
new formatter.Formatter(__dirname)
  .get2DArrayOfStrings(' ')
  .map((subArr) => {
    if (subArr.length > 2) {
      for (let i = 3; i < subArr.length; i++) children.push(subArr[i].replace(/[,]/g, ''))
    }

    singles.push(subArr[0].replace(/[,]/g, ''))
  })

singles.forEach(el => {
  if (!children.includes(el)) console.log(`Part One Answer: ${el}`)
})