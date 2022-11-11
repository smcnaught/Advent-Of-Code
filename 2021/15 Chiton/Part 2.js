const lineLength = 500; // 50 for sample input
const totalItems = 250000; // 2500 for sample input
const isSample = false;
const formatter = require('../../shared/formatting/format-puzzle-input');
const twoDArr = new formatter.Formatter(__dirname, isSample).get2DArrayOfStrings('');
let storedKeys = {};
const procNodes = {};
let current = 'z';
let layer = 0;
let alphabet = [];

function getNextIdentifier() {
  const posOfCurrent = alphabet.findIndex(letter => letter === current[0]);
  let next = posOfCurrent + 1 >= alphabet.length ? alphabet[0] : alphabet[posOfCurrent + 1];

  if (layer > 0) next = next.repeat(layer + 1);
  if (next.includes('z')) layer++;
  current = next;

  return current;
}

function setStoredKeys() {
  for (let n = 0; n < 26; n++) alphabet.push(String.fromCharCode(97 + n));
  for (let i = 1; i <= totalItems; i++) {
    let nextIdentifier = i === 1 ? 'start' :
                         i === totalItems ? 'finish' : 
                         getNextIdentifier();

    storedKeys[i] = nextIdentifier;
    procNodes[nextIdentifier] = false;
  }
}

let costs;
function dijkstra(graph) {
  costs = Object.assign({ finish: Infinity }, graph.start);
  let node = lowestCostNode(graph);

  while (node) {
    let cost = costs[node];
    let children = graph[node];

    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n] || costs[n] > newCost) costs[n] = newCost;
    }

    procNodes[node] = true;
    node = lowestCostNode(graph);
  }

  return costs.finish;
}

function lowestCostNode(graph) {
  const thing = Object.keys(costs).reduce((previous, current) => {
    if ((previous === null || costs[current] < costs[previous]) && !procNodes[current]) {
      previous = current;
    }
    return previous;
  }, null);

  return thing;
}

function getWeightedRelationships() {
  let weightedRelationships = { finish: {} };
  const cloney = JSON.parse(JSON.stringify(twoDArr));
  let toRight = [...JSON.parse(JSON.stringify(cloney))];
  
  for (let i = 0; i < cloney.length; i++) {
    const singleLine = cloney[i];
  
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < singleLine.length; k++) {
        let singleNumInLine = +singleLine[k];
        const newNum = singleNumInLine + 1 > 9 ? 1 : singleNumInLine + 1;
        toRight[i].push(newNum);
        cloney[i][k] = newNum;
      }
    }
  }
  
  let cloney2 = JSON.parse(JSON.stringify(toRight));
  let fullArr = [...JSON.parse(JSON.stringify(toRight))];
  let tempNewCloney = [];
  
  for (let m = 0; m < 4; m++) {
    for (let i = 0; i < cloney2.length; i++) {
      const singleLine = cloney2[i];
      const newLine = [];
    
      for (let j = 0; j < singleLine.length; j++) {
        let singleNumInLine = +singleLine[j];
        const newNum = singleNumInLine + 1 > 9 ? 1 : singleNumInLine + 1;
        newLine.push(newNum);
      }
    
      fullArr.push(newLine);
      tempNewCloney.push(newLine);
    }
    
    cloney2 = JSON.parse(JSON.stringify(tempNewCloney));
    tempNewCloney = [];
  }
  
  for (let i = 0; i < fullArr.length; i++) {
    const lineArr = fullArr[i];
  
    for (let j = 0; j < lineArr.length; j++) {
      const right = +lineArr[j + 1] ?? null;
      const left = lineArr[j - 1] ? +lineArr[j - 1] : null;
      const below = fullArr[i + 1] ? +fullArr[i + 1][j] : null;
      const above = fullArr[i - 1] ? +fullArr[i - 1][j] : null;

      if (i === 0 && j === 0) {
        weightedRelationships['start'] = { [storedKeys[2]]: right, [storedKeys[[i + 1 + lineLength]]]: below }
      }
      else if (i === fullArr.length - 1 && j === lineArr.length - 1) {
        weightedRelationships['finish'] = {
          [storedKeys[totalItems - 1]]: left,
          [storedKeys[totalItems - lineLength]]: above,
        }
      }
      else {
        let itemNum = storedKeys[j + 1 + (i * lineLength)];
        const aboveName = storedKeys[j + 1 + (lineLength * (i - 1))];
        const belowName = storedKeys[j + 1 + (lineLength * (i + 1))];
        const rightName = storedKeys[j + 2 + (lineLength * i)];
        const leftName = storedKeys[j + (lineLength * i)];
  
        if (right && below && left && above) {
          weightedRelationships[itemNum] = {
            [rightName]: right,
            [belowName]: below,
            [aboveName]: above,
            [leftName]: left,
          };
        }
        else {
          if (right || below || left || above) weightedRelationships[itemNum] = {};
          if (right) weightedRelationships[itemNum][rightName] = right;
          if (below) weightedRelationships[itemNum][belowName] = below;
          if (left) weightedRelationships[itemNum][leftName] = left;
          if (above) weightedRelationships[itemNum][aboveName] = above;
        }
      }
    }
  }

  return weightedRelationships;
}

setStoredKeys();
const weightedRelationships = getWeightedRelationships();
const dijkstraResult = dijkstra(weightedRelationships);
console.log(`Part Two Answer: ${dijkstraResult}`);