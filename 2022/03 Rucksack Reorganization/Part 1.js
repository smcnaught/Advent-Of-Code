const formatter = require('../../shared/formatting/format-puzzle-input');
let shared = [];
new formatter.Formatter(__dirname).get2DArrayOfStrings().map(d => {
  const middle = Math.floor(d[0].length / 2);
  const comparts = [new Set(d[0].substring(0, middle).split('')), new Set(d[0].substring(middle).split(''))]
  for (const char of comparts[0].values()) {
    if (comparts[1].has(char)) {
      if (char === char.toLowerCase()) shared.push(char.charCodeAt() - 96)
      else shared.push((char.toLowerCase().charCodeAt() - 96) + 26)
    }
  }
})
console.log(`Part One Answer: ${shared.reduce((a, b) => a + b)}`);