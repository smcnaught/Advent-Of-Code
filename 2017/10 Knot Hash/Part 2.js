const formatter = require('../../shared/formatting/format-puzzle-input');
const input = new formatter.Formatter(__dirname).getString();
const seq = [...input].map((char) => char.charCodeAt()).concat(...[17, 31, 73, 47, 23]);
const maxLen = 256;
const obj = {};
let curPos = skipSize = 0;
[...Array(maxLen).keys()].forEach(el => obj[el] = el);

function oneRound() {
  for (let s = 0; s < seq.length; s++) {
    const numOfElements = seq[s];
    if (numOfElements > 1) {
      const temp = [];
      let len = curPos + numOfElements;
      for (let i = curPos; i < len; i++) {
        if (!obj.hasOwnProperty(i)) {
          len = (len - i)
          i = 0;
        }
        temp.push(obj[i]);
      }

      const rev = temp.reverse();
      let len2 = curPos;
      for (let i = 0; i < rev.length; i++) {
        if (len2 > maxLen - 1) len2 = 0;
        obj[len2] = rev[i];
        len2++
      }
    }
    
    curPos = (curPos + numOfElements + skipSize) % maxLen;
    skipSize++
  }
}

let rounds = 64;
while (rounds > 0) {
  oneRound();
  rounds--;
}

let denseHash = [];
function getDenseHashNum(start, end) {
  let nums = [];
  for (let i = start; i < end; i++) nums.push(obj[i])
  return nums.reduce((a,b) => a ^ b);
}

let start = 0;
let end = 16;
for (let i = 0; i < 16; i++) {
  denseHash.push(getDenseHashNum(start, end))
  start += 16;
  end += 16;
}

let knotHash = denseHash.map(el => {
  const hex = el.toString(16);
  if (hex.length == 1) return "0" + hex;
  else return hex;
})

console.log(`Part Two Answer: ${knotHash.join("")}`);