let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
const arr = source.replace(/\r/g, '').split('').map(Number);
const wide = 25;
const tall = 6;
const main = [];
const totalMiniArr = arr.length / wide;
const eachLayer = totalMiniArr / tall;
const numPerMini = wide * tall;

for (let i = 0; i < eachLayer; i++) {
  for (let j = 0; j < numPerMini; j++) {
    if (main[i]) main[i].push(arr.shift(j));
    else main[i] = [arr.shift(j)];
  }
}

const black = 0;
const white = 1;
let pixels = new Array(main.length);
for (let i = 0; i < main.length; i++) {
  for (let j = 0; j < main[i].length; j++) {
    if (pixels[j]) pixels[j].push(main[i][j]);
    else pixels[j] = [main[i][j]]
  }
}

let answer = [];
pixels.forEach(group => {
  for (let i = 0; i < group.length; i++) {
    if (group[i] === black || group[i] === white) {
      let pixy = group[i] === black ? ' ' : 'X';
      answer.push(pixy)
      if (answer.length % wide === 0) {
        console.log(answer.join('')); // prints the message to the console
        answer.splice(0, wide);
      }
      return;
    }
  }
})