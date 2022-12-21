const formatter = require('../../shared/formatting/format-puzzle-input');
let all = {};
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  const arr = line.replace(/: /g, ',').replace(/ /g, ',').split(',');
  if (arr.length === 2) {
    const sum = arr[0] === 'humn' ? 'humn' : +arr[1];
    all[arr[0]] = { sum: sum, val1: null, val2: null, sym: null };
  }
  else all[arr[0]] = { sum: null, val1: arr[1], val2: arr[3], sym: arr[2] }
});
let logged = false;
function p2() {
  let equation = "";
  let allDone = false;
  while (!allDone) {
    allDone = true;
    Object.entries(all).forEach(([monkeyName, monkeyInfo]) => {
      if (!monkeyInfo.sum) {
        allDone = false;
        if (isNaN(monkeyInfo.val1) && all[monkeyInfo.val1].sum) monkeyInfo.val1 = all[monkeyInfo.val1].sum;
        if (isNaN(monkeyInfo.val2) && all[monkeyInfo.val2].sum) monkeyInfo.val2 = all[monkeyInfo.val2].sum;
  
        if ((!isNaN(monkeyInfo.val1) && monkeyInfo.val2 === 'humn') ||
        (!isNaN(monkeyInfo.val2) && monkeyInfo.val1 === 'humn'))
        {
          [rootVal1IsNum, rootVal2IsNum] = [!isNaN(all['root'].val1), !isNaN(all['root'].val2)]
          if (rootVal1IsNum || rootVal2IsNum) {
            let sum;
            let searchFor;
            if (rootVal1IsNum) {
              sum = all['root'].val1;
              searchFor = all['root'].val2;
            }
            else {
              sum = all['root'].val2;
              searchFor = all['root'].val1;
            }
            
            equation += sum + ' = ' + searchFor;
            while (searchFor !== 'humn') {
              let symb = all[searchFor].sym;
              let word;
              [val1IsNum, val2IsNum] = [!isNaN(all[searchFor].val1), !isNaN(all[searchFor].val2)]
              if (val1IsNum) word = all[searchFor].val2;
              else word = all[searchFor].val1;

              let newSearchFor = `(${all[searchFor].val1} ${symb} ${all[searchFor].val2})`;              
              const re = new RegExp(searchFor);
              equation = equation.replace(re, newSearchFor);
              searchFor = word;
            }

            if (!logged) {
              logged = true;
              equation = equation.replace(/\s/g, '').replace(/humn/g, 'x');
              console.log(`Part Two Answer: ${equation}`);
            }
          }
        }
  
        if (!isNaN(monkeyInfo.val1) && !isNaN(monkeyInfo.val2)) {
          const value1 = +monkeyInfo.val1;
          const value2 = +monkeyInfo.val2;
          switch (monkeyInfo.sym) {
            case '+':
              monkeyInfo.sum = value1 + value2;
              break;
            case '-':
              monkeyInfo.sum = value1 - value2;
              break;
            case '*':
              monkeyInfo.sum = value1 * value2;
              break;
            case '/':
              monkeyInfo.sum = value1 / value2;
              break;
          }
        }
      } 
    })
  }
}

p2()
/**
 * To get answer, take the equation that prints and
 * paste it into https://www.mathpapa.com/simplify-calculator/ to get the simplified equation.
 * Then paste those two numbers into https://www.dcode.fr/big-numbers-division to get the right answer
*/