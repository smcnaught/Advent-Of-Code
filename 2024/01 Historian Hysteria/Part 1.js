const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let listOne = []
let listTwo = []
let totalDistance = 0;
data.forEach(line => {
  nums = line.split(' ')
  listOne.push(+nums[0])
  listTwo.push(+nums[nums.length - 1])
})

sortedListOne = listOne.sort((a, b) => a - b)
sortedListTwo = listTwo.sort((a, b) => a - b)

for (let i = 0; i < sortedListOne.length; i++) {
  totalDistance += Math.abs(sortedListOne[i] - sortedListTwo[i])
}

console.log(`Part One Answer: ${totalDistance}`);