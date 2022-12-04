const formatter = require('../../shared/formatting/format-puzzle-input');
let county = 0;
new formatter.Formatter(__dirname).get2DArrayOfNumbersWithItemsReplaced([['-', ' ']]).map(pair => {
  let arr1 = [];
  let arr2 = [];
  for (let i = pair[0]; i <= pair[1]; i++) arr1.push(i);
  for (let j = pair[2]; j <= pair[3]; j++) arr2.push(j);
  const filteredArray = arr1.filter(value => arr2.includes(value));
  if (filteredArray.length > 0) county++;
})
console.log(`Part Two Answer: ${county}`);