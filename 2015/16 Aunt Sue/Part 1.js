let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let allSues = input.replace(/\r/g, '').replace(/,/g, '').replace(/:/g, '').split('\n').map(s => s.split(' '));

const correctSue = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
}

let foundSue = false;

while (!foundSue) {
  for (let j = 0; j < allSues.length; j++) {
    let removeCurrentSue = false;
    let currentSue = allSues[j];

    for (let i = 1; i < currentSue.length; i++) {
      if (i % 2 === 0) {
        if (+currentSue[i + 1] != correctSue[currentSue[i]]) removeCurrentSue = true;
      } 
    }

    if (removeCurrentSue) allSues.splice(j, 1)
  }

  if (allSues.length === 1) foundSue = true;
}

console.log(`The Sue that bought me the gift was Sue #${allSues[0][1]}`);