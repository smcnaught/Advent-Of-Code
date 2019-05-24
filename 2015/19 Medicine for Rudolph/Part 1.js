let fs = require('fs');
let replacements = fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').split('\n').map(replace);
let newMolecules = [];

function replace(str) {
  let reg = /[^\s]+/;
  let reg2 = /[^\s]*$/;
  return [str.match(reg).toString(), str.match(reg2).toString()];
}

let molecule = `CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF`;

for (let i = 0; i < molecule.length; i++) {
  replacements.forEach(r => {
    if (r[0] === molecule[i]) {
      if (i === 0) newMolecules.push(r[1] + molecule.substr(i + 1));
      else if (i === molecule.length - 1) newMolecules.push(molecule.substr(0, i) + r[1]);
      else newMolecules.push(molecule.substr(0, i) + r[1] + molecule.substr(i + 1))
    }
    else if (r[0] === molecule[i] + molecule[i + 1]) {
      if (i === 0) newMolecules.push(r[1] + molecule.substr(i + 2));
      else newMolecules.push(molecule.substr(0, i) + r[1] + molecule.substr(i + 2))
    }
    else if (i === molecule.length - 1 && r[0] === molecule[i - 1] + molecule[i]) newMolecules.push(molecule.substr(0, i - 1) + r[1]);
  })
}

let uniq = [...new Set(newMolecules)];
console.log(`Part One Answer: ${uniq.length}`);