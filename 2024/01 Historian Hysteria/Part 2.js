const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let listOne = []
let listTwoOccurences = {}
let similarityScore = 0
data.forEach(line => {
  nums = line.split(' ')
  listOne.push(+nums[0])
  listTwoNum = +nums[nums.length - 1]
  if (!(listTwoNum in listTwoOccurences)) listTwoOccurences[listTwoNum] = 1
  else listTwoOccurences[listTwoNum] += 1
})

for (let i = 0; i < listOne.length; i++) {
  if (listOne[i] in listTwoOccurences) similarityScore += listOne[i] * listTwoOccurences[listOne[i]]
}

console.log(`Part Two Answer: ${similarityScore}`);