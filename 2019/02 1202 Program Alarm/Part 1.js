let fs = require('fs');
let source = fs.readFileSync('./input.txt').toString('utf-8');
let arrayOfNumbers = source.replace(/\r/g, '').split(',').map(Number);

for (let i = 0; i < arrayOfNumbers.length; i++)
{
  if (i % 4 === 0)
  {
    let first = arrayOfNumbers[arrayOfNumbers[i + 1]];
    let second = arrayOfNumbers[arrayOfNumbers[i + 2]];
    let store = arrayOfNumbers[i + 3];

    if (arrayOfNumbers[i] === 1)
    {
      arrayOfNumbers[store] = first + second;
    }
    else if (arrayOfNumbers[i] === 2)
    {
      arrayOfNumbers[store] = first * second;
    }
    else if (arrayOfNumbers[i] === 99)
    {
      console.log(`Part One Answer: ${arrayOfNumbers[0]}`)
    }
  }
}