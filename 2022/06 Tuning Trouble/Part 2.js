const formatter = require('../../shared/formatting/format-puzzle-input');
const buffy = new formatter.Formatter(__dirname).getString();

for (let i = 0; i < buffy.length; i++) {
  let fourteen = buffy[i];
  for (let j = i + 1; j < i + 14; j++) if (buffy[j]) fourteen += buffy[j];
  if (fourteen.length === 14 && new Set(fourteen).size === 14) return console.log(`Part Two Answer: ${i + 14}`);
}