/**
 * *** Depth First Search ***
 * 
 * *** Documentation: *** * 
 * https://levelup.gitconnected.com/the-magicians-guide-to-algorithms-part-5-the-depth-first-search-2223203174bb
 * https://hackernoon.com/graphs-in-cs-and-its-traversal-algorithms-cfee5533f74e#:~:targetText=Depth%2Dfirst%20Search%20(DFS),path%2C%20and%20then%20explores%20it.
 * https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/depth-first-search
 * 
 * 
 * *** Description: ***
 * Depth-first search is a common way that many people naturally use when solving problems like mazes.
 * First, we select a path in the maze and we follow it until we hit a dead end or reach the end of the maze.
 * If a given path doesn’t work, we backtrack and take an alternative path from a past junction, and try that path.
 * 
 * 
 * *** Differences between Breadth First and Depth First ***
 *  -BFS algorithm starts shallow and digs deeper row by row. 
 *  -DFS on the other hand quickly dives deep into the structure you are searching, 
 *   quickly reaching the bottom and then working its way back up to the top.
 * 
 *  -If a solution is not far from the root of the tree it would be obvious to use BFS 
 *   since it quickly searches the top of the data structure first. 
 *   However, if your solution could be deep inside the data structure, a DFS algorithm 
 *   would dive quickly down in search of it. Also, in the case of wide trees a DFS search
 *   is more effective while a narrow tree is easily traversed by a BFS search.
 */


function depthFirstSearch(tree, value) {
  let stack = [tree[0]];

  while (stack.length !== 0) {
    
    for (let i = 0; i < stack.length; i++) {

      // You can see how it's traversing by console logging this
      // console.log("=================================");
      // console.log(stack);
      // console.log("=================================");

      let node = stack.pop();

      if (node.value === value) return node;
      if (node.right) stack.push(tree[node.right]);
      if (node.left) stack.push(tree[node.left]);
    }
  }
  return null;
}

/**
 * left is a reference to that node's left child (example if you look at '6', the left child is '5')
 * right is a reference to that node's right child (example if you look at '6' the right child is '7')
 */
let tree = [
  { value: 6, left: 1, right: 2 },
  { value: 5, left: 3, right: 4 },
  { value: 7, left: null, right: 5 },
  { value: 3, left: 6, right: null },
  { value: 4, left: null, right: null },
  { value: 9, left: 7, right: 8 },
  { value: 2, left: 9, right: null },
  { value: 8, left: null, right: null },
  { value: 10, left: null, right: null },
  { value: 1, left: null, right: null }
];

// This is how the tree looks as a graph:
//          6
//         / \
//        5   7
//       / \   \
//      3   4   9
//     /       / \
//    2       8   10
//   /
//  1

let goalValue = 8;
let answer = depthFirstSearch(tree, goalValue);
console.log(answer);