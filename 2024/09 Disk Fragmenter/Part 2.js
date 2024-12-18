const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getString();
let blocks = [];
let id = 0;
let checksum = 0;
for (let i = 0; i < data.length; i++) {
  let count = +data[i]
  while (count > 0) {
    if (i % 2 === 0) blocks.push(id.toString());
    else blocks.push('.');
    count--;
  }
  if (i % 2 != 0) id++;
}

function splitByCharacterChange(arr) {
  const result = [];
  let currentSubarray = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) currentSubarray.push(arr[i]);
    else {
      result.push(currentSubarray);
      currentSubarray = [arr[i]];
    }
  }
  result.push(currentSubarray);
  return result;
}

function move(subArrays, start) {
  for (let i = start; i >= 0; i--) {
    let subArrToMove = JSON.parse(JSON.stringify(subArrays[i]))
    if (subArrToMove.includes('.')) continue;
  
    for (let j = 0; j < i; j++) {
      let destination = subArrays[j];
      if (destination.includes('.')) {
        let destinationFreeSpace = destination.filter(item => item === '.').length;
        if (subArrToMove.length <= destinationFreeSpace) {

          let charsMoved = 0;
          let indx = 0;
          let indx2 = 0;
          while (charsMoved < subArrToMove.length) {
            if (subArrays[j][indx] === '.') {
              subArrays[j][indx] = subArrToMove[indx2]
              subArrays[i][indx2] = '.'
              charsMoved++;
              indx2++;
            }
            indx++;
          }
          return move(subArrays, i-1)
        }
      }
    }
  }
  return subArrays
}

const subArrys = splitByCharacterChange(blocks);
const res = move(subArrys, subArrys.length - 1).flat()

for (let i = 0; i < res.length; i++) {
  if (res[i] === '.') continue;
  checksum += +res[i] * i;
}

console.log(`Part Two Answer: ${checksum}`);