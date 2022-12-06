const formatter = require('../../shared/formatting/format-puzzle-input');
const buffy = new formatter.Formatter(__dirname).getString();

for (let i = 0; i < buffy.length; i++) {
  let four = buffy[i];
  for (let j = i + 1; j < i + 4; j++) if (buffy[j]) four += buffy[j];
  if (four.length === 4 && new Set(four).size === 4) return console.log(`Part One Answer: ${i + 4}`);
}