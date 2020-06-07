let fs = require('fs');
const intUtils = require('bigint-crypto-utils');
const deckSize = 119315717514047n;
const timesToShuffle = 101741582076661n;
const cardPosition = 2020n;

let shuffleInstructions = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .map(i => {
    return (
      i.includes("deal with") ? { type: "dealWithIncrementN", n: BigInt(i.split("deal with increment ")[1]) } :
      i.includes("deal into") ? { type: "dealIntoNewStack" } :
      i.includes("cut") ? { type: "cutNCards", n: BigInt(i.split("cut")[1]) } :
      null
    )
  })

function main() {
  let incMult = 1n;
  let offsetBy = 0n;

  for (let i = 0; i < shuffleInstructions.length; i++)
  {
    let instruction = shuffleInstructions[i].type;
    let n = shuffleInstructions[i].n;

    if (instruction === 'dealWithIncrementN')
    {
      incMult = (incMult * intUtils.modInv(n, deckSize)) % deckSize
    }
    else if (instruction === 'dealIntoNewStack')
    {
      incMult = -incMult % deckSize
      offsetBy = (offsetBy + incMult) % deckSize
    }
    else if (instruction === 'cutNCards')
    {
      offsetBy = (offsetBy + n * incMult) % deckSize
    }
  }

  const increment = intUtils.modPow(incMult, timesToShuffle, deckSize);
  let offset = (offsetBy * (1n - increment) * intUtils.modInv((1n - incMult) % deckSize, deckSize)) % deckSize;
  return Number((offset + increment * cardPosition) % deckSize);
}

console.log(`Part Two Answer: ${main()}`);