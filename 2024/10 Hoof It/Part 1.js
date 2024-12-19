const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let trailheads = [ /** { x: 0, y: 0, reachable9s: [] } */ ]
let allPositions = { /** xyOfPosition: height */ };
let totalScore = 0;
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    if (+data[y][x] === 0) trailheads.push({ x: x, y: y, reachable9s: [] })
    allPositions[`x${x}y${y}`] = +data[y][x];
  }
}

for (let i = 0; i < trailheads.length; i++) {
  const trailhead = trailheads[i];
  let nextRequiredHeight = 1;
  let score = search(nextRequiredHeight, trailhead.x, trailhead.y, []);
  totalScore += score;
}

function search(goalHeight, currentX, currentY, reachable9s) {
  const directions = [
    { x: currentX, y: currentY - 1 }, // Up
    { x: currentX, y: currentY + 1 }, // Down
    { x: currentX + 1, y: currentY }, // Right
    { x: currentX - 1, y: currentY }, // Left
  ];

  for (const { x, y } of directions) {
    const neighborLocation = `x${x}y${y}`;
    const neighborHeight = allPositions[neighborLocation];
    if (neighborHeight === goalHeight) {
      if (goalHeight === 9 && !reachable9s.includes(neighborLocation)) reachable9s.push(neighborLocation);
      else search(goalHeight + 1, x, y, reachable9s)
    }
  }
  return reachable9s.length;
}

console.log(`Part One Answer: ${totalScore}`);