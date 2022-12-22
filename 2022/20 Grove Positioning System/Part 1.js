const formatter = require('../../shared/formatting/format-puzzle-input');
const all = [];
let id = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().filter(n => n).map(moveBy => all.push({ moveBy: +moveBy, id: id++ }));
const getCircularVal = (i, n) => all[(i % n + n) % n].moveBy;
function mix() {
  for (let i = 0; i < id; i++) {
    const itemInd = all.findIndex(x => x.id === i);
    const item = all[itemInd].moveBy;
    all.splice(itemInd, 1);
    all.splice((item + itemInd) % all.length, 0, { moveBy: item, id: i })
  }
}
mix();
const indexOfZero = all.findIndex(el => el.moveBy === 0);
[valAt1000, valAt2000, valAt3000] = [getCircularVal(indexOfZero + 1000, all.length), getCircularVal(indexOfZero + 2000, all.length), getCircularVal(indexOfZero + 3000, all.length)];
console.log(`Part One Answer: ${valAt1000 + valAt2000 + valAt3000}`)