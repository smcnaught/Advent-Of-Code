const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let valid = []; // all valid numbers
let validInfo = [];
let nearbyValidTickets = []; // sub array for each valid nearby ticket
let myTicket;
let parseStep = { isValidInfo: true, isYourTicket: false, isNearbyTicket: false };

let notGoingToWork = {};
let order = {};

for (let i = 0; i < data.length; i++) {
  let str = data[i];

  if (str === 'your ticket:') {
    parseStep.isYourTicket = true;
    parseStep.isValidInfo = false;
  }
  else if (str === 'nearby tickets:') {
    parseStep.isNearbyTicket = true;
    parseStep.isValidInfo = false;
  }
  else if (parseStep.isYourTicket) {
    myTicket = str.split(',').map(Number);
    parseStep.isYourTicket = false;
  }
  else if (parseStep.isNearbyTicket && str !== "") {
    let isValid = true;
    let ticketArr = str.split(',').map(Number);
    ticketArr.forEach(num => {
      if (!valid.includes(num)) isValid = false;
    })

    if (isValid) nearbyValidTickets.push(ticketArr);
  }
  else if (parseStep.isValidInfo && str !== "") {
    let split = str.split(' or ');
    [field, begR1, endR1, begR2, endR2] = [
      split[0].substring(0, split[0].indexOf(':')),
      +split[0].substring(split[0].indexOf(":") + 1, split[0].indexOf("-")),
      +split[0].substring(split[0].indexOf("-") + 1, split[0].length),
      +split[1].substring(0, split[1].indexOf("-")),
      +split[1].substring(split[1].indexOf("-") + 1, split[1].length)
    ];

    populateValid(begR1, endR1);
    populateValid(begR2, endR2);

    validInfo.push({ field: field, min1: begR1, max1: endR1, min2: begR2, max2: endR2 });
    notGoingToWork[field] = [];
    order[field] = null;
  }
}

for (let i = 0; i < nearbyValidTickets.length; i++) {
  const validTicketNums = nearbyValidTickets[i];

  for (let j = 0; j < validTicketNums.length; j++) {
    const oneNumInTicket = validTicketNums[j];

    validInfo.forEach(info => {
      const isInRange1 = isInRange(oneNumInTicket, info.min1, info.max1);
      const isInRange2 = isInRange(oneNumInTicket, info.min2, info.max2);

      if (!isInRange1 && !isInRange2) {
        // that ticket cannot be assigned to the current field (info.field)
        if (notGoingToWork.hasOwnProperty(info.field)) {
          if (!notGoingToWork[info.field].includes(j)) notGoingToWork[info.field].push(j);
        }
      }
    })
  }
}

let gettingOrder = true;
let orderLength = getSizeObj(order);

while (gettingOrder) {
  let notAllNull = false;

  Object.keys(notGoingToWork).forEach(f => {
    let arr = notGoingToWork[f];
    if (arr) notAllNull = true;

    if (arr && arr.length === orderLength - 1) {
      let missing = null;
      for (let i = 0; i < orderLength; i++) {
        if (!arr.includes(i)) missing = i;
      }
      order[f] = missing;
      notGoingToWork[f] = null;
      Object.keys(notGoingToWork).forEach(f => {
        if (notGoingToWork[f]) notGoingToWork[f].push(missing);
      })
    }
  })

  if (!notAllNull) gettingOrder = false;
}

function getSizeObj(obj) {
  return Object.keys(obj).length;
}

function isInRange(num, min, max) {
  return num >= min && num <= max;
}

function populateValid(beg, end) {
  for (let i = beg; i <= end; i++) valid.push(i)
}

let result = 1;

Object.keys(order).forEach(f => {
  if (f.includes('departure')) result *= myTicket[order[f]];
})

console.log(`Part Two Answer: ${result}`);