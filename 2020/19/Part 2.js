const formatter = require('../../shared/formatting/format-puzzle-input');
let [rules, messages] = new formatter.Formatter(__dirname).getArrayOfStringsSplitByBlankLine();

function getRuleZero() {
  const unorganized = rules.replace(/\r/g, '').split('\n').map(e => e.split(' '));
  let rulesArr = [];

  unorganized.forEach(arr => {
    let first = arr.shift();
    let index = +first.slice(0, -1);
    rulesArr[index] = arr;
  })

  rulesArr[0].unshift('(');
  rulesArr[0].push(')');

  let haveZero = false;
  while (!haveZero) {
    for (let j = 0; j < rulesArr[0].length; j++) {
      // if char is a number, replace that number with the joined array at that index.
      const current = rulesArr[0][j];
      if (!isNaN(current)) {
        let toReplace = rulesArr[+current];

        if (+current === 8) {
          toReplace = ['(', '42', '+', ')'];
        }
        else if (+current === 11) {
          toReplace = ['(', '42', '31', '|', '42', '42', '31', '31', '|', '42', '42', '42', '31', '31', '31', '|', '42', '42', '42', '42', '31', '31', '31', '31', '|', '42', '42', '42', '42', '42', '31', '31', '31', '31', '31', '|', '42', '42', '42', '42', '42', '42', '42', '31', '31', '31', '31', '31', '31', '31', ')'];
        }
        else if (toReplace[0] === '"a"') toReplace = ["a"];
        else if (toReplace[0] === '"b"') toReplace = ["b"];
        else toReplace = ['(', ...toReplace, ')'];
        rulesArr[0].splice(j, 1, ...toReplace);
      }
    }

    haveZero = rulesArr[0].every(i => isNaN(i));
  }

  return rulesArr[0].join('');
}

function getMatches(rule0, messages) {
  let matches = 0;
  const regex = new RegExp('^' + rule0 + '$');
  messages.forEach(message => {
    if (regex.test(message)) matches++;
  })

  return matches;
}

const rule0 = getRuleZero();
console.log(`Part Two Answer: ${getMatches(rule0, messages.split('\r\n'))}`);