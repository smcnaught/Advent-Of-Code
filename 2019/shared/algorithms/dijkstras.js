/**
 * *** Documentation ***
 * https://hackernoon.com/how-to-implement-dijkstras-algorithm-in-javascript-abdfd1702d04
 * 
 * *** Description ***
 * Dijkstras algorithm is used for finding the shortest paths between nodes in a weighted (there is a cost to get from point to point) graph.
 * 
 * Main Steps in Dijkstra's Algorithm
 *  1. Find the "cheapest" node
 *  2. Update the cost of the immediate neighbors in this node.
 *  3. Repeat steps 1 and 2 until you've done this for every node
 *  4. Return the lowest cost to reach the node, and the optimal path to do so.
 * 
 *  *** See dijkstras.jpeg in same folder to see example problem we're solving ***
 */

// Each node is represented by the keys in the graph object.
// Each key has an object for its value, which represents the immediate neighbors and the cost of reaching that neighbor - see jpeg in same file for more details
const problem = {
  start: { A: 5, B: 2 }, // from 'Start', the cost to get to 'A' is 5, cost to get to 'B' is 2
  A: { C: 4, D: 2 }, // from 'A', the cost to get to 'C' is 4, cost to get to 'D' is 2
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {}
};

// function that returns the minimum cost and path to reach Finish
function dijkstra(graph) {

  // track lowest cost to reach each node
  const costs = Object.assign({ finish: Infinity }, graph.start);

  // track paths
  const parents = { finish: null };
  for (let child in graph.start) {
    parents[child] = 'start';
  }

  // track nodes that have already been processed
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
    distance: costs.finish, // this is the smallest distance - or the lowest cost to get from start to finish
    path: optimalPath
  };

  return results;
};

function lowestCostNode(costs, processed) {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) lowest = node;
    }
    return lowest;
  }, null);
};


console.log(dijkstra(problem));