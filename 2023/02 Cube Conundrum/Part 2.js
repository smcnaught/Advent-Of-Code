const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let sum = 0
data.forEach(d => {
  arr = d.replace(/Game \d+: /g, '').replace(/, /g, ',').split(';')
  let max = {red: 0, green: 0, blue: 0}
  
  for (var setNum = arr.length - 1; setNum >= 0; setNum--) {
    let sets = arr[setNum].trim().split(',')
    for (let j = 0; j < sets.length; j++) {
      [count, color] = sets[j].split(' ')
      if (+count > max[color]) max[color] = +count
    }
  }
  sum += max.red * max.green * max.blue
})

console.log(`Part Two Answer: ${sum}`);