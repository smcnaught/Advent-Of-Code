// The answer to part 2 is: 35b028fe2c958793f7d5a61d07a008c8

const formatter = require('../../shared/formatting/format-puzzle-input');
const seq = new formatter.Formatter(__dirname, true).getArrayOfASCIINumbers(',', true);
seq.push(17, 31, 73, 47, 23)

// const maxLen = 5; // TODO change to 256
const maxLen = 256;
const last = maxLen - 1;
const obj = {};
let curPos = 0;
let skipSize = 0;
[...Array(maxLen).keys()].forEach(el => obj[el] = el);


function oneRound() {
  for (let s = skipSize; s < seq.length; s++) {
    // get seq[i] number of elements from the list (obj) (starting with current position)
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

      // reverse those elements
      let rev = temp.reverse();

      // loop through rev 
      // change each item in obj to match what's in reverse
      let len2 = curPos;
      for (let i = 0; i < rev.length; i++) {
        if (len2 > last) {
          len2 = 0;
        }
        obj[len2] = rev[i];
        len2++
      }
    }

    const increaseCurPosBy = numOfElements + s;
    for (let i = 0; i < increaseCurPosBy; i++) {
      curPos++;
      if (curPos > last) curPos = 0;
    }

    // console.log(obj);
    // console.log(+Object.keys(obj).find(key => obj[key] === curPos));
    // console.log("-------------------------")
    skipSize++
  }
}

let rounds = 64;
while (rounds > 0) {
  oneRound();
  rounds--;
}


// console.log(curPos, skipSize)
// console.log(obj); // sparse hash

let denseHash = [];

function getDenseHashNum(start, end) {
  let nums = [];
  for (let i = start; i < end; i++) {
    nums.push(obj[i])
  }

  return nums.reduce((a,b) => a ^ b);
}

let start = 0;
let end = 16;
for (let i = 0; i < 16; i++) {
  denseHash.push(getDenseHashNum(start, end))
  start += 16;
  end += 16;
}

// console.log(denseHash)
let knotHash = denseHash.map(el => {
  const hex = el.toString(16);
  
  if (hex.length == 1) return "0" + hex;
  else return hex;
})

console.log(knotHash.join(""));


// console.log(`Part Two Answer: ${ans}`)