const formatter = require('../../shared/formatting/format-puzzle-input');
let county = 0;
new formatter.Formatter(__dirname).get2DArrayOfNumbersWithItemsReplaced([['-', ' ']]).map(pair => {if ((pair[0] <= pair[2] && pair[1] >= pair[3]) || (pair[2] <= pair[0] && pair[3] >= pair[1])) county++;})
console.log(`Part One Answer: ${county}`);