const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let antennaLocations = { /** a: [{ x: 4, y: 3 }, ] */ };
let antinodeLocations = [];
let mapBounds = { biggestX: data[0].length - 1, biggestY: data.length - 1 };

for (let y = 0; y < data.length; y++) {
  const row = data[y];
  for (let x = 0; x < row.length; x++) {
    const char = row[x];
    if (char !== '.') {
      if (!(char in antennaLocations)) antennaLocations[char] = [{x: x, y: y}];
      else antennaLocations[char].push({x: x, y: y})
    }
  }
}

function findAntinodes() {
  Object.entries(antennaLocations).forEach(([antennaName, allLocationsOfAntenna]) => {
    for (let i = 0; i < allLocationsOfAntenna.length; i++) {
      for (let j = 0; j < allLocationsOfAntenna.length; j++) {
        if (i != j) {
          const xDiff = (allLocationsOfAntenna[i].x - allLocationsOfAntenna[j].x)
          const yDiff = (allLocationsOfAntenna[i].y - allLocationsOfAntenna[j].y)
          
          let loc1X = allLocationsOfAntenna[i].x + xDiff;
          let loc1Y = allLocationsOfAntenna[i].y + yDiff;

          while ((loc1X <= mapBounds.biggestX && loc1X >= 0) && (loc1Y <= mapBounds.biggestY && loc1Y >= 0)) {
            if (antinodeLocations.findIndex(e => e.x === loc1X && e.y === loc1Y) === -1) antinodeLocations.push({ x: loc1X, y: loc1Y })
            loc1X = loc1X + xDiff;
            loc1Y = loc1Y + yDiff;
          }

          let loc2X = allLocationsOfAntenna[j].x + xDiff;
          let loc2Y = allLocationsOfAntenna[j].y + yDiff;

          while ((loc2X <= mapBounds.biggestX && loc2X >= 0) && (loc2Y <= mapBounds.biggestY && loc2Y >= 0)) {
            if (antinodeLocations.findIndex(e => e.x === loc2X && e.y === loc2Y) === -1) antinodeLocations.push({ x: loc2X, y: loc2Y })
            loc2X = loc2X + xDiff;
            loc2Y = loc2Y + yDiff;
          }
        }
      }
    }
  })
}

findAntinodes()
console.log(`Part Two Answer: ${antinodeLocations.length}`);