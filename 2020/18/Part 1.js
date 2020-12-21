const formatter = require('../../shared/formatting/format-puzzle-input');
let arrOfLines = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let total = 0;

function sumArray(arr, i) {
  let op = '+';
  let sum = 0;

  arr.forEach(char => {
    if (char.trim() !== "") {
      if (!isNaN(char)) {
        if (op === '+') sum += +char;
        else if (op === '*') sum *= +char;
      }
      else op = char;
    }
  })

  return sum;
}

// loop through string of one line
for (let i = 0; i < arrOfLines.length; i++) {
  let line = arrOfLines[i];
  
  while (line.includes("(")) {
    let currentSum = "";
    let onOpeningParen = false;
    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      
      // find an opening paren
      if (char === "(") {
        // if you find another opening paren, delete the numbers already added (currentSum)
        if (onOpeningParen) currentSum = "";
        onOpeningParen = true;
      }
      else if (onOpeningParen && char === ")") {
        let replaceWith = sumArray(currentSum.split(' '), i);
        line = line.replace(`(${currentSum})`, replaceWith)
        onOpeningParen = false;
        currentSum = "";  
      }
      // add numbers and */+ until you find the closing paren
      else if (onOpeningParen) currentSum += char;
    }
  }

  total += sumArray(line.split(' '));
}

console.log(`Part One Answer: ${total}`);