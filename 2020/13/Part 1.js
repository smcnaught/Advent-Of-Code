const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
[canLeave, buses] = [+data[0], data[1].replace(/x,/g, '').split(',').map(Number)];

let found = false;
let incCanLeave = canLeave;
while (!found) {
  buses.forEach(bus => {
    if (incCanLeave % bus === 0) {
      found = true;
      const waitTime = incCanLeave - canLeave;
      console.log(`Part One Answer: ${bus * waitTime}`);
    }
  })
  incCanLeave++;
}