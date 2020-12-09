const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let yes = [];
data.push("");
let allLettersInGroup = [];
let membersOfGroup = 0;

for (let i = 0; i < data.length; i++) {
  let str = data[i];
  str.split('').forEach(s => allLettersInGroup.push(s));
  if (str !== "") membersOfGroup++;
  else {
    allLettersInGroup.sort();
    let counts = {};
    allLettersInGroup.forEach((x) => counts[x] = (counts[x] || 0) + 1);

    let groupYesCount = 0;
    Object.entries(counts).forEach(([key, value]) => {
      if (value === membersOfGroup) groupYesCount++;
    });

    yes.push(groupYesCount);

    allLettersInGroup = [];
    membersOfGroup = 0;
  }
}
console.log(`Part Two Answer: ${yes.reduce((a, b) => a + b, 0)}`);