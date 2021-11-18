const formatter = require('../../shared/formatting/format-puzzle-input');
let firewall = {};
new formatter.Formatter(__dirname).get2DArrayOfStringsSpacesRemoved(":").map(subArr => {
  firewall[subArr[0]] = {
    scanner: null, // the range the scanner is currently at (ex: 0)
    range: +subArr[1],
  };
})

function runPicoseconds(delay) {
  return Object.entries(firewall).some(([depth, value]) => {
    return (delay + +depth) % (2 * (+value.range - 1)) === 0;
  })
}

let caught = true;
let delay = -1;
while (caught) {
  delay++;
  caught = runPicoseconds(delay);
}

console.log(`Part Two Answer: ${delay}`);