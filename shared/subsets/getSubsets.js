let fs = require("fs");

const combine = (a, min) => {
  const fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) all[all.length] = got;
      return;
    }
    for (let j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  let all = [];
  for (let i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

/**
 * Works with numbers or strings
 */
const data = [1, 2, 3];
// const data = ["blue", "green", "red"];

const minimumSubsetLengthDesired = 1;
let subsets = combine(data, minimumSubsetLengthDesired);

/**
 * Write combos to file
 */
let file = fs.createWriteStream('writeTo.txt');
file.on('error', (err) => console.error(err));
subsets.forEach((v) => file.write(v.join(', ') + '\n'))
file.end();

console.log('results written to file');