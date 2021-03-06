let linkedList = require('../linked-list/linked-list');

/**
 * *** Breadth First Search Using A Linked List ***
 * 
 * *** Documentation: ***
 * http://gregtrowbridge.com/a-basic-pathfinding-algorithm/  *** Implementation ***
 * https://hackernoon.com/breadth-first-search-in-javascript-e655cd824fa4  *** Explanation with pics ***
 * 
 * *** Description: ***
 * Checks every possible path of length 1 and then of length 2 and so on
 * until finding the first shortest path that takes us from point A to point B
 * 
 * Imagine a graph where some coordinates are blocked and you need to find the
 * shortest path from one coordinate to another; this algorithm will find it.
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

/**
 * *** Methods for algorithm ***
 */

// Start location will be in the following format: [distanceFromTop, distanceFromLeft]
function findShortestPath(startCoordinates, grid) {
  let distanceFromTop = startCoordinates[0];
  let distanceFromLeft = startCoordinates[1];

  // Each 'location' will store its coordinates and the shortest path required to arrive there
  let location = {
    distanceFromTop,
    distanceFromLeft,
    path: [],
    status: 'Start'
  }

  // Initialize the queue with the start location already inside
  // The queue keeps track of the nodes that need to be searched next
  const queue = new linkedList.LinkedList();
  queue.push(location);


  // Loop through the grid searching for the goal
  while (!queue.isEmpty()) {

    // Take the first location off the queue
    let currentLocation = queue.delete(0).value;

    let directions = ["North", "East", "South", "West"];
    for (dir in directions) {
      let newLocation = exploreInDirection(currentLocation, directions[dir], grid);
      if (newLocation.status === 'Goal') return newLocation.path;
      else if (newLocation.status === 'Valid') queue.push(newLocation);
    }
  }

  // No valid path found
  return false;
}

// Returns a locations status ("Valid", "Invalid", "Blocked", or "Goal")
// returns "Valid" if it is on the grid && it is NOT an obstacle && it has not already been checked by our algorithm
function locationStatus(location, grid) {
  let gridSize = grid.length;
  let distFromTop = location.distanceFromTop;
  let distFromLeft = location.distanceFromLeft;
  let locationNotOnGrid = distFromLeft < 0 || distFromLeft >= gridSize || distFromTop < 0 || distFromTop >= gridSize;

  if (locationNotOnGrid) return 'Invalid';
  else if (grid[distFromTop][distFromLeft] === 'Goal') return 'Goal';
  else if (grid[distFromTop][distFromLeft] !== 'Open') return 'Blocked'; // location is either an obstacle or has been visited
  else return 'Valid';
}

// Explores the grid from the given location in the given direction
function exploreInDirection(currentLocation, direction, grid) {
  let newPath = currentLocation.path.slice();
  newPath.push(direction);

  let distFromTop = currentLocation.distanceFromTop;
  let distFromLeft = currentLocation.distanceFromLeft;

  if (direction === 'North') distFromTop--;
  else if (direction === 'East') distFromLeft++;
  else if (direction === 'South') distFromTop++;
  else if (direction === 'West') distFromLeft--;

  let newLocation = {
    distanceFromTop: distFromTop,
    distanceFromLeft: distFromLeft,
    path: newPath,
    status: 'Unknown'
  }

  newLocation.status = locationStatus(newLocation, grid);

  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
}



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * *** IMPLEMENTATION EXAMPLE ***
 * Setup & test methods by creating a 4X4 grid and represent it as a 2-dimensional array
 */
let grid = Array.from(Array(4), () => new Array(4).fill("Open"));
// console.log(grid);

/**
 * The grid is NOT an x, y graph it's a literal grid, like this:
 *
 *      | A |   |   |   |
 *      |   | X | X | X |
 *      |   | X | B |   |
 *      |   |   |   |   |
 *
 * So the shortest path from A to B is: South, South, East, East, North
 *
 */

grid[0][0] = "Start";
grid[2][2] = "Goal";

grid[1][1] = "Obstacle";
grid[1][2] = "Obstacle";
grid[1][3] = "Obstacle";
grid[2][1] = "Obstacle";

// console.log(grid);

/**
 * *** Important: Keep in mind the coordinates you're passing in here are NOT X & Y. They are [distanceFromTop, distanceFromLeft] ***
 */
let shortestPath = findShortestPath([0, 0], grid);
console.log(`The shortest path is : ${shortestPath}`);

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
