let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let inst = text.replace(/\r/g, "").split("\n").slice(1).map(x => x.split(" "));
let registers = new Array(6);
let ip = 0;

function partOne() {
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

    // part one ~ get the first one that prints
    if (ip === 29) return console.log(`Part One Answer: ${registers[3]}`);
    ip = registers[5] + 1;
  }
}

partOne();