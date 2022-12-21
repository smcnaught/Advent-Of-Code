const formatter = require('../../shared/formatting/format-puzzle-input');
[packet1, packet2] = [null, null];
let pairIndex = 0;
let rightOrderPairIndices = [];
new formatter.Formatter(__dirname).getArrayOfStringsByLine().filter(n => n).map(line => {
  line = eval(line);

  if (!packet1) packet1 = line;
  else if (!packet2) packet2 = line;

  if (packet1 && packet2) {
    pairIndex++;
    const rightOrder = packetsInRightOrder(packet1, packet2)
    if (rightOrder) rightOrderPairIndices.push(pairIndex);
    packet1 = packet2 = null;
  }
})

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

console.log(`Part One Answer: ${rightOrderPairIndices.reduce((a, b) => a + b)}`);