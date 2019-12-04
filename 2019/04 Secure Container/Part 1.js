let start = 278384;
let end = 824795;
let passwords = 0;

for (let i = start; i <= end; i++) {
  start++;
  
  let hasAdj = false;
  let passwordIncreases = true;
  let strStart = start.toString();

  for (let j = 0; j < strStart.length; j++) {
    if (strStart[j] === strStart[j + 1]) hasAdj = true;
    if (+strStart[j] > +strStart[j + 1]) passwordIncreases = false;
  }

  if (hasAdj && passwordIncreases) passwords++;
}
console.log(`Part One Answer: ${passwords}`);