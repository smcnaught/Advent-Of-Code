let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
const arr = source.replace(/\r/g, '').split('').map(Number);
const wide = 25;
const tall = 6;
const main = [];
const totalMiniArr = arr.length / wide;
const eachLayer = totalMiniArr / tall;

for (let i = 0; i < eachLayer; i++) {
  let layer = [];
  main.push(layer);
}

main.forEach(layer => {
  let group = '';

  for (let i = 0; i < tall; i++) {
    for (let j = 0; j < wide; j++) {
      group += arr.shift(j);
    }
    layer.push(group.split('').map(Number));
    group = '';
  }

})

let leastZeroes = Math.pow(10, 1000);
let ansArr = null;
main.forEach(mini => {
  let zeroes = 0;
  mini.forEach(m => {
    m.forEach(num => { if (num === 0) zeroes++; })
    if (zeroes < leastZeroes) {
      leastZeroes = zeroes;
      ansArr = mini;
    }
  })

})

let ones = 0;
let twos = 0;
ansArr.forEach(a => {
  a.forEach(num => {
    if (num === 1) ones++;
    else if (num === 2) twos++;
  })
})

console.log(`Part One Answer: ${ones * twos}`);