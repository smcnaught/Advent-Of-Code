const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let sum = 0
data.forEach(d => {
  let nums = d.replace(/\D/g,'').split('')
  sum += +(nums[0] + nums[nums.length - 1])
})

console.log(`Part One Answer: ${sum}`);