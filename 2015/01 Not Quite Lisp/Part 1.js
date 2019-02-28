let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');

let count = 0;

for (let i = 0; i < input.length; i++) {
	if (input.charAt(i) === '(') count++;
	else if (input.charAt(i) === ')') count--;
}

console.log(`Part One Answer: ${count}`)