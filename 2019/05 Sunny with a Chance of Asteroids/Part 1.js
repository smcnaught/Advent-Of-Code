let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8'); 
let arr = source.replace(/\r/g, '').split(',').map(Number);

let one = () => arr[store] = first + second;
let two = () => arr[store] = first * second;
let three = (i) => arr[i + 1] = 1;
let four = (i) => {
  if (mode1 === 0) {
    if (arr[arr[i + 1]] !== 0) console.log(`Part One Answer: ${arr[arr[i + 1]]}`);
  }
}

let mode1, mode2, first, second, store;
function setVals(i)
{
  let opCode;
  let sub = arr.slice(i, i + 4);
  if (sub[0])
  {
    let strOp = sub[0].toString();
    while (strOp.length < 5) {
      strOp = "0" + strOp;
    }
    opCode = +strOp.slice(-2);
    mode1 = +strOp.slice(2, 3);
    mode2 = +strOp.slice(1, 2);
    first = mode1 === 0 ? arr[arr[i + 1]] : arr[i + 1];
    second = mode2 === 0 ? arr[arr[i + 2]] : arr[i + 2];
    store = arr[i + 3];
  }

  return opCode;
}

let skip = 0;
for (let i = 0; i < arr.length; i++) {
  if (skip > 0) {
    skip--;
    continue;
  }
  switch (arr[i]) {
    case 1:
      skip += 3;
      setVals(i);
      one();
      break;
    case 2:
      skip += 3;
      setVals(i);
      two();
      break;
    case 3:
      three(i);
      skip++;
      break;
    case 4:
      skip++;
      four(i);
      break;  
    default:
      skip+=3;
      let opCode = setVals(i);
      if (opCode === 1) one(); 
      else if (opCode === 2) two();
      break;
  }
}