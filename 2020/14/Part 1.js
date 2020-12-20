const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getRaw().replace(/mem|\[|\]|\r/g, '').replace(/ = /g, ',').split('\n').map(e => e.split(','));
let mask = "";
let memory = [];

data.forEach(d => {
  if (d[0] === "mask") mask = d[1];
  else {
    const toAdd = +d[1];
    const binSum = decToBin(toAdd);
    const result = overwriteWithMask(binSum);
    memory[+d[0]] = binToDec(result);
  }
})

function decToBin(dec){
  let binary = (dec >>> 0).toString(2);
  return binary.padStart(36, "0");
}

function binToDec(bin) {
  return parseInt(bin, 2);
}

function overwriteWithMask(val) { // where val = the sum to overwrite
  let valArr = val.split('');
  let maskArr = mask.split('');
  for (let i = 0; i < maskArr.length; i++) {
    if (maskArr[i] === "1" || maskArr[i] === "0") valArr[i] = maskArr[i];
  }
  return valArr.join('');
}

console.log(`Part One Answer: ${memory.reduce((a, b) => a + b, 0)}`)