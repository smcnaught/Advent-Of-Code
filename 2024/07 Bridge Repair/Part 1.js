const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let equations = [/** { result: 190, numbers: [10, 19] } */]
data.forEach(d => {
  const arr = d.split(':')
  equations.push({ result: +arr[0], numbers: arr[1].trim().split(' ').map(Number) })
})

const combine = (a, b) => [`${a} + ${b}`, `${a} * ${b}`]
function getAllCombinations(nums) {
  if (nums.length === 1) return [nums[0].toString()];
  let results = [];
  for (let i = 0; i < nums.length - 1; i++) {
    let leftCombos = getAllCombinations(nums.slice(0, i + 1));
    let rightCombos = getAllCombinations(nums.slice(i + 1));
    for (let leftExp of leftCombos) {
      for (let rightExp of rightCombos) results.push(...combine(leftExp, rightExp));
    }
  }
  return [...new Set(results)];
}

let totalCalibrationResult = 0;
equations.forEach(equation => {
  const combinations = getAllCombinations(equation.numbers);
  for (let k = 0; k < combinations.length; k++) {
    const combo = combinations[k]
    let res = 0;
    let operator = '+';
    const comboArr = combo.split(' ');
  
    for (let i = 0; i < comboArr.length; i++) {
      if (!isNaN(comboArr[i])) {
        if (operator === '+') res += +comboArr[i];
        else res *= +comboArr[i];
      }
      else operator = comboArr[i];
    }
  
    if (res === equation.result) {
      totalCalibrationResult += equation.result;
      break;
    }
  }
})

console.log(`Part One Answer: ${totalCalibrationResult}`);