const formatter = require('../../shared/formatting/format-puzzle-input');
let input = new formatter.Formatter(__dirname).getRaw()
const lines = input.split("\n").map(x => x.matchAll(/mul\((\d+),(\d+)\)/g));
let total = 0
for (const line of lines) { for (const l of line) total += l[1] * l[2] }
console.log(`Part One Answer: ${total}`);