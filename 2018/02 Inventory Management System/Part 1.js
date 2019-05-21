let fs = require('fs');
let raw = fs.readFileSync('./input.txt').toString('utf-8');
let array = raw.replace(/\r/g, '').split('\n');
let appearsTwice = 0;
let appearsThrice = 0;

let countWordsWithXduplicates = (id, numberOfDuplicates) => {
  let letterCount = {}

  for (x = 0, length = id.length; x < length; x++) {
    let l = id.charAt(x)
    letterCount[l] = (isNaN(letterCount[l]) ? 1 : letterCount[l] + 1);
  }

  for (letter in letterCount) {
    if (letterCount[letter] === numberOfDuplicates) {
      if (numberOfDuplicates == 2) appearsTwice++;
      else appearsThrice++;
      break;
    }
  }
}

array.forEach(id => {
  let arr = id.split('');
  let sorted = arr.sort().join().replace(/,/g, '');
  countWordsWithXduplicates(sorted, 2);
  countWordsWithXduplicates(sorted, 3);
});

let partOneAnswer = appearsTwice * appearsThrice;
console.log(`Part One Answer: ${partOneAnswer}`);