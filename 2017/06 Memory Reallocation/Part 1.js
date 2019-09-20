let fs = require('fs');
let memBanks = fs.readFileSync('./input.txt').toString('utf-8').replace(/\t/g, " ").split(' ').map(Number);
let states = [[...memBanks]];
let unique = Array.from(new Set(states.map(JSON.stringify)), JSON.parse).length;

function redistribute()
{
  // get the position of the bank with the most blocks
  let largest = Math.max.apply(Math, memBanks);
  let indexOfLargest = memBanks.indexOf(Math.max(...memBanks));
  
  // set that index to zero
  memBanks[indexOfLargest] = 0;
  
  // redistribute the blocks
  while(largest > 0)
  {
    // start at index after indexOfLargest, add one to each
    let start = indexOfLargest + 1;
    for (let i = start; i < memBanks.length; i++)
    {
      if (largest > 0)
      {
        memBanks[i]++;
        largest--;
      }
    }
  
    // start at the beginning and go until indexOfLargest
    for (let j = 0; j <= indexOfLargest; j++)
    {
      if (largest > 0)
      {
        memBanks[j]++;
        largest--;
      }
    }
  }
  states.push([...memBanks]);
  unique = Array.from(new Set(states.map(JSON.stringify)), JSON.parse).length;
}

/// While there are no duplicates in states
while (unique === states.length)
{
  redistribute();
}

console.log(`Part One Answer: ${states.length - 1}`);