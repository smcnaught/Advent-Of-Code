let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let allStrings = input.replace(/\r/g, '').split('\n');

let holdingArr = [];
let niceStrings = 0;

for (let i = 0; i < allStrings.length; i++)
{
  holdingArr.push(allStrings[i]);
  let newbee = holdingArr.toString();
  main(newbee);
  holdingArr = [];
}

console.log(`Part One Answer: ${niceStrings}`);

function main(str)
{
  if (getVowels(str) >= 3 && hasRepeatedLetters(str) === true && stringDoesNotInclude(str) === 'nice') niceStrings++; 
}

function getVowels(str)
{
  let m = str.match(/[aeiou]/gi);
  return m === null ? 0 : m.length;
}

function hasRepeatedLetters(str)
{
  let patt = (/([a-z])\1/i);
  return patt.test(str);
}

function stringDoesNotInclude(str)
{
  if (str.includes('ab') || str.includes('cd') || str.includes('pq') || str.includes('xy')) return 'naughty';
  else return 'nice';
}