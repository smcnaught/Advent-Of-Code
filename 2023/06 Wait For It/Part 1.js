const formatter = require('../../shared/formatting/format-puzzle-input');
let data = []
let count = 0
new formatter.Formatter(__dirname).getArrayOfStringsByLine().forEach(el => {
  arr = el.split('  ')
  arr.forEach((n, i) => {
    if (n !== '' && !isNaN(n)) {
      if (!isNaN(n) && n !== '') {
        if (arr[0] === 'Time:') data[count] = { time: +n, distance: null }
        else data[count].distance = +n
        count++
      }
      if (i == arr.length - 1) count = 0
    }
  })
})

let totalWins = 1
for (let i = 0; i < data.length; i++) {
  race = data[i]
  wins = 0
  checked = []

  for (let hold = 1; hold < race.time; hold++) {
    time_remaining = race.time - hold;
    if (checked.includes(hold) || checked.includes(time_remaining)) continue;

    dist = time_remaining * hold
    if (dist > race.distance) {
      wins++
      if (time_remaining !== hold) wins++
    }
    checked.push(hold, time_remaining)
  }

  totalWins *= wins
}

console.log(`Part One Answer: ${totalWins}`)