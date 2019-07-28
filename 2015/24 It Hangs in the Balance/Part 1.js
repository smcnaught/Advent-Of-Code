let fs = require('fs');
let allPackageWeights = fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').split('\n').map(Number);
let weightPerGroup = allPackageWeights.reduce((a, b) => a + b) / 3;
let fewestPackages = currentLowestQE = Math.pow(10, 1000);

function getSubsetsThatSumTo(weightPerGroup, packageWeights) {
  let wheel = [0];
  let sum = 0;

  while (sum != null) {
    sum = increment(0, sum, packageWeights, wheel);

    if (sum != null && !(weightPerGroup - sum)) {
      let subset = packageWeights.filter((num, index) => wheel[index] === 1);
      let subsetQE = subset.reduce((a, b) => a * b);

      if (subset.length < fewestPackages) {
        fewestPackages = subset.length;
        currentLowestQE = subsetQE;
      }
      else if (subset.length === fewestPackages && subsetQE < currentLowestQE) currentLowestQE = subsetQE;
    }
  }
}

function increment(position, sum, numbers, wheel) {
  if (position === numbers.length || sum === null) return null;
  wheel[position]++;
  if (wheel[position] === 2) {
    wheel[position] = 0;
    sum -= numbers[position];
    if (wheel.length < position + 2) wheel.push(0);
    sum = increment(position + 1, sum, numbers, wheel);
  }
  else sum += numbers[position];
  return sum;
}

getSubsetsThatSumTo(weightPerGroup, allPackageWeights);

console.log(`Part One Answer: ${currentLowestQE}`);