const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsSplitByChar(',');
let fishies = {};
for (let i = 0; i < 9; i++) fishies[i] = 0;
data.forEach(d => fishies[d]++)
for (let i = 0; i < 256; i++) {
  let c = JSON.parse(JSON.stringify(fishies));
  [fishies[7], fishies[6], fishies[5], fishies[4], fishies[3], fishies[2], fishies[1], fishies[0], fishies[8]] = [c[8], c[7] + (c[0] ?? 0), c[6], c[5], c[4], c[3], c[2], c[1], c[0] ?? 0];
}
console.log(`Part Two Answer: ${Object.values(fishies).reduce((a, b) => a + b)}`)