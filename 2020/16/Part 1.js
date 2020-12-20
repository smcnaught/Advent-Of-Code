
const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let valid = []; // all valid numbers

let isValidInfo = true;
let isNearbyTicket = false;
let invalid = [];

for (let i = 0; i < data.length; i++) {
  let str = data[i];

  if (str === 'your ticket:') i += 2;
  else if (str === 'nearby tickets:') {
    isNearbyTicket = true;
    isValidInfo = false;
  }
  else if (isNearbyTicket && str !== "") {
    str.split(',').forEach(num => {
      if (!valid.includes(+num)) invalid.push(+num);
    })
  }
  else if (isValidInfo && str !== "") {
    let split = str.split(' or ');
    [begR1, endR1, begR2, endR2] = [
      +split[0].substring(split[0].indexOf(":") + 1, split[0].indexOf("-")),
      +split[0].substring(split[0].indexOf("-") + 1, split[0].length),
      +split[1].substring(0, split[1].indexOf("-")),
      +split[1].substring(split[1].indexOf("-") + 1, split[1].length)
    ];

    populateValid(begR1, endR1);
    populateValid(begR2, endR2);
  }
}

function populateValid(beg, end) {
  for (let i = beg; i <= end; i++) valid.push(i)
}

console.log(`Part One Answer: ${invalid.reduce((a, b) => a + b)}`);