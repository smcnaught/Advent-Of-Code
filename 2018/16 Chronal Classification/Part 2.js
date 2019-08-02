let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let data = text.replace(/\r|Before: \[|,|]|After:  \[/g, "").replace(/^\s*\n/gm, "").split("\n");
let initialState = [0, 0, 0, 0];
let ins = [];
for (let i = 0; i < data.length; i++) ins.push(data[i].split(" ").map(Number));

function partTwo() {
  for (let i = 0; i < ins.length; i++) {
    let [opCode, a, b, c] = [ins[i][0], ins[i][1], ins[i][2], ins[i][3]];

    switch (opCode) {
      case 0: initialState[c] = initialState[a] | b; break;
      case 1: initialState[c] = initialState[a] | initialState[b]; break;
      case 2: initialState[c] = initialState[a] + b; break;
      case 3: initialState[c] = initialState[a] * b; break;
      case 4: initialState[c] = initialState[a] + initialState[b]; break;
      case 5: initialState[c] = initialState[a] & b; break;
      case 6: initialState[c] = initialState[a] > b ? 1 : 0; break;
      case 7: initialState[c] = initialState[a]; break;
      case 8: initialState[c] = initialState[a] > initialState[b] ? 1 : 0; break;
      case 9: initialState[c] = a; break;
      case 10: initialState[c] = a == initialState[b] ? 1 : 0; break;
      case 11: initialState[c] = initialState[a] == initialState[b] ? 1 : 0; break;
      case 12: initialState[c] = initialState[a] * initialState[b]; break;
      case 13: initialState[c] = initialState[a] == b ? 1 : 0; break;
      case 14: initialState[c] = a > initialState[b] ? 1 : 0; break;
      case 15: initialState[c] = initialState[a] & initialState[b]; break;
      default: console.log(`Input is invalid: ${opCode}`); break;
    }
  }

  console.log(`Part Two Answer: ${initialState[0]}`)
}
partTwo();