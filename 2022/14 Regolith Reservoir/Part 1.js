const formatter = require('../../shared/formatting/format-puzzle-input');
let d = new formatter.Formatter(__dirname).get2DArrayOfNumbersWithItemsReplaced([['->', '']]);
[currentSandX, currentSandY] = [500, 0];

function setGraph() {
  const graphWithAir = fillGraphWithAir();
  const graphWithRocks = fillGraphWithRocks(graphWithAir);
  return graphWithRocks;
}

function fillGraphWithAir() {
  let highestX = 510;
  let highestY = 160;
  let graph = [];

  for (let i = 0; i < highestY; i++) {
    let row = [];
    for (let j = 0; j < highestX; j++) row.push('.');
    graph.push(row);
  }

  return graph;
}

function fillGraphWithRocks(graphWithAir) {
  let graphWithRocks = JSON.parse(JSON.stringify(graphWithAir));
  for (let i = 0; i < d.length; i++) {
    const line = d[i];
  
    let pair1 = null;
    let pair2 = null;
    for (let j = 0; j < d[i].length - 1; j+=2) {
      const [x, y] = [line[j], line[j + 1]];
      if (!pair1) pair1 = [x, y];
      else if (!pair2) pair2 = [x, y];
  
      if (pair1 && pair2) {
        [startX, endX, startY, endY] = [pair1[0], pair2[0], pair1[1], pair2[1]];
        if (startY > endY) [startY, endY] = [endY, startY];
        if (startX > endX) [startX, endX] = [endX, startX];

        for (let y = startY; y <= endY; y++) {
          for (let x = startX; x <= endX; x++) {
            graphWithRocks[y][x] = "#";
          }
        }

        pair1 = pair2;
        pair2 = null;
      }
    }
  }

  return graphWithRocks;
}

let sandIsFallingEndlessly = false;
function processSand() {
  let sandProcessed = -1;
  while (!sandIsFallingEndlessly) {
    addSingleSand();
    sandProcessed++;
  }
  console.log(`Part One Answer: ${sandProcessed}`);
}

function addSingleSand() {
  [currentSandX, currentSandY] = [500, 0];
  let resting = false;
  while (!resting) {
    [below, leftDiag, rightDiag] = [getCharBelow(), getCharAtDiagLeft(), getCharAtDiagRight()];
    if (below === '.') moveSandDown();
    else if (leftDiag === '.') moveSandDiagLeft();
    else if (rightDiag === '.') moveSandDiagRight();
    else {
      graph[currentSandY][currentSandX] = 'o';
      resting = true;
    }
  }
}

function getCharBelow() {
  if (!graph[currentSandY + 1]) return sandIsFallingEndlessly = true;
  return graph[currentSandY + 1][currentSandX]; 
}

function getCharAtDiagLeft() {
  if (!graph[currentSandY + 1]) return sandIsFallingEndlessly = true;
  return graph[currentSandY + 1][currentSandX - 1];
}

function getCharAtDiagRight() {
  if (!graph[currentSandY + 1]) return sandIsFallingEndlessly = true;
  return graph[currentSandY + 1][currentSandX + 1];
}

const moveSandDown = () => currentSandY++;
const moveSandDiagLeft = () => [currentSandX, currentSandY] = [currentSandX - 1, currentSandY + 1];
const moveSandDiagRight = () => [currentSandX, currentSandY] = [currentSandX + 1, currentSandY + 1];

let graph = setGraph();
processSand();