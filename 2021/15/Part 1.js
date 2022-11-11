const formatter = require('../../shared/formatting/format-puzzle-input');
const twoDArr = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
let storedKeys = {};
const lineLength = 100; // 10 for sample input
const totalItems = 10000; // 100 for sample input
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
    if (i === 1) storedKeys[i] = 'start';
    else if (i === totalItems) storedKeys[i] = 'finish';
    else storedKeys[i] = getNextIdentifier();
  }
}

function dijkstra(graph) {
  const costs = Object.assign({ finish: Infinity }, graph.start);
  const parents = { finish: null };
  for (let child in graph.start) parents[child] = 'start';
  const processed = [];
  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs.finish,
    path: optimalPath
  };

  return results;
}

function lowestCostNode(costs, processed) {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) lowest = node;
    }
    return lowest;
  }, null);
}

function getWeightedRelationships() {
  let weightedRelationships = { finish: {} };
  for (let i = 0; i < twoDArr.length; i++) {
    const lineArr = twoDArr[i];
  
    for (let j = 0; j < lineArr.length; j++) {
      const adj = +lineArr[j + 1] ?? null;
      const below = twoDArr[i + 1] ? +twoDArr[i + 1][j] : null;
      if (i === 0 && j === 0) {
        weightedRelationships['start'] = { [storedKeys[2]]: adj, [storedKeys[[i + 1 + lineLength]]]: below }
      }
      else {
        let itemNum = storedKeys[j + 1 + (i * lineLength)];
        const belowName = storedKeys[j + 1 + (lineLength * (i + 1))];
        const adjName = storedKeys[j + 2 + (lineLength * i)];
  
        if (adj && below) weightedRelationships[itemNum] = { [adjName]: adj, [belowName]: below };
        else if (adj) weightedRelationships[itemNum] = { [adjName]: adj };
        else if (below) weightedRelationships[itemNum] = { [belowName]: below };
      }
    }
  }

  return weightedRelationships;
}

setStoredKeys();
const weightedRelationships = getWeightedRelationships();
const dijkstraResult = dijkstra(weightedRelationships);
console.log(`Part One Answer: ${dijkstraResult.distance}`);