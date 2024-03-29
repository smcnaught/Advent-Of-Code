const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let maps = {'soil': [], 'fertilizer': [], 'water': [], 'light': [], 'temperature': [], 'humidity': [], 'location': []}
let current, lowestLocation = null
let ranges = []

for (let i = 0; i < data.length; i++) {
  key = data[i].split('-')
  if (data[i].includes('seeds: ')) {
    seedInfo = data[i].replace(/seeds: /g, '').split(' ').map(Number)
    for (let i = 0; i < seedInfo.length; i+=2) ranges.push({ start: seedInfo[i], end: (seedInfo[i] + seedInfo[i + 1]) - 1 })
  }
  else if (key.length > 1 && key[2].includes('map:')) current = key[2].split(' ')[0]
  else if (data[i] !== '') {
    map = data[i].split(' ').map(Number)
    maps[current].push({destination: map[0], source: map[1], range: map[2]})
  }
}

location = 0
while (lowestLocation === null) {
  humidity = getNum(location, 'location')
  temperature = getNum(humidity, 'humidity')
  light = getNum(temperature, 'temperature')
  water = getNum(light, 'light')
  fertilizer = getNum(water, 'water')
  soil = getNum(fertilizer, 'fertilizer')
  seed = getNum(soil, 'soil')

  ranges.forEach(range => {
    if (seed >= range.start && seed <= range.end) return lowestLocation = location
  })

  location += 1
}

function getNum(destination, type) {
  let num = null
  for (let i = 0; i < maps[type].length; i++) {
    start_range = maps[type][i].destination
    end_range = start_range + maps[type][i].range
    if (destination >= start_range && destination < end_range) num = maps[type][i].source + (destination - start_range)
  }
  return num === null ? destination : num
}

console.log(`Part Two Answer: ${lowestLocation}`)