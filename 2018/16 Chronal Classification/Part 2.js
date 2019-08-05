let fs = require("fs");
let textOne = fs.readFileSync("./input.txt", "utf-8");
let dataOne = textOne.replace(/\r|Before: \[|,|]|After:  \[/g, "").replace(/^\s*\n/gm, "").split("\n");
let text = fs.readFileSync("./inputB.txt", "utf-8");
let data = text.replace(/\r|Before: \[|,|]|After:  \[/g, "").replace(/^\s*\n/gm, "").split("\n");
let initialState = [0, 0, 0, 0];
let operations = ["addr", "addi", "mulr", "muli", "banr", "bani", "borr", "bori", "setr", "seti", "gtir", "gtri", "gtrr", "eqir", "eqri", "eqrr"];
let ins = [], opCodes = [], samples = [], temp = [];
let opCodeOrder = new Array(operations.length);
let c = 0;
for (let i = 0; i < dataOne.length; i++) {
	temp.push(dataOne[i].split(" ").map(Number));
	c++;

	if (c === 3) {
		samples.push(temp);
		temp = [];
		c = 0;
	}
}

let gotResult = (possibleCodesIndex, opCode, afterInstruction, expectedResult) => {
	let gotExpectedResult = afterInstruction.toString() == expectedResult.toString();
	if (gotExpectedResult) opCodes[possibleCodesIndex].possibleCodeNumbers.push(opCode);
	return gotExpectedResult;
}

let calculate = (operation, initial, a, b, c) => {
	switch (operation) {
		case "addr": initial[c] = initial[a] + initial[b]; break;
		case "addi": initial[c] = initial[a] + b; break;
		case "mulr": initial[c] = initial[a] * initial[b]; break;
		case "muli": initial[c] = initial[a] * b; break;
		case "banr": initial[c] = initial[a] & initial[b]; break;
		case "bani": initial[c] = initial[a] & b; break;
		case "borr": initial[c] = initial[a] | initial[b]; break;
		case "bori": initial[c] = initial[a] | b; break;
		case "setr": initial[c] = initial[a]; break;
		case "seti": initial[c] = a; break;
		case "gtir": initial[c] = a > initial[b] ? 1 : 0; break;
		case "gtri": initial[c] = initial[a] > b ? 1 : 0; break;
		case "gtrr": initial[c] = initial[a] > initial[b] ? 1 : 0; break;
		case "eqir": initial[c] = a == initial[b] ? 1 : 0; break;
		case "eqri": initial[c] = initial[a] == b ? 1 : 0; break;
		case "eqrr": initial[c] = initial[a] == initial[b] ? 1 : 0; break;
		default: console.error("Invalid input in switch statement."); break;
	}

	return initial;
}

function partOne() {
	let behaveLike3OrMore = 0;

	for (let j = 0; j < operations.length; j++) opCodes.push({ name: operations[j], possibleCodeNumbers: [] });

	for (let i = 0; i < samples.length; i++) {
		let gotExpectedResult = 0;
		let [initialState, expectedResult] = [samples[i][0], samples[i][2]];
		let [opCode, a, b, c] = [samples[i][1][0], samples[i][1][1], samples[i][1][2], samples[i][1][3]];

		for (let o = 0; o < operations.length; o++) {
			if (gotResult(o, opCode, calculate(operations[o], JSON.parse(JSON.stringify(initialState)), a, b, c), expectedResult)) gotExpectedResult++;
		}

		if (gotExpectedResult >= 3) behaveLike3OrMore++;
	}

	console.log(`Part One Answer: ${behaveLike3OrMore}`);
}

function getOpCodeOrder() {
	opCodes.forEach(o => o.possibleCodeNumbers = [...new Set(o.possibleCodeNumbers)])

	while (opCodes.length > 0) {
		for (let i = 0; i < opCodes.length; i++) {
			if (opCodes[i].possibleCodeNumbers.length === 1) {
				opCodeOrder[opCodes[i].possibleCodeNumbers[0]] = opCodes[i].name;

				let codeToRemove = opCodes[i].possibleCodeNumbers[0];
				opCodes.splice(i, 1); // remove that code (whole object)

				// remove all references to that number/code
				for (let j = 0; j < opCodes.length; j++)
					for (let k = 0; k < opCodes[j].possibleCodeNumbers.length; k++)
						if (opCodes[j].possibleCodeNumbers[k] === codeToRemove) opCodes[j].possibleCodeNumbers.splice(k, 1);
			}
		}
	}
}

for (let i = 0; i < data.length; i++) ins.push(data[i].split(" ").map(Number));
function partTwo() {
	for (let i = 0; i < ins.length; i++) {
		let [opCode, a, b, c] = [ins[i][0], ins[i][1], ins[i][2], ins[i][3]];
		calculate(opCodeOrder[opCode], initialState, a, b, c);
	}

	console.log(`Part Two Answer: ${initialState[0]}`)
}

partOne();
getOpCodeOrder();
partTwo();