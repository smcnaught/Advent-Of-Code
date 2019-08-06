let fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").replace(/\^|\$/g, "");

function partTwo(input) {
  let getDist = (y) => rows[y] || (rows[y] = {});
  let cur = { x: 0, y: 0, dist: 0 };
  let dists = [], allRoutes = [cur];
  let rows = {};

  let add = (xDist, yDist) => {
    let node = getDist(cur.y + yDist)[cur.x + xDist] || { x: (cur.x + xDist), y: (cur.y + yDist), dist: Math.pow(10, 1000) };
    node.dist = Math.min(node.dist, cur.dist + 1);
    cur = node;
    getDist(node.y)[node.x] = node;
  }

  input.split("").forEach(char => {
    switch (char) {
      case "N": add(0, -1); break;
      case "S": add(0, 1); break;
      case "E": add(1, 0); break;
      case "W": add(-1, 0); break;
      case "(": allRoutes.push(cur); break;
      case ")": cur = allRoutes.pop(); break;
      case "|": cur = allRoutes[allRoutes.length - 1]; break;
      default: console.log("Invalid input in switch statement", c); break;
    }
  });

  for (let key in rows)
    for (let prop in rows[key]) dists.push(rows[key][prop].dist);

  return dists.filter(d => d >= 1000).length;
}

console.log(`Part Two Answer: ${partTwo(input)}`);