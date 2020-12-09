const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayByLineBreaks();
let count = 0;
const removeDuplicateCharacters = (str) => str.split('').filter((item, pos, self) => self.indexOf(item) == pos).join('');
data.forEach(str => count += removeDuplicateCharacters(str).length);
console.log(`Part One Answer: ${count}`);