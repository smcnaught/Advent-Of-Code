const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(e => e.split(' '));
let accumulator = 0;

let keepRunning = true;
let inc = 0;
let visited = [];

while (keepRunning) {
  let d = data[inc];
  [inst, op, num] = [d[0], d[1].charAt(0), +d[1].substring(1, d[1].length)];

  if (inst === 'acc') {
    inc += 1;
    accumulator = op === '+' ? (accumulator + num) : (accumulator - num);
  }
  else if (inst === 'jmp') inc = op === '+' ? (inc += num) : (inc -= num);
  else inc += 1;

  if (visited.includes(inc)) keepRunning = false;
  else visited.push(inc);
}

console.log(`Part One Answer: ${accumulator}`);