const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let facing = "E";

[up, right] = [0, 0]; // if it's positive, we're north && east. If negative, we're south and west

data.forEach(inst => {
  const action = inst[0];
  const units = +inst.substring(1, inst.length);
  
  switch(action) {
    case 'N':
      up += units;
      break;
    case 'S': 
      up -= units;
      break;
    case 'E':
      right += units;
      break;
    case 'W':
      right -= units;
      break;
    case 'L':
      facing = turn("left", units);
      break;
    case 'R':
      facing = turn("right", units);
      break;
    case 'F':
      if (facing === "N") up += units;
      else if (facing === "S") up -= units;
      else if (facing === "E") right += units;
      else if (facing === "W") right -= units;
      break;
  }
})

function turn(dir, units) {
  let loops = units / 90;
  let newDir = facing;

  for (let i = 0; i < loops; i++) {
    if (dir === "left") {
      newDir = newDir === "N" ? "W" :
               newDir === "W" ? "S" :
               newDir === "S" ? "E" :
               newDir === "E" ? "N" :
               undefined;
    }
    else if (dir === "right") {
      newDir = newDir === "N" ? "E" :
               newDir === "E" ? "S" :
               newDir === "S" ? "W" :
               newDir === "W" ? "N" :
               undefined;
    }
  }

  return newDir;
}

let manhattan = Math.abs(up) + Math.abs(right);
console.log(`Part One Answer: ${manhattan}`);