const formatter = require('../../shared/formatting/format-puzzle-input');
let county = 0;
new formatter.Formatter(__dirname).get2DArrayOfStrings(' ').map(sub => {
  for (let i = 11; i < sub.length; i++) {
    if (sub[i].length === 2 || sub[i].length === 4 || sub[i].length === 3 || sub[i].length === 7) county++;
  }
})

console.log(`Part One Answer: ${county}`);