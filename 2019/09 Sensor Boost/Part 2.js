const fs = require('fs');
let all = fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').replace(/\n/g, '').split(',').map(Number);
let relativeBase = ip = 0;

function getValWithMode(mode, index, type) {
  const positionMode = 0;
  const immediateMode = 1;
  const relativeMode = 2;
  if (type === 'value') {
    if (mode === positionMode) return +all[all[index]];
    else if (mode === immediateMode) return +all[index];
    else if (mode === relativeMode) return +all[all[index] + relativeBase];
  }
  else if (type === 'position') {
    if (mode === positionMode) return all[index];
    else if (mode === relativeMode) return all[index] + relativeBase;
  }
}

function runIntCodeComp(input) {
  let output = [];
  let opCode = null;

  while (opCode !== 99) {
    const str = all[ip].toString().padStart(5, '0');
    opCode = +str.slice(3);

    const mode1 = +str[2];
    const mode2 = +str[1];
    const mode3 = +str[0];

    let first = getValWithMode(mode1, ip + 1, 'value');
    const second = getValWithMode(mode2, ip + 2, 'value');
    const store = getValWithMode(mode3, ip + 3, 'position');

    if (opCode === 1) {
      all[store] = first + second;
      ip += 4;
    }
    else if (opCode === 2) {
      all[store] = first * second;
      ip += 4;
    }
    else if (opCode === 3) {
      first = getValWithMode(mode1, ip + 1, 'position');
      all[first] = input;
      ip += 2;
    }
    else if (opCode === 4) {
      output.push(first);
      ip += 2;
    }
    else if (opCode === 5) {
      if (first !== 0) ip = second;
      else ip += 3;
    }
    else if (opCode === 6) {
      if (first === 0) ip = second;
      else ip += 3;
    }
    else if (opCode === 7) {
      all[store] = first < second ? 1 : 0;
      ip += 4;
    }
    else if (opCode === 8) {
      all[store] = first === second ? 1 : 0;
      ip += 4;
    }
    else if (opCode === 9) {
      relativeBase += first;
      ip += 2;
    }
  }

  return output;
}

console.log(`Part Two Answer: ${runIntCodeComp(2)[0]}`)