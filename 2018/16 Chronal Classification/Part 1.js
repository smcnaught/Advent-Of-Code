let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let data = text.replace(/\r|Before: \[|,|]|After:  \[/g, "").replace(/^\s*\n/gm, "").split("\n");
let operations = ["addr", "addi", "mulr", "muli", "banr", "bani", "borr", "bori", "setr", "seti", "gtir", "gtri", "gtrr", "eqir", "eqri", "eqrr"];
let opCodes = [], samples = [], temp = [];
let c = 0;
for (let i = 0; i < data.length; i++) {
  temp.push(data[i].split(" ").map(Number));
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

let calculate = (operation, init, a, b, c) => {
  let initialState = JSON.parse(JSON.stringify(init));
  switch (operation) {
    case "addr": initialState[c] = initialState[a] + initialState[b]; break;
    case "addi": initialState[c] = initialState[a] + b; break;
    case "mulr": initialState[c] = initialState[a] * initialState[b]; break;
    case "muli": initialState[c] = initialState[a] * b; break;
    case "banr": initialState[c] = initialState[a] & initialState[b]; break;
    case "bani": initialState[c] = initialState[a] & b; break;
    case "borr": initialState[c] = initialState[a] | initialState[b]; break;
    case "bori": initialState[c] = initialState[a] | b; break;
    case "setr": initialState[c] = initialState[a]; break;
    case "seti": initialState[c] = a; break;
    case "gtir": initialState[c] = a > initialState[b] ? 1 : 0; break;
    case "gtri": initialState[c] = initialState[a] > b ? 1 : 0; break;
    case "gtrr": initialState[c] = initialState[a] > initialState[b] ? 1 : 0; break;
    case "eqir": initialState[c] = a == initialState[b] ? 1 : 0; break;
    case "eqri": initialState[c] = initialState[a] == b ? 1 : 0; break;
    case "eqrr": initialState[c] = initialState[a] == initialState[b] ? 1 : 0; break;
    default: console.error("Invalid input in switch statement."); break;
  }

  return initialState;
}

function partOne() {
  let behaveLike3OrMore = 0;

  for (let i = 0; i < samples.length; i++) {
    let gotExpectedResult = 0;
    let [initialState, expectedResult] = [samples[i][0], samples[i][2]];
    let [opCode, a, b, c] = [samples[i][1][0], samples[i][1][1], samples[i][1][2], samples[i][1][3]];

    for (let o = 0; o < operations.length; o++) {
      opCodes.push({ name: operations[o], possibleCodeNumbers: [] });
      if (gotResult(o, opCode, calculate(operations[o], initialState, a, b, c), expectedResult)) gotExpectedResult++;
    }

    if (gotExpectedResult >= 3) behaveLike3OrMore++;
  }

  console.log(`Part One Answer: ${behaveLike3OrMore}`);
}

partOne();