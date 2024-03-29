const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let maps = {'soil': [], 'fertilizer': [], 'water': [], 'light': [], 'temperature': [], 'humidity': [], 'location': []}
let current, seeds = null
let lowestLocation = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < data.length; i++) {
  key = data[i].split('-')
  if (data[i].includes('seeds: ')) seeds = data[i].replace(/seeds: /g, '').split(' ').map(Number)
  else if (key.length > 1 && key[2].includes('map:')) current = key[2].split(' ')[0]
  else if (data[i] !== '') {
    map = data[i].split(' ').map(Number)
    maps[current].push({destination: map[0], source: map[1], range: map[2]})
  }
}

seeds.forEach((seed) => {
  soil = getNum(seed, 'soil')
  fertilizer = getNum(soil, 'fertilizer')
  water = getNum(fertilizer, 'water')
  light = getNum(water, 'light')
  temperature = getNum(light, 'temperature')
  humidity = getNum(temperature, 'humidity')
  location = getNum(humidity, 'location')
  if (location < lowestLocation) lowestLocation = location
})

function getNum(source, type) {
  let num = null;
  for (let i = 0; i < maps[type].length; i++) {
    start_range = maps[type][i].source
    end_range = start_range + maps[type][i].range
    if (source >= start_range && source < end_range) num = maps[type][i].destination + (source - start_range)
  }

  return num === null ? source : num
}

console.log(`Part One Answer: ${lowestLocation}`)