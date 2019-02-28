let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');

let count = 0;
let num = 0;
let answeredPartTwo = false;

for (let i = 0; i < input.length; i++) {
	if (input.charAt(i) === '(')
	{
		num++;
		count++;
	}
	else if (input.charAt(i) === ')')
	{
		num++;
		count--;
	}

	if (count === -1 && !answeredPartTwo)
	{
		answeredPartTwo = true;
		console.log(`Part Two Answer: ${num}`);
	}
}