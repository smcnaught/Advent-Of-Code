const formatter = require('../../shared/formatting/format-puzzle-input');
let caves = {};
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map((str => {
  [start, dest] = str.split('-');

  if (!caves[start]) caves[start] = [];
  if (!caves[dest]) caves[dest] = [];
  caves[start].push(dest);
  caves[dest].push(start);
}))

let paths = [];
function pointVisited(pathArr, point) {
  if (point === 'start') return true;
  else if (point === 'end') return pathArr.includes('end');
  else if (point === point.toUpperCase()) return false;
  else {
    if (!pathArr.includes(point)) return false;
    else {
      const lowerOccurrences = pathArr.reduce(function (acc, curr) {
        if (curr === curr.toLowerCase()) {
          return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }
        return acc
      }, {});
    
      const hasDup = Object.values(lowerOccurrences).some((v) => v === 2);
      return hasDup;
    }
  }
}

function getPaths() {
  let stop = true;
  if (paths.length === 0) {
    caves['start'].forEach(point => {
      paths.push(['start', point]);
      stop = false;
    })
  }
  else {
    paths.forEach((path, index) => {
      // if last item in path array is another array, then replace with more paths
      const lastItem = path[path.length - 1];
      if (lastItem !== 'end') {
        if (Array.isArray(lastItem)) {
          // loop through lastItem
          lastItem.forEach(p => {
            const firstHalf = path.slice(0, path.length - 1);
            if (!pointVisited(firstHalf, p)) {
              const newPath = [...firstHalf, p]; // add a new path for every non visited item in array
              paths.push(newPath)
            }
          })
  
          // remove current path from paths
          paths.splice(index, 1);
          stop = false;
        }
        else {
          // if last item in array is point, 
          // if it's a starting point (has a key in caves) then add that point's array
          if (caves.hasOwnProperty(lastItem)) {
            path.push(caves[lastItem])
            stop = false;
          }
          else {
            // if it's not a starting point, see if you can go back up to the previous point
            const previousPoint = path[path.length - 2];
            if (previousPoint !== lastItem && !pointVisited(path, previousPoint)) {
              path.push(previousPoint)
              stop = false;
            }
          }
        }
      }
    })
  }

  if (!stop) getPaths();
}

getPaths()
console.log(`Part Two Answer: ${paths.length}`)