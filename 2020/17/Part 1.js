const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let cachedNeighbors = {}; // { 'x,y,z': [ '1,1,1', '2,2,1', '2,3,4', etc...] } for each coord, the array of it's neighbors
let combos;
const ACTIVE = "#";
const INACTIVE = ".";

function setMap(arr) {
  let map = {}; // { 'x, y, z': '#', 'x,y,z': '.' }
  let z = 0;
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      const key = `${x},${y},${z}`;
      map[key] = arr[y][x];
    }
  }
  return map;
}

function getAllCombos(toCheck) {
  let combos = [];
  for (let i = 0; i < toCheck.length; i++) {
    for (let j = 0; j < toCheck.length; j++) {
      for (let k = 0; k < toCheck.length; k++) {
        let strs = [
          [toCheck[i], toCheck[i], toCheck[i]].join(','),
          [toCheck[i], toCheck[j], toCheck[k]].join(','),
          [toCheck[i], toCheck[k], toCheck[j]].join(','),
          [toCheck[j], toCheck[j], toCheck[j]].join(','),
          [toCheck[j], toCheck[i], toCheck[k]].join(','),
          [toCheck[j], toCheck[k], toCheck[i]].join(','),
          [toCheck[k], toCheck[k], toCheck[k]].join(','),
          [toCheck[k], toCheck[j], toCheck[i]].join(','),
          [toCheck[k], toCheck[i], toCheck[j]].join(','),
        ];

        strs.forEach(s => {
          if (!combos.includes(s)) combos.push(s)
        })
      }
    }
  }
  return combos
}

function getNeighbors(coordStr) {
  let coordArr = coordStr.split(',').map(Number); // [0, 0, 0]
  let neighbors = [];

  combos.forEach(combo => {
    const comboArr = combo.split(',').map(Number);; // [0, 1, 1]
    const neighbor = comboArr.map((c, i) => c + coordArr[i]).join(',');
    if (neighbor !== coordStr) neighbors.push(neighbor);
  })

  return neighbors
}

function runCycles(toRun, map) {
  // all cubes simultaneously change state based on the following
  for (let cycle = 1; cycle <= toRun; cycle++) {
    let newMap = JSON.parse(JSON.stringify(map));
    let otherNeighbors = {};

    // loop through the map
    Object.entries(map).forEach(([key, value]) => {
      let neighborsOfCurrent;
      // check if cache has neighbors for current
      if (!cachedNeighbors[key]) {
        neighborsOfCurrent = getNeighbors(key);
        cachedNeighbors[key] = neighborsOfCurrent;
      }
      else neighborsOfCurrent = cachedNeighbors[key];

      let activeNeighbors = 0;
      let inactiveNeighbors = 0;

      neighborsOfCurrent.forEach(neighbor => {
        if (!map[neighbor]) otherNeighbors[neighbor] = INACTIVE;
        if (map[neighbor] === ACTIVE) activeNeighbors++;
        else if (map[neighbor] === INACTIVE || !map[neighbor]) inactiveNeighbors++;
      })

      // If a cube is active
      // and exactly 2 or 3 of its neighbors are also active, 
      // the cube remains active. 
      // Otherwise, the cube becomes inactive.
      if (value === ACTIVE) {
        if (activeNeighbors !== 2 && activeNeighbors !== 3) newMap[key] = INACTIVE;
      }

      // If a cube is inactive 
      // but exactly 3 of its neighbors are active, 
      // the cube becomes active. 
      // Otherwise, the cube remains inactive.
      else {
        if (activeNeighbors === 3) newMap[key] = ACTIVE;
      }
    });

    // Now have to check other neighbors.
    Object.entries(otherNeighbors).forEach(([key, value]) => {
      let neighborsOfCurrent;
      // check if cache has neighbors for current
      if (!cachedNeighbors[key]) {
        neighborsOfCurrent = getNeighbors(key);
        cachedNeighbors[key] = neighborsOfCurrent;
      }
      else neighborsOfCurrent = cachedNeighbors[key];

      let activeNeighbors = 0;
      let inactiveNeighbors = 0;

      neighborsOfCurrent.forEach(neighbor => {
        if (map[neighbor] === ACTIVE) activeNeighbors++;
        else if (map[neighbor] === INACTIVE || !map[neighbor]) inactiveNeighbors++;
      })

      if (activeNeighbors === 3) newMap[key] = ACTIVE; 
    })

    map = JSON.parse(JSON.stringify(newMap));
  }

  return map;
}

function partOne() {
  const map = setMap(data);
  combos = getAllCombos([-1, 0, 1]);
  const finalMap = runCycles(6, map);

  let count = 0;
  Object.entries(finalMap).forEach(([key, value]) => {
    if (value === ACTIVE) count++;
  })

  console.log(`Part One Answer: ${count}`);
}

partOne();