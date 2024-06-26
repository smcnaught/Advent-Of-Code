const formatter = require('../../shared/formatting/format-puzzle-input');
let time, recordDistance = null
let totalWins = 0
new formatter.Formatter(__dirname).getArrayOfStringsByLine().forEach(el => {
  arr = el.split('  ')
  arr.forEach((n, i) => {
    num = +arr.join('').replace(/Distance:|Time:/, '').replace(/ /g, '')
    if (arr[0] === 'Time:') time = num
    else recordDistance = num
  })
})

for (let i = 1; i <= time; i++) {
  distanceTraveled = i * (time - i)
  if (distanceTraveled > recordDistance) totalWins++
}

console.log(`Part Two Answer: ${totalWins}`)