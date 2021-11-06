const formatter = require('../../shared/formatting/format-puzzle-input');
const path = new formatter.Formatter(__dirname).getArrayOfStringsSplitByChar(',');
let x = y = 0;
const max = { x: 0, y: 0 };
const isEven = (num) => num % 2 === 0;
const moves = {
  "n": () => { return { x:0, y:-1 } },
  "ne": (xIsEven) => { if (xIsEven) return { x:1 , y:0 }; else return { x:1 , y:-1 }; },
  "se": (xIsEven) => { if (xIsEven) return { x:1, y:1 }; else return { x:1 , y:0 }; },
  "s": () => { return { x:0, y:1 } },
  "sw": (xIsEven) => { if (xIsEven) return { x:-1, y:1 }; else return { x:-1, y:0 } },
  "nw": (xIsEven) => { if (xIsEven) return { x:-1, y:0 }; else return { x:-1, y:-1 }}
}

path.forEach(direction => {
  const instruction = moves[direction](isEven(x));
  x+=instruction.x;
  y+=instruction.y;
  if (x > max.x) max.x = x;
  if (y > max.y) max.y = y;
})

console.log(`Part Two Answer: ${Math.max(Math.abs(max.x), Math.abs(max.y))}`);