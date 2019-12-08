
const fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arr = source.replace(/\r/g, '').split(',').map(Number);

// phase Settings are set from 0-4 (no duplicates between amps)
function runIntCodeComp(inputSignal1, inputSignal2) {
  let signalToUse = inputSignal1;
  let opCode = output = null;
  while (arr[opCode] !== 99) {
    let count = 4;
    for (i = 0; i < arr.length; i += count) {
      let str = arr[i].toString().padStart(5, '0');
      opCode = +str.slice(-2);
      const mode1 = +str.charAt(2);
      const mode2 = +str.charAt(1);
      const mode3 = +str.charAt(0);
      const first = mode1 === 0 ? arr[arr[i + 1]] : arr[i + 1];
      const second = mode2 === 0 ? arr[arr[i + 2]] : arr[i + 2];

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
          arr[arr[i + 1]] = signalToUse;
          signalToUse = inputSignal2;
          count = 2;
          break;
        case 4:
          output = first;
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
        default:
          return output;
      }
    }
  }

  // arr = source.replace(/\r/g, '').split(',').map(Number);
  return output;
}

let items = [0, 1, 2, 3, 4];
let all = [], used = [];
function getPermutations(items) {
  for (let i = 0; i < items.length; i++) {
    let item = items.splice(i, 1)[0];
    used.push(item);
    if (items.length == 0) all.push(used.slice());
    getPermutations(items);
    items.splice(i, 0, item);
    used.pop();
  }

  return all;
}
let thrusters = [];
getPermutations(items).forEach(amp => {
  let resultOfA = runIntCodeComp(amp[0], 0);
  let resultOfB = runIntCodeComp(amp[1], resultOfA);
  let resultOfC = runIntCodeComp(amp[2], resultOfB);
  let resultOfD = runIntCodeComp(amp[3], resultOfC);
  let resultOfE = runIntCodeComp(amp[4], resultOfD);

  thrusters.push(resultOfE);
})

console.log(`Part One Answer: ${thrusters.sort((a, b) => b - a)[0]}`);