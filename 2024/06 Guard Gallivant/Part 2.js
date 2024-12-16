const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let map = [ /** { x: 0, y: 0, sym: '.' } **/ ]
let guardPositionX = null;
let guardPositionY = null;

for (let x = 0; x < data.length; x++) {
  for (let y = 0; y < data[x].length; y++) {
    if (data[x][y] === '^') {
      guardPositionX = x;
      guardPositionY = y;
      map.push({ x: x, y: y, sym: '.' })
    }
    else map.push({ x: x, y: y, sym: data[x][y] })
  }
}

const originalX = guardPositionX;
const originalY = guardPositionY;

const getMapElement = (x, y) => map.find(el => el.x === x && el.y === y)
function patrolAndFindLoops() {
  let stepsTaken = 0;
  let positionOnMap = getMapElement(guardPositionX, guardPositionY)
  let direction = 'up'
  
  while (positionOnMap) {
    let nextX = (direction === 'up') ? guardPositionX-1 : (direction === 'down') ? guardPositionX+1 : guardPositionX;
    let nextY = (direction === 'left') ? guardPositionY-1 : (direction === 'right') ? guardPositionY+1 : guardPositionY;
    let mapElement = getMapElement(nextX, nextY)
    if (!mapElement) return;

    if (mapElement.sym !== '.') direction = (direction === 'up') ? 'right' : (direction === 'down') ? 'left' : (direction === 'left') ? 'up' : (direction === 'right') ? 'down' : null;
    else {
      positionOnMap = mapElement;
      guardPositionX = nextX;
      guardPositionY = nextY;
      stepsTaken++;
      if (stepsTaken > 17000) return true;
    }
  }
  return false;
}

let obstructionPositions = 0;
function testForLoops() {
  const mapClone = JSON.parse(JSON.stringify(map))
  visitedPositions.forEach(visitedPos => {
    map = JSON.parse(JSON.stringify(mapClone))
    let x = visitedPos.x;
    let y = visitedPos.y;
    if (!(x === originalX && y === originalY)) {
      const posInfo = getMapElement(x, y)
      if (posInfo.sym === '.') {
        guardPositionX = originalX;
        guardPositionY = originalY;

        const indx = map.findIndex(el => el.x === x && el.y === y);
        map[indx].sym = '#'
        
        const loopOccurred = patrolAndFindLoops()
        if (loopOccurred) obstructionPositions++;
      }
    }
  })
}

let visitedPositions = [/** {x: 0, y: 0} */]
function patrol() {
  let positionOnMap = getMapElement(guardPositionX, guardPositionY)
  let direction = 'up'
  
  while (positionOnMap) {
    let nextX = (direction === 'up') ? guardPositionX-1 : (direction === 'down') ? guardPositionX+1 : guardPositionX;
    let nextY = (direction === 'left') ? guardPositionY-1 : (direction === 'right') ? guardPositionY+1 : guardPositionY;
    let mapElement = getMapElement(nextX, nextY)
    if (!mapElement) return;
    if (mapElement.sym !== '.') direction = (direction === 'up') ? 'right' : (direction === 'down') ? 'left' : (direction === 'left') ? 'up' : (direction === 'right') ? 'down' : null;
    else {
      positionOnMap = mapElement;
      guardPositionX = nextX;
      guardPositionY = nextY;

      const index = visitedPositions.findIndex(el => el.x === nextX && el.y === nextY);
      if (index == -1) visitedPositions.push({x: nextX, y: nextY })
    }
  }
}

patrol()
testForLoops()
console.log(`Part Two Answer: ${obstructionPositions}`);