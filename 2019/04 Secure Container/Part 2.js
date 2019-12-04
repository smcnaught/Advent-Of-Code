let start = 278384;
let end = 824795;
let passwords = 0;

function correctAdj(startArr) {
  let results = [];
  for (let i = 0; i < startArr.length - 1; i++) {
    if (startArr[i + 1] == startArr[i]) results.push(startArr[i]);
  }

  let onlyDuplicates = results.filter((el, ind, arr) => arr.filter(el2 => el2 === el).length === 1).length > 0;
  return onlyDuplicates;
}

for (let i = start; i <= end; i++) {
  start++;
  let hasAdj = false;
  let passwordIncreases = true;
  let strStart = start.toString();

  for (let j = 0; j < strStart.length; j++) {
    hasAdj = correctAdj(strStart.split('').map(Number));
    if (+strStart[j] > +strStart[j + 1]) passwordIncreases = false;
  }

  if (hasAdj && passwordIncreases) passwords++;
}

console.log(`Part Two Answer: ${passwords}`);