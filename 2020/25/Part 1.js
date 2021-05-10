const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbersByLine();
const cardPublicKey = data[0];
const doorPublicKey = data[1];

const transformSubjectNumber = (val, subNum = 7) => (val * subNum) % 20201227;
function getLoopSize(publicKey) {
  let foundLoop = false;
  let loopSize = 1;
  let val = 1;

  while (!foundLoop) {
    val = transformSubjectNumber(val);
    if (publicKey === val) foundLoop = true;
    else loopSize++;
  }

  return loopSize;
}

function runLoop(publicKey, loopSize, val = 1) {
  for (let i = 0; i < loopSize; i++) {
    val = transformSubjectNumber(val, publicKey);
  }
  
  return val;
}

function getEncryptionKey()
{
  const encKey1 = runLoop(doorPublicKey, cardLoopSize);
  const encKey2 = runLoop(cardPublicKey, doorLoopSize);

  if (encKey1 === encKey2) return encKey1;
  else return `ERROR: The encryption keys did not match.`;
}

const doorLoopSize = getLoopSize(doorPublicKey);
const cardLoopSize = getLoopSize(cardPublicKey);
const encryptionKey = getEncryptionKey();
console.log(`Part One Answer: ${encryptionKey}`);