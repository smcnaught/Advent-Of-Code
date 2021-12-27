const formatter = require('../../shared/formatting/format-puzzle-input');
let hex = new formatter.Formatter(__dirname).getArrayOfStringsByChar();
let binary = "";
let versionNums = [];
hex.forEach(h => binary += hex2bin(h))

function hex2bin(hex) {
  switch (hex) {
    case "0": return "0000"
    case "1": return "0001"
    case "2": return "0010"
    case "3": return "0011"
    case "4": return "0100"
    case "5": return "0101"
    case "6": return "0110"
    case "7": return "0111"
    case "8": return "1000"
    case "9": return "1001"
    case "A": return "1010"
    case "B": return "1011"
    case "C": return "1100"
    case "D": return "1101"
    case "E": return "1110"
    case "F": return "1111"
  }
}

function binToDec(bin /*string*/) {
  return parseInt(bin, 2);
}

function getVal(binArr) {
  let groups = [];
  let ind;

  loopy: for (let i = 0; i < binArr.length; i+=5) {
    groups.push(binArr.slice(i, i+5))
    if (binArr[i] === "0") {
      ind = i+5;
      break loopy;
    }
  }
  
  let literalVal = "";
  groups.forEach(g => {
    g.shift();
    literalVal += g.join('')
  })

  const dec = binToDec(literalVal);
  return [ind, dec]
}

let temp;
function doThing(binary) {
  if (binary !== '') {
    const binArr = binary.split('');
    
    const version = binToDec(binArr[0] + binArr[1] + binArr[2]);
    temp = version;
    versionNums.push(version);
    const typeId = binArr[3] + binArr[4] + binArr[5];
    const isLiteralValue = typeId === "100";
  
    if (isLiteralValue) {
      binArr.splice(0, 6);
      const [ind, dec] = getVal(binArr);
      if (ind) doThing(binArr.slice(ind, binArr.length).join(''));  
    }
    else { // operator packet
      const lengthTypeId = binArr[6];
  
      if (lengthTypeId === "0") {
        const totalLength = binToDec(binArr.slice(7, 22).join(''));
        const getUntil = 22+totalLength;
  
        const sub = binArr.slice(22, getUntil).join('');
        const sub2 = binArr.slice(getUntil, binArr.length).join('');
        
        doThing(sub);
        if (sub2.length > 0 && +sub2 !== 0) doThing(sub2);
      }
  
      else if (lengthTypeId === "1") {
        const sub = binArr.slice(18, binArr.length).join('');
        doThing(sub);
      }
    }
  }
}

doThing(binary);
console.log(`Part One Answer: ${versionNums.reduce((a, b) => a + b)}`);