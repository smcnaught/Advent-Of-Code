let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let input = text.split('\n').map(str => (str.match(/-?[0-9]+/g) || []).map(Number))
let closest = {};
let closest2 = {};

let sorter = (arr) => {
  return arr.sort((a, b) => {
    if (a[1] == b[1]) return 0;
    return (a[1] > b[1] ? 1 : -1);
  })
}

// Non infinite area  - - maybe between -500 & 900
let main = (closest, start, end) => {
  for (let i = start; i < end; i++) {
    for (let j = start; j < end; j++) {
      let gridPoint = [i, j];
      let distances = [];
      for (const point of input) {
        // use absolute values to get the distances between the gridPoints and the current point in our input
        let dist = Math.abs(point[0] - gridPoint[0]) + Math.abs(point[1] - gridPoint[1]);
        distances.push([point, dist])
      }

      sorter(distances);
      if (distances[0][1] === distances[1][1]) continue;
      let distToIncrement = closest[distances[0][0]];
      closest[distances[0][0]] = (distToIncrement || 0) + 1;
    }
  }
}

main(closest, -400, 800);
main(closest2, -450, 850);

// Turn object into multidimensional array with two items (key, value);
closest = sorter(Object.entries(closest));
closest2 = sorter(Object.entries(closest2));

for (let i = closest2.length - 1; i >= 0; i--) {
  if (closest[i][1] === closest2[i][1]) {
    console.log(`Part One Answer: ${closest[i][1]}`);
    break;
  }
}