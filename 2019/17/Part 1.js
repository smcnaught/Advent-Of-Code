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

function runIntCodeComp(data) {
  let output = [];
  let opCode = null;
  let input = typeof data === "number" ? [data] : data;

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
      all[first] = input.shift();
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

const view = runIntCodeComp();
let allLines = [];
let currentLine = "";
let fromLeft = 0;
let fromTop = 0;

view.forEach(i => {
  if (i === 35) {
    currentLine += "#";
    allLines.push({ current: '#', fromTop: fromTop, fromLeft: fromLeft });
    fromLeft++;
  }
  else if (i === 46) {
    currentLine += ".";
    fromLeft++;
  }
  else if (i === 10) {
    console.log(currentLine); // prints the view
    fromTop++;
    fromLeft = 0;
    currentLine = "";
  }
  else {
    currentLine += "^";
    fromLeft++;
  }
})

let intersections = [];

for (let i = 0; i < allLines.length; i++) {
  let currentTop = allLines[i].fromTop;
  let currentLeft = allLines[i].fromLeft;

  let top = false;
  let bottom = false;
  let left = false;
  let right = false;

  for (let j = 0; j < allLines.length; j++) {
    let nextTop = allLines[j].fromTop;
    let nextLeft = allLines[j].fromLeft;

    // minus 1 from the left, but same from the top
    if (currentLeft === nextLeft - 1 && currentTop === nextTop) left = true;
    else if (currentLeft === nextLeft + 1 && currentTop === nextTop) right = true;
    else if (currentTop === nextTop - 1 && currentLeft === nextLeft) top = true;
    else if (currentTop === nextTop + 1 && currentLeft === nextLeft) bottom = true;
  }

  if (top && bottom && left && right) intersections.push(allLines[i]);
}

let sum = 0;
intersections.forEach(i => {
  sum += i.fromLeft * i.fromTop;
})

console.log(`Part One Answer: ${sum}`);

// output: 
// 35 means #, 46 means ., 10 starts a new line of output below the current one
// # represents a scaffold and . represents open space