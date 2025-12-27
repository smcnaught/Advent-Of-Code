const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsSplitByChar(',');
let invalidStrings = 0;
data.forEach(range => {
  nums = range.split('-')
  start = +nums[0]
  end = +nums[1]

  for (let i = start; i <= end; i++) {
    myString = i.toString();
    let len = myString.length;

    for (let subLen = 1; subLen <= Math.floor(len / 2); subLen++) {
      const substring = myString.slice(0, subLen);
      const repeatCount = len / subLen;
      const repeated = substring.repeat(repeatCount);

      if (repeated === myString) {
        invalidStrings += i;
        break;
      }
    }
  }
});

console.log(`Part Two Answer: ${invalidStrings}`);