let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let allSues = input.replace(/\r/g, '').replace(/,/g, '').replace(/:/g, '').split('\n').map(s => s.split(' '));

const correctSue = {
  children: 3,
  cats: 7, // greater than 7 cats
  samoyeds: 2,
  pomeranians: 3, // less than 3
  akitas: 0,
  vizslas: 0,
  goldfish: 5, // less than 5
  trees: 3, // greater than 3
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
        if (currentSue[i] == 'cats' || currentSue[i] == 'trees') {
          if (+currentSue[i + 1] <= correctSue[currentSue[i]]) removeCurrentSue = true;
        }
        else if (currentSue[i] == 'pomeranians' || currentSue[i] == 'goldfish') {
          if (+currentSue[i + 1] >= correctSue[currentSue[i]]) removeCurrentSue = true;
        }

        else if (+currentSue[i + 1] != correctSue[currentSue[i]]) removeCurrentSue = true;
        
      } 
    }

    if (removeCurrentSue) allSues.splice(j, 1)
  }

  if (allSues.length === 1) foundSue = true;
}

console.log(`The real Aunt Sue is #${allSues[0][1]}`);