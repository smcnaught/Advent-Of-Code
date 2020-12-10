const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(e => e.split(' '));

function doTheThing(data) {
  let accumulator = 0;
  let keepRunning = true;
  let inc = 0;
  let visited = [];

  while (keepRunning) {
    let d = data[inc];
    if (!d) return console.log(`Part Two Answer: ${accumulator}`);
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
}

for (let i = 0; i < data.length; i++) {
  let newData = JSON.parse(JSON.stringify(data))

  if (data[i][0] === 'nop') newData[i][0] = 'jmp';
  else if (data[i][0] === 'jmp') newData[i][0] = 'nop';

  doTheThing(newData);
}