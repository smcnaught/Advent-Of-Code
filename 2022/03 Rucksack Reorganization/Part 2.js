const formatter = require('../../shared/formatting/format-puzzle-input');
let subgroups = [];
let sum = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(d => {
  subgroups.push(d);
  if (subgroups.length === 3) {
    const rucksacks = [new Set(subgroups[0].split('')), new Set(subgroups[1].split('')), new Set(subgroups[2].split(''))];
    for (const char of rucksacks[0].values()) {
      if (rucksacks[1].has(char) && rucksacks[2].has(char)) {
        if (char === char.toLowerCase()) sum += char.charCodeAt() - 96;
        else sum += (char.toLowerCase().charCodeAt() - 96) + 26;
      }
    }
    subgroups = [];
  }
})
console.log(`Part Two Answer: ${sum}`);