let fs = require("fs");
const input = fs.readFileSync('./input.txt').toString().split(' ').map(Number);

function sumOfMetaData() {
  let childNodes = input.shift();
  let metaData = input.shift();
  let total = 0;

  for (let i = 0; i < childNodes; i++) {
    total += sumOfMetaData();
  }

  for (let j = 0; j < metaData; j++) {
    total += input.shift();
  }

  return total;
}

console.log(`Part One Answer: ${sumOfMetaData()}`);