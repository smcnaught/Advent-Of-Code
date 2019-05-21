let fs = require('fs');
let raw = fs.readFileSync('./input.txt').toString('utf-8');
let array = raw.replace(/\r/g, '').split('\n');

let gotPartTwoAnswer = false;
let getCommonLetters = (a, b) => {
  let partTwoAnswer = "";
  for (let i = 0; i < a.length; i++)
  {
    if (a[i] === b[i]) partTwoAnswer += a[i];
  }
  return partTwoAnswer;
}

let compareTwoArrs = (first, second) => {
  let numNotEqual = 0;

  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) numNotEqual++;
  }

  if (numNotEqual == 1) {
    console.log(`Part Two Answer: ${getCommonLetters(first.join().replace(/,/g, ''), second.join().replace(/,/g, ''))}`);
    gotPartTwoAnswer = true;
  }
}

let compareBox = (boxArr) => {
  for (let i = 0; i < array.length; i++) {
    let compareTo = array[i].split("");
    compareTwoArrs(boxArr, compareTo);
  }
}

for (let box of array) {
  compareBox(box.split(''));
  if (gotPartTwoAnswer) break;
}