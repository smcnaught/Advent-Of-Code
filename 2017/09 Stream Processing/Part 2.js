const formatter = require('../../shared/formatting/format-puzzle-input');
const data = new formatter.Formatter(__dirname).getArrayOfStringsByCharWithSpaces();
let currentGroup = 0;
let garbage = 0;
let inGarbage = false;

for (let i = 0; i < data.length; i++) {
  const char = data[i];
  if (char === '!') i++;
  else if (inGarbage && char !== '>') garbage++;
  else if (!inGarbage && char === '{') currentGroup += 1;
  else if (!inGarbage && char === '}') currentGroup -= 1;
  else if (char === '<') inGarbage = true;
  else if (char === '>') inGarbage = false;
}

console.log(`Part Two Answer: ${garbage}`)