const formatter = require('../../shared/formatting/format-puzzle-input');
const seq = new formatter.Formatter(__dirname).getArrayOfNumbers(',');
const maxLen = 256;
const obj = {};
[...Array(maxLen).keys()].forEach(el => obj[el] = el);

let curPos = 0;
for (let skipSize = 0; skipSize < seq.length; skipSize++) {
  const numOfElements = seq[skipSize];
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
  
    let rev = temp.reverse();
    let len2 = curPos;
    for (let i = 0; i < rev.length; i++) {
      if (len2 > maxLen - 1) len2 = 0;
      obj[len2] = rev[i];
      len2++
    }
  }

  curPos = (curPos + numOfElements + skipSize) % maxLen;
}

console.log(`Part One Answer: ${obj[0] * obj[1]}`)