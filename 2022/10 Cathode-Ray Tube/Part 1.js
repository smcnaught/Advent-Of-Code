const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = new formatter.Formatter(__dirname).get2DArrayOfStrings(' ');
let lastCycle = 0;
let x = 1;
let doAtCycle = {}; // { 4: 3 } // where prop 4 = cycle 4 and value 3 = addx 3
let nextCycleToLookAt = 20;
let sums = 0;

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
  for (let currentCycle = 1; currentCycle <= lastCycle; currentCycle++) {
    if (currentCycle === nextCycleToLookAt) {
      sums += x * currentCycle;
      nextCycleToLookAt += 40;
    }
    if (doAtCycle[currentCycle]) x += doAtCycle[currentCycle]
  }
}

setupTiming();
runCycles();
console.log(`Part One Answer: ${sums}`);