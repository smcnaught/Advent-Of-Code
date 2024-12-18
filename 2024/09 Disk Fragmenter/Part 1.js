const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getString();
let blocks = [];
let id = 0;
let checksum = 0;
for (let i = 0; i < data.length; i++) {
  let count = +data[i]
  while (count > 0) {
    if (i % 2 === 0) blocks.push(id.toString());
    else blocks.push('.');
    count--;
  }
  if (i % 2 != 0) id++;
}

for (let i = blocks.length-1; i >= 0; i--) {
  const subArr = blocks.slice(0, i+1);
  if (!subArr.includes('.')) break;

  const blockToMove = blocks[i];
  if (blockToMove === '.') continue;
  let moved = false;
  for (let j = 0; j < blocks.length; j++) {
    if (blocks[j] === '.' && i > j) {
      moved = true;
      blocks[j] = blockToMove;
      break;
    }
  }
  if (moved) blocks[i] = '.';
}

for (let i = 0; i < blocks.length; i++) {
  if (blocks[i] === '.') break;
  checksum += +blocks[i] * i;
}

console.log(`Part One Answer: ${checksum}`);