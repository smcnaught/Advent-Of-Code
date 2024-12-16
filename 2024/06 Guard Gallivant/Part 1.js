const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let map = [ /** { x: 0, y: 0, sym: '.', visited: false } **/ ]
let guardPositionX = null;
let guardPositionY = null;

for (let x = 0; x < data.length; x++) {
  for (let y = 0; y < data[x].length; y++) {
    if (data[x][y] === '^') {
      guardPositionX = x;
      guardPositionY = y;
      map.push({ x: x, y: y, sym: '.', visited: true })
    }
    else map.push({ x: x, y: y, sym: data[x][y], visited: false })
  }
}

const getMapElement = (x, y) => map.find(el => el.x === x && el.y === y)
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
      positionOnMap.visited = true;
    }
  }
}

patrol()
console.log(`Part One Answer: ${map.filter(el => el.visited === true).length}`);