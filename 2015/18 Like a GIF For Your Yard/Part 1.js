let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').split('');
let y = 100;
let x = 0;
let i = 2000;
let grid = [];
let nextGridState = [];

input.forEach(i => {
  if (i === '\n') {
    y--;
    x = 0;
  }
  else {
    let position = createComplexCoordinate(x, y)
    grid.push({ position: position, status: i });
    x++;
  }
})

let mappedByPositions = grid.map(x => x.position);

function createComplexCoordinate(x, y) {
  return x + y * i;
}

function getNewStatus(position, status) {
  let newStatus = "";
  let neighborStats = getStatusOfNeighbors(position);

  if (status === "#") // LIGHT IS ON
  {
    // if 2 or three are on, then light stays on -- else light turns off
    if (neighborStats.on === 2 || neighborStats.on === 3) newStatus = "#";
    else newStatus = ".";
  }
  else if (status === ".") // LIGHT IS OFF
  {
    // if exactly 3 are on, light turns on -- else light stays off. 
    if (neighborStats.on === 3) newStatus = "#";
    else newStatus = ".";
  }

  return newStatus;
}

function getStatusOfNeighbors(currentPosition) {
  let neighbors = [1999, 2000, 2001, -1, 1, -2001, -2000, -1999]; // based on what your value is for i
  let on = off = 0;

  neighbors.forEach(n => {
    let index = mappedByPositions.indexOf(currentPosition + n);
    let statusOfNeighbor = grid[index] ? grid[index].status : ".";
    if (statusOfNeighbor === "#") on++;
    else off++;
  })

  return { on: on, off: off };
}

function loopXtimes(x) {
  for (let i = 0; i < x; i++) {
    grid.forEach(g => nextGridState.push({ position: g.position, status: getNewStatus(g.position, g.status) }));
    grid = [...nextGridState];
    nextGridState = [];
  }

  let lightsOn = 0;
  grid.forEach(g => { if (g.status === "#") lightsOn++ });
  console.log(`Part One Answer: ${lightsOn}`);
}

loopXtimes(100);