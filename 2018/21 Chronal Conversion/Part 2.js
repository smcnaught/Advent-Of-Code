let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let inst = text.replace(/\r/g, "").split("\n").slice(1).map(x => x.split(" "));
let registers = new Array(6);
let ip = 0;
let lastOne;
let p = [];
let foundPartTwo = false;

function partTwo() {
  let count = 0;
  while (ip < inst.length) {
    let [operation, a, b, c] = [inst[ip][0], +inst[ip][1], +inst[ip][2], +inst[ip][3]];
    registers[5] = ip;

    switch (operation) {
      case "addr": registers[c] = registers[a] + registers[b]; break;
      case "addi": registers[c] = registers[a] + b; break;
      case "mulr": registers[c] = registers[a] * registers[b]; break;
      case "muli": registers[c] = registers[a] * b; break;
      case "bani": registers[c] = registers[a] & b; break;
      case "borr": registers[c] = registers[a] | registers[b]; break;
      case "bori": registers[c] = registers[a] | b; break;
      case "gtir": registers[c] = a > registers[b] ? 1 : 0; break;
      case "gtrr": registers[c] = registers[a] > registers[b] ? 1 : 0; break;
      case "eqri": registers[c] = registers[a] == b ? 1 : 0; break;
      case "eqrr": registers[c] = registers[a] == registers[b] ? 1 : 0; break;
      case "setr": registers[c] = registers[a]; break;
      case "seti": registers[c] = a; break;
      default: console.error("Invalid input in switch statement", operation); break;
    }

    if (ip === 29) {
      // part two ~ get the last one before it starts to repeat
      if (p.indexOf(registers[3]) === -1) p.push(registers[3])
      else {
        foundPartTwo = true;
        return console.log(`Part Two Answer: ${lastOne}`);
      }

      lastOne = registers[3];
    }

    ip = registers[5] + 1;
    if (++count >= 200000) return;
  }
}

let counter = 0;
while (!foundPartTwo) {
  registers[0] = counter++;
  partTwo();
}