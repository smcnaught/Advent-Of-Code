let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
const createMap = (source) => source.replace(/\r/g, '').split('\n').map(e => e.split(''));
const result = createMap(source);
const asteroids = createMap(source);

function getGCD(a, b) {
  if (b) return getGCD(b, a % b);
  else return Math.abs(a);
}

function checkLineOfSight(x1, y1, x2, y2) {
  const gcd = getGCD(y2 - y1, x2 - x1);
  const dy = (y2 - y1) / gcd;
  const dx = (x2 - x1) / gcd;
  let x = x1 + dx;
  let y = y1 + dy;

  if (asteroids[y2][x2] !== "#" ||
    asteroids[y1][x1] !== "#" ||
    y2 === y1 && x2 === x1 ||
    dx === dy && dy === 0) return false;

  while (asteroids[y][x]) {
    if (asteroids[y][x] === "#") return y === y2 && x === x2;
    y += dy;
    x += dx;
  }
}

function partOne()
{
  let maxCount = 0;
  for (let y = 0; y < asteroids.length; y++) {
    for (let x = 0; x < asteroids[0].length; x++) {
      let count = 0;
      for (let y2 = 0; y2 < asteroids.length; y2++) {
        for (let x2 = 0; x2 < asteroids[0].length; x2++) {
          count += +checkLineOfSight(x, y, x2, y2);
        }
      }
      result[y][x] = count;
      if (count > maxCount) maxCount = count;
    }
  }
  return maxCount;
}

console.log(`Part One Answer: ${partOne()}`);