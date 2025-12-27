const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsSplitByChar(',');
let invalidStrings = 0;
data.forEach(range => {
  nums = range.split('-')
  start = +nums[0]
  end = +nums[1]

  for (let i = start; i <= end; i++) {
    myString = i.toString();
    const partOne = myString.slice(0, myString.length / 2)
    const partTwo = myString.slice(myString.length / 2, myString.length)
    if (partOne === partTwo) invalidStrings += i;
  }
})

console.log(`Part One Answer: ${invalidStrings}`);