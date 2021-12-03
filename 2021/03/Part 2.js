const formatter = require('../../shared/formatting/format-puzzle-input');
const data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();

function getDigitToKeep(digitArr, isOxy) {
  const counts = {};
  for (let i = 0; i < digitArr.length; i++) {
    const arr = digitArr[i];
    for (const num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
  }

  if (isOxy) return counts["0"] > counts["1"] ? "0" : "1";
  else return counts["0"] <= counts["1"] ? "0" : "1";
}

function getRating(isOxy) {
  let cloney = JSON.parse(JSON.stringify(data));
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const digitArr = [];
      cloney.forEach(c => digitArr.push(c[j]));
      const keepDigit = getDigitToKeep(digitArr, isOxy);
      const cloney2 = JSON.parse(JSON.stringify(cloney));
      cloney = cloney.filter(arr => arr[j] === keepDigit);
      if (cloney.length === 0) cloney = JSON.parse(JSON.stringify(cloney2));
      if (cloney.length === 1) return parseInt(cloney[0], 2)
    }
  }
}

const oxygenGenRating = getRating(true);
const CO2ScrubberRating = getRating(false);
console.log(`Part Two Answer: ${oxygenGenRating * CO2ScrubberRating}`);