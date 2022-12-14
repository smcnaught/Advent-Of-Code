const formatter = require('../../shared/formatting/format-puzzle-input');
let allPackets = new formatter.Formatter(__dirname).getArrayOfStringsByLine().filter(n => n).map((line, index) => eval(line))

function setOrder() {
  allPackets = [...allPackets, ...[[[2]]], ...[[[6]]]];
  let allInOrder = false;
  while (!allInOrder) {
    let madeChanges = false;
    for (let i = 0; i < allPackets.length; i++) {
      const packet1 = allPackets[i];
      const packet2 = i < allPackets.length - 1 ? allPackets[i + 1] : null;

      if (packet1 && packet2) {
        const rightOrder = packetsInRightOrder(packet1, packet2);
        if (!rightOrder) {
          [allPackets[i], allPackets[i + 1]] = [allPackets[i + 1], allPackets[i]];
          madeChanges = true;
          break;
        }
      }

      if (i === allPackets.length - 1 && !madeChanges) allInOrder = true;
    }
  }
}

function packetsInRightOrder(left, right) {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) return true;
    if (left > right) return false;
  }

  if (Array.isArray(left) && !Array.isArray(right)) right = [right];
  else if (!Array.isArray(left) && Array.isArray(right)) left = [left];

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      let res = packetsInRightOrder(left[i], right[i]);
      if (res !== null) return res;
    }
    
    if (left.length < right.length) return true;
    else if (left.length > right.length) return false;
  }
  
  return null;
}

setOrder();
const ind1 = allPackets.findIndex(a => JSON.stringify(a) === '[[2]]') + 1;
const ind2 = allPackets.findIndex(a => JSON.stringify(a) === '[[6]]') + 1;
console.log(`Part Two Answer: ${ind1 * ind2}`);