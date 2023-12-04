const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let games = {/** game id: {red: 0, green: 0, blue: 0} **/ }
data.forEach(d => {
  gameId = d.split('Game ').pop().split(':')[0]
  games[gameId] = []
  arr = d.replace(/Game \d+: /g, '').replace(/, /g, ',').split(';')
  
  for (var setNum = arr.length - 1; setNum >= 0; setNum--) {
    let sets = arr[setNum].trim().split(',')
    current = {red: 0, green: 0, blue: 0}
    
    for (let j = 0; j < sets.length; j++) {
      [count, color] = sets[j].split(' ')
      current[color] += +count
    }

    games[gameId].push(current)
  }
})

let gameIds = []
Object.entries(games).forEach(([gameId, sets]) => {
  let include = true
  Object.entries(sets).forEach(([setId, set]) => {
    if (set.red > 12 || set.green > 13 || set.blue > 14) include = false
  })

  if (include) gameIds.push(gameId)
})

let sum = gameIds.reduce((a, b) => +a + +b)
console.log(`Part One Answer: ${sum}`);