let numberOfValidPassphrases = 0;
let fs = require('fs');
fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').split('\n').map(e => checkForAnagrams(e.split(' ')));

function checkForAnagrams (arr) {
	let alphabetizedArr = [];
	let alreadyHere = 0;

	for (let j = 0; j < arr.length; j++) {
		let sortedWord = arr[j].split('').sort().join('');
		alphabetizedArr.push(sortedWord);
	}

	for (let i = 0; i < alphabetizedArr.length; i++) {
		for (let j = 0; j < alphabetizedArr.length; j++) {
			if (alphabetizedArr[i] === alphabetizedArr[j] && i !== j) return;
			else if ((i + 1) == alphabetizedArr.length && alreadyHere == 0 && i !== j) {
				alreadyHere = 1;
				numberOfValidPassphrases++;
			}
		}
	}
}

console.log(`Part Two Answer: ${numberOfValidPassphrases}`);