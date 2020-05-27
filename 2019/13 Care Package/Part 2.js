let fs = require('fs');
let all = fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').replace(/\n/g, '').split(',').map(Number);
let relativeBase = ip = score = 0;
let tiles = [];
let output = [];

function getValWithMode(mode, index, type) {
  const positionMode = 0;
  const immediateMode = 1;
  const relativeMode = 2;
  if (type === 'value') {
    if (mode === positionMode) return +all[all[index]];
    else if (mode === immediateMode) return +all[index];
    else if (mode === relativeMode) return +all[all[index] + relativeBase];
  }
  else if (type === 'position') {
    if (mode === positionMode) return all[index];
    else if (mode === relativeMode) return all[index] + relativeBase;
  }
}

function runIntCodeComp() {
  const getBall = () => tiles.find(tile => tile.id === 4);
  const getPaddle = () => tiles.find(tile => tile.id == 3);

  all[0] = 2;
  let opCode = null;
  while (opCode !== 99) {
    if (output.length == 3)
    {
      const x = output[0];
      const y = output[1];
      const tileId = output[2];
      if (x == -1 && y == 0) score = output[2];
      else
      {
        const tile = tiles.find(el => el.x == x && el.y == y);
        if (!tile) tiles.push({ x: x, y: y, id: tileId });
        else tile.id = tileId;

        if (tileId == 4) {
          const ball = getBall();
          ball.x = x;
          ball.y = y;
        } 
        else if (tileId == 3)
        {
          const paddle = getPaddle();
          paddle.x = x;
          paddle.y = y;
        }
      }

      output = []
    }

    const str = all[ip].toString().padStart(5, '0');
    opCode = +str.slice(3);

    const mode1 = +str[2];
    const mode2 = +str[1];
    const mode3 = +str[0];

    let first = getValWithMode(mode1, ip + 1, 'value');
    const second = getValWithMode(mode2, ip + 2, 'value');
    const store = getValWithMode(mode3, ip + 3, 'position');

    if (opCode === 1) {
      all[store] = first + second;
      ip += 4;
    }
    else if (opCode === 2) {
      all[store] = first * second;
      ip += 4;
    }
    else if (opCode === 3) {
      const ball = getBall();
      const paddle = getPaddle();
      const input = (
        ball.x > paddle.x ? 1 : // joystick tilted to right
        ball.x < paddle.x ? -1 : // joystick tilted to left
        0 // joystick neutral
      )
      first = getValWithMode(mode1, ip + 1, 'position');
      all[first] = input;
      ip += 2;
    }
    else if (opCode === 4) {
      output.push(first);
      ip += 2;
    }
    else if (opCode === 5) {
      if (first !== 0) ip = second;
      else ip += 3;
    }
    else if (opCode === 6) {
      if (first === 0) ip = second;
      else ip += 3;
    }
    else if (opCode === 7) {
      all[store] = first < second ? 1 : 0;
      ip += 4;
    }
    else if (opCode === 8) {
      all[store] = first === second ? 1 : 0;
      ip += 4;
    }
    else if (opCode === 9) {
      relativeBase += first;
      ip += 2;
    }
  }

  console.log(`Part Two Answer: ${score}`);
  return output;
}

runIntCodeComp();