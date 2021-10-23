const formatter = require('../../shared/formatting/format-puzzle-input');
let registers = {};
const data = new formatter.Formatter(__dirname)
  .get2DArrayOfStrings(' ')
  .map(sub => {
    registers[sub[0]] = 0;
    registers[sub[4]] = 0;
    return [sub[0], sub[1], sub[2], sub[4], sub[5], sub[6]]
  })

const operators = {
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a == b,
  '!=': (a, b) => a != b,
};

data.forEach(d => {
  const condition = operators[d[4]](+registers[d[3]], +d[5])
  if (condition) {
    if (d[1] === 'inc') registers[d[0]] += +d[2];
    else if (d[1] === 'dec') registers[d[0]] -= +d[2];
  }
})

console.log(`Part One Answer: ${Math.max(...Object.values(registers))}`)