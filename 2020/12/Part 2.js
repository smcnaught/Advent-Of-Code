const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let ship = { north: 0, east: 0 };
let waypoint = { north: 1, east: 10 };

data.forEach(inst => {
  const action = inst[0];
  let units = +inst.substring(1, inst.length);

  switch (action) {
    case 'N': 
      waypoint.north += units;
      break;
    case 'S':
      waypoint.north -= units;
      break;
    case 'E':
      waypoint.east += units;
      break;
    case 'W':
      waypoint.east -= units;
      break;
    case 'L':
      while (units > 0) {
        const hold = waypoint.north;
        waypoint.north = waypoint.east;
        waypoint.east = -hold;
        units -= 90;
      }
      break;
    case 'R':
      while (units > 0) {
        const hold = waypoint.north;
        waypoint.north = -waypoint.east;
        waypoint.east = hold;
        units -= 90;
      }
      break;
    case 'F':
      ship.east += units * waypoint.east;
      ship.north += units * waypoint.north;
      break;
  }
})

let manhattan = Math.abs(ship.north) + Math.abs(ship.east);
console.log(`Part Two Answer: ${manhattan}`);