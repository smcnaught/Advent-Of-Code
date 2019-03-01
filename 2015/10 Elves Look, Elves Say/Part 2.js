let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
const REPEATS = /(\d)\1*/g;

for (let i = 0; i < 50; i++)
{
  input = input.match(REPEATS).reduce((acc, char) => acc + `${char.length}${char[0]}`, '');
}

console.log(`Part Two Answer: ${input.length}`);