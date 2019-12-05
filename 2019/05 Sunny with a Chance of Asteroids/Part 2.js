
const fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arr = source.replace(/\r/g, '').split(',').map(Number);
let opCode, partTwoAnswer = null;

while (opCode !== 99) {
  let count = 4;
  for (i = 0; i < arr.length; i += count) {
    let str = arr[i].toString();
    opCode = +str.slice(-2);
    while (str.length < 5) str = "0" + str;
    let mode1 = +str.charAt(2);
    let mode2 = +str.charAt(1);
    let first = mode1 === 0 ? arr[arr[i + 1]] : arr[i + 1];
    let second = mode2 === 0 ? arr[arr[i + 2]] : arr[i + 2];

    switch (opCode) {
      case 1:
        arr[arr[i + 3]] = first + second;
        count = 4;
        break;
      case 2:
        arr[arr[i + 3]] = first * second;
        count = 4;
        break;
      case 3:
        arr[arr[i + 1]] = 5;
        count = 2;
        break;
      case 4:
        partTwoAnswer = first;
        count = 2;
        break;
      case 5:
        if (first !== 0) {
          i = second;
          count = 0;
        }
        else count = 3;
        break;
      case 6:
        if (first === 0) {
          i = second;
          count = 0;
        }
        else count = 3;
        break;
      case 7:
        arr[arr[i + 3]] = first < second ? 1 : 0;
        count = 4;
        break;
      case 8:
        arr[arr[i + 3]] = first === second ? 1 : 0;
        count = 4;
        break;
    }
  }
}
console.log(`Part Two Answer: ${partTwoAnswer}`);