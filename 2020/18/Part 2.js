const formatter = require('../../shared/formatting/format-puzzle-input');
let arrOfLines = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let total = 0;

function sumArray(str) {
  let arr = str.split(' ');

  while (str.includes('+')) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '+') {
        [num1, num2] = [+arr[i - 1], +arr[i + 1]];
        let sum = num1 + num2;
        str = str.replace(`${num1} + ${num2}`, sum);
        arr.splice(i - 1, 2);
        arr[i - 1] = sum.toString();
        break;
      }
    }
  }

  while (str.includes('*')) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "*") {
        [num1, num2] = [+arr[i - 1], +arr[i + 1]]
        let sum = num1 * num2;
        str = str.replace(`${num1} * ${num2}`, sum);
        arr.splice(i - 1, 2);
        arr[i - 1] = sum.toString();
        break;
      }
    }
  }

  return +str;
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
        let replaceWith = sumArray(currentSum);
        line = line.replace(`(${currentSum})`, replaceWith)
        onOpeningParen = false;
        currentSum = "";
      }
      // add numbers and */+ until you find the closing paren
      else if (onOpeningParen) currentSum += char;
    }
  }

  total += sumArray(line);
}

console.log(`Part Two Answer: ${total}`);