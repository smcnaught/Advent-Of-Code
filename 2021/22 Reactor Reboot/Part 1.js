const formatter = require('../../shared/formatting/format-puzzle-input');
let instructions = [];
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(ins => {
  const onOff = ins.substring(0, 3).trim();
  ins = ins.substring(3).trim().replace(/x=|y=|z=/g, '');
  const xyzArr = ins.split(',');
  [x, y, z] = [xyzArr[0].split('..'), xyzArr[1].split('..'), xyzArr[2].split('..')];
  if (+x[0] >= -50 && +x[1] <= 50) instructions.push([onOff, { start: x[0], finish: x[1]}, { start: y[0], finish: y[1] }, { start: z[0] , finish: z[1]}])
})

function generateCubes() {
  let cubes = {};
  for (let x = -50; x <= 50; x++) {
    for (let y = -50; y <= 50; y++) {
      for (let z = -50; z <= 50; z++) {
        const cube = `x:${x},y:${y},z:${z}`;
        cubes[cube] = false;
      }
    }
  }

  return cubes;
}

function countOns(cubes) {
  let ons = 0;
  Object.entries(cubes).forEach(([cube, status]) => { if (status) ons++ })
  return ons;
}

function runInstructions() {
  for (let i = 0; i < instructions.length; i++) {
    const current = instructions[i];
    const turnOn = current[0] === 'on';
    [xInfo, yInfo, zInfo] = [current[1], current[2], current[3]];
    
    for (let x = +xInfo.start; x <= +xInfo.finish; x++) {
      for (let y = +yInfo.start; y <= +yInfo.finish; y++) {
        for (let z = +zInfo.start; z <= +zInfo.finish; z++) {
          cubes[`x:${x},y:${y},z:${z}`] = turnOn;
        }
      }
    }
    
  }
}

let cubes = generateCubes()
runInstructions();
console.log(`Part One Answer:${countOns(cubes)}`)