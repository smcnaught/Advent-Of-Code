const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let dial = 50;
let zeroCounts = 0;
data.forEach(line => {
  [direction, moves, distToZero, hits] = [line.charAt(0), +line.slice(1), null, 0]

  if (direction === "R") distToZero = (100 - dial) % 100;
  else if (direction === "L") distToZero = dial; 

  if (moves >= distToZero) {
    hits = 1;
    let remaining = moves - distToZero;
    if (distToZero === 0) {
      hits = 0;
      remaining = moves;
    }
    hits += Math.floor(remaining / 100);
  }

  zeroCounts += hits;
  const delta = direction === "R" ? moves : -moves;
  dial = ((dial + delta) % 100 + 100) % 100;
});
console.log(`Part Two Answer: ${zeroCounts}`);