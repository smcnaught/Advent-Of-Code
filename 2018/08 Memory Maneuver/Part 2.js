let fs = require("fs");
const input = fs.readFileSync('./input.txt').toString().split(' ').map(Number).slice();

function valOfRootNode() {
  let rootNode = 0;
  let childNodes = input.shift();
  let metaData = input.shift();
  let rootVals = [];
  let mVals = [];

  if (childNodes) {
    for (let i = 0; i < childNodes; i++) rootVals.push(valOfRootNode());
    for (let i = 0; i < metaData; i++) mVals.push(input.shift());
    for (let n of mVals) {
      n--;
      if ((n) >= 0 && (n) < rootVals.length) rootNode += rootVals[n];
    }

    return rootNode;
  }
  else {
    while (metaData > 0) {
      rootNode += input.shift();
      metaData--;
    }
    return rootNode;
  }
}

console.log(`Part Two Answer: ${valOfRootNode()}`);