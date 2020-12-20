const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getRaw().replace(/mem|\[|\]|\r/g, '').replace(/ = /g, ',').split('\n').map(e => e.split(','));
let mask = "";
let memory = {};

data.forEach(d => {
  if (d[0] === "mask") mask = d[1];
  else {
    const address = decToBin(+d[0]);
    const withFloaties = overwriteWithMask(address);
    let possibles = getAllPossible(withFloaties, 0, []);
    possibles.forEach(p => {
      let dec = binToDec(p)
      memory[dec] = +d[1];
    });
  }
})

function decToBin(dec) {
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
    let bit = maskArr[i];
    if (bit === '1' || bit === 'X') valArr[i] = bit;
  }
  return valArr;
}

function getAllPossible(withFloaties, index, all) {
  if (index === withFloaties.length) return all.push(withFloaties.join(''));

  if (withFloaties[index] === 'X') {
    withFloaties[index] = "0";
    getAllPossible(withFloaties, index + 1, all);

    withFloaties[index] = '1';
    getAllPossible(withFloaties, index + 1, all);

    withFloaties[index] = "X";
  }
  else getAllPossible(withFloaties, index + 1, all);

  return all;
}

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
console.log(`Part Two Answer: ${sumValues(memory)}`)