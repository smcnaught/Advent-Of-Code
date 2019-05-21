let fs = require('fs');
let raw = fs.readFileSync('./input.txt').toString('utf-8');
let input = raw.replace(/\r/g, '').split('\n').map(Number);
let currentFrequency = 0;
let frequenciesReached = [0];
let isDone;

let changeFrequency = (oneFreq) => {
  currentFrequency += oneFreq;
  let beenToFreq = frequenciesReached.includes(currentFrequency);
  if (!beenToFreq) frequenciesReached.push(currentFrequency);
  else console.log(`Part Two Answer: ${currentFrequency}`);
  return beenToFreq;
}

let keepCalling = () => {
  for (let i = 0; i < input.length; i++)
  {
      isDone = changeFrequency(input[i]);
      if (isDone) break;
  }

  if (!isDone) keepCalling();
  else return false;
}

keepCalling();