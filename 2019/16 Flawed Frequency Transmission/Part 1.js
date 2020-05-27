let fs = require('fs');
const signal = fs.readFileSync('./input.txt').toString('utf-8').split('').map(Number);
const basePattern = [0, 1, 0, -1];
let allPhases = [];

function setPattern(rowNum, inputLength) {
  let pattern = [];

  while (pattern.length < inputLength)
  {
    for (let i = 0; i < basePattern.length; i++)
    {
      for (let j = 0; j <= rowNum; j++)
      {
        pattern.push(basePattern[i]);
        if (pattern.length === inputLength) break;
      }

      if (pattern.length === inputLength) break;
    }
  }

  // remove first item in pattern
  pattern.shift();
  return pattern;
}


function getNewNumber(row, pattern) {
  let newNum = null;

  for (let i = 0; i < row.length; i++)
  {
    newNum += row[i] * pattern[i];
  }

  if (isNaN(newNum)) console.log('new number did not get set!');
  
  // Then, only the ones digit is kept: 38 becomes 8, -17 becomes 7, and so on.
  return +newNum.toString().split('').pop();
}

function fft(phases, inputList) {
  let oldList = JSON.parse(JSON.stringify(inputList));
  let newList = [];
  
  for (let i = 0; i < phases; i++) {
    
    for (let k = 0; k < oldList.length; k++) {
      let pattern = setPattern(k, oldList.length + 1);

      let newNum = getNewNumber(oldList, pattern);
      newList.push(newNum)
    }

    allPhases.push(newList.join(''));

    // prepare for next phase.
    oldList = JSON.parse(JSON.stringify(newList));
    newList = [];
  }
}

fft(100, signal);
console.log(`Part One Answer: ${allPhases[allPhases.length - 1].toString().substring(0, 8)}`);