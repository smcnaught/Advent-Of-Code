let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let niceStrings = 0;
let allStrings = input.replace(/\r/g, '').split('\n').filter(x => checkTwoDuplicatePairs(x));

// if the string contains a pair of any two letters that appear at least twice w/o overlapping, then check second parameter.
function checkTwoDuplicatePairs(myString)
{
  let pairsArr = [];
  let stringArr = myString.split("");

  for (let i = 0; i < stringArr.length - 1; i++)
  {
    if (stringArr[i] === stringArr[i + 1] && stringArr[i] === stringArr[i + 2]) { }
    else pairsArr.push(stringArr[i] + stringArr[i + 1]);
  }

  let sorted = pairsArr.sort();
  for (let i = 0; i < sorted.length; i++)
  {
    if (sorted[i] === sorted[i - 1] || sorted[i] === sorted[i + 1])
    {
      checkOneRepeatLetterWithOneInBetween(myString);
      break;
    }
  }
}

// It contains at least one letter which repeats with exactly one letter between
// example: xyx, abcdefeghi (efe), or even aaa.
function checkOneRepeatLetterWithOneInBetween(myString)
{
  let stringArr = myString.split("");
  for (let i = 0; i < stringArr.length; i++)
  {
    if (stringArr[i] === stringArr[i + 2])
    {
      niceStrings++;
      break;
    }
  }
}

console.log(`Part Two Answer: ${niceStrings}`);