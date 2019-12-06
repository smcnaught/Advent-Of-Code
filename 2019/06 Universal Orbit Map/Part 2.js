let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arr = source.replace(/\r/g, '').split('\n').map(e => e.split(')'));

function removeDupsSetDirect() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i][0] === arr[j][0]) {
        arr[i] = [...arr[i], ...arr[j].slice(1)]
        arr.splice(j, 1)
      }
    }
  }
}

function setIndirect() {
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i][0]; // item being orbited
    let restOf = arr[i].slice(1);

    for (let j = 0; j < arr.length; j++) {
      for (let k = 1; k < arr[j].length; k++) {
        let orb = arr[j][k];
        if (orb === obj) arr[j] = [...arr[j], ...restOf];
      }
    }
  }
}

function run() {
  removeDupsSetDirect();
  setIndirect();

  let you = san = both = 0;
  arr.forEach(mini => {
    if (mini.includes('YOU') && mini.includes('SAN')) both++;
    else if (mini.includes('YOU')) you++;
    else if (mini.includes('SAN')) san++;
  })

  console.log(`Part Two Answer: ${you + san}`);
}

run();