const formatter = require('../../shared/formatting/format-puzzle-input');
let input = new formatter.Formatter(__dirname).getRaw()
const lines = input.split("\n").map(x => x.matchAll(/(?:mul\((\d+),(\d+)\))|(?:do\(\))|(?:don't\(\))/g));
let enabled = true;
let total = 0
for (const line of lines) {
  for (const l of line) {
    if (l[0] == "do()") enabled = true;
    else if (l[0] == "don't()") enabled = false;
    else if (enabled) total += l[1] * l[2]
  }
}
console.log(`Part Two Answer: ${total}`);