const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
const deviceAdapter = (data.sort((a, b) => b - a)[0]) + 3;
const chargingOutlet = 0;
let sortedAdapters = [chargingOutlet, ...data, deviceAdapter].sort((a, b) => a - b);

function getValidPairs(list) {
  let pairs = [];
  list.slice(0, list.length - 1).forEach(function (first, n) {
    let tail = list.slice(n + 1, list.length);
    tail.forEach((item) => {
      if ((first - item > 0 && first - item <= 3) ||
        (item - first > 0 && item - first <= 3)) {
        if (first > item) pairs.push([item, first])
        else pairs.push([first, item])
      }
    })
  })
  return pairs;
}

let validPairs = getValidPairs(sortedAdapters);
let final = [];
let queue = [];

sortedAdapters.forEach(d => {
  // check if valid pairs has more than one pair with the 'one' equaling 'd'
  let count = 0;
  let match;
  let matches = [];

  validPairs.forEach(pair => {
    [one, two] = [pair[0], pair[1]];

    if (one === d) {
      count++;
      match = pair;
      matches.push(pair);
    }
  })

  // if there was only one possible match for the adapter, then add it to final
  if (count === 1) final.push(match);
  // if there are multiple possible matches, then save them to check later.
  else if (count > 1) queue = [...queue, ...matches];
  else if (d !== deviceAdapter) console.error('didnt find match...', count, d);
})

while (final.length !== sortedAdapters.length - 1) {
  for (let i = 0; i < queue.length; i++) {
    [i1, i2] = [queue[i][0], queue[i][1]];
    let oneExists = false;
    let twoExists = false;

    // check against queue
    for (let j = 0; j < queue.length; j++) {
      if (i !== j) {
        [j1, j2] = [queue[j][0], queue[j][1]];
        if (i1 === j1) oneExists = true;
        if (i2 === j2) twoExists = true;
      }
    }

    // check against final
    for (let k = 0; k < final.length; k++) {
      [k1, k2] = [final[k][0], final[k][1]];
      if (i1 === k1) oneExists = true;
      if (i2 === k2) twoExists = true;
    }

    if (!oneExists || !twoExists) {
      const adding = queue[i];
      final.push(adding);
      queue.splice(i, 1);

      // loop through queue to remove any matches to the one we just added
      for (let m = 0; m < queue.length;) {
        [m1, m2] = [queue[m][0], queue[m][1]];
        if (m1 === adding[0] || m2 === adding[1]) queue.splice(m, 1);
        else m++;
      }
    }
  }
}

let diffOf1 = 0;
let diffOf3 = 0;
final.forEach(f => {
  let diff = f[0] > f[1] ? f[0] - f[1] : f[1] - f[0];
  if (diff === 1) diffOf1++;
  else if (diff === 3) diffOf3++;
})

console.log(`Part One Answer: ${diffOf1 * diffOf3}`);