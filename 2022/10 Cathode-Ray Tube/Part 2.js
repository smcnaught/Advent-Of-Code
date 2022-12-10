const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let lastCycle = 0;
let x = 1;
let doAtCycle = {}; // { 4: 3 } // where prop 4 = cycle 4 and value 3 = addx 3
let crt = "";

function setupTiming() {
  let cycle = 0;
  for (let i = 0; i < instructions.length; i++) {
    cycle++;
    const amt = +instructions[i][1];
    if (amt) {
      cycle++;
      if (cycle > lastCycle) lastCycle = cycle;
      doAtCycle[cycle] = amt;
    }
  }
}

function runCycles() {
  let toCheck = 0;
  for (let currentCycle = 1; currentCycle <= lastCycle; currentCycle++) {
    toCheck = toCheck === 40 ? 1 : toCheck + 1;
    crt = (toCheck === x || toCheck === x + 1 || toCheck === x + 2) ? crt + "#" : crt + ".";
    if (doAtCycle[currentCycle]) x += doAtCycle[currentCycle]
  }
}

setupTiming();
runCycles();
console.log(`Part Two Answer:`);
for (let i = 0; i < crt.length; i += 40) console.log(crt.slice(i, i + 40));