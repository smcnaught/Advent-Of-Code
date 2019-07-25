/**
 * Your puzzle input
 */
const enterCodeAtRow = 2981;
const enterCodeAtColumn = 3075;

let currentCode = 20151125;
let currentColumnNumber = 1;
let currentRowNumber = 1;
let currentMax = 1;
let answer = null;

while (!answer)
{
  if (currentColumnNumber === enterCodeAtColumn && currentRowNumber === enterCodeAtRow) answer = currentCode;
  
  if (currentColumnNumber === currentMax) currentColumnNumber = 1;
  else currentColumnNumber++;

  if (currentRowNumber === 1)
  {
    currentMax++;
    currentRowNumber = currentMax;
  }
  else currentRowNumber--;

  currentCode = (currentCode * 252533) % 33554393;
}

console.log(`Part One Answer: ${answer}`);