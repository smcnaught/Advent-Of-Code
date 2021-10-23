const formatter = require('../../shared/formatting/format-puzzle-input');
let registers = {};
let highest = {};
const data = new formatter.Formatter(__dirname)
  .get2DArrayOfStrings(' ')
  .map(sub => {
    registers[sub[0]] = highest[sub[0]] = 0;
    registers[sub[4]] = highest[sub[4]] = 0;
    return [sub[0], sub[1], sub[2], sub[4], sub[5], sub[6]];
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
  let condition = operators[d[4]](+registers[d[3]], +d[5])
  if (condition) {
    if (d[1] === 'inc') {
      let temp = registers[d[0]] + +d[2];
      if (highest[d[0]] < temp) highest[d[0]] = temp;
      registers[d[0]] += +d[2];
    } 
    else if (d[1] === 'dec') {
      const temp = registers[d[0]] - +d[2];
      if (highest[d[0]] < temp) highest[d[0]] = temp;
      registers[d[0]] -= +d[2];
    }
  }
})

console.log(`Part Two Answer: ${Math.max(...Object.values(highest))}`);