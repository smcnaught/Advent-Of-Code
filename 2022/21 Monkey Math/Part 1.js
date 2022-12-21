const formatter = require('../../shared/formatting/format-puzzle-input');
let all = {};
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  const arr = line.replace(/: /g, ',').replace(/ /g, ',').split(',');
  if (arr.length === 2) all[arr[0]] = { sum: +arr[1], val1: null, val2: null, sym: null };
  else all[arr[0]] = { sum: null, val1: arr[1], val2: arr[3], sym: arr[2] }
});

let allDone = false;
while (!allDone) {
  allDone = true;
  Object.entries(all).forEach(([monkeyName, monkeyInfo]) => {
    if (!monkeyInfo.sum) {
      allDone = false;
      if (isNaN(monkeyInfo.val1) && all[monkeyInfo.val1].sum) monkeyInfo.val1 = all[monkeyInfo.val1].sum;
      if (isNaN(monkeyInfo.val2) && all[monkeyInfo.val2].sum) monkeyInfo.val2 = all[monkeyInfo.val2].sum;

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

        if (monkeyName === 'root') console.log(`Part One Answer: ${monkeyInfo.sum}`);
      }
    } 
  })
}