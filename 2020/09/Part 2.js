const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
const p1 = 675280050;

for (let i = 0; i < data.length; i++) {
  let current = data[i];
  let prev = [current];
  for (let j = i + 1; j < data.length; j++) {
    current += data[j];
    prev.push(data[j])
    if (current === p1) {
      prev.sort((a, b) => a - b);
      console.log(`Part Two Answer: ${prev[0] + prev[prev.length - 1]}`);
    }
  }
}