const formatter = require('../../shared/formatting/format-puzzle-input');
let nav = new formatter.Formatter(__dirname).get2DArrayOfStrings('');
const illegalCharCost = { ')': 1, ']': 2, '}': 3, '>': 4 };
const pairs = { '(': ')', '[': ']', '{': '}', '<': '>' };

const charIsClose = (char) => char === ')' || char === ']' || char === '}' || char === '>';
const curIsNextsOpen = (cur, next) => (cur === '(' && next === ')') || (cur === '[' && next === ']') || (cur === '{' && next === '}') || (cur === '<' && next === '>');

function allOpening(lineArr) {
  for (let i = 0; i < lineArr.length; i++) {
    if (charIsClose(lineArr[i])) return false;
  }
  return true;
}

function addNeededClosingsScore(lineArr) {
  let lineScore = 0;
  lineArr.reverse().forEach(char => {
    lineScore *= 5;
    lineScore+= illegalCharCost[pairs[char]]
  });

  return lineScore;
}

function getSyntaxErrorScore() {
  let syntaxErrScore = [];
  nav.forEach((line, index) => {
    let lineStatusKnown = false;
    while (!lineStatusKnown) {
      // loop through line
      for (let i = 0; i < line.length; i++) {
        const [cur, next] = [line[i], line[i + 1]];
  
        // if next character is close 
        if (next && charIsClose(next)) {
          if (curIsNextsOpen(cur, next)) {
            // and current character is next character's open, then remove both.
            line.splice(i, 2);
            break;
          }
          else {
            // current character is NOT next character's open, add unexpected character val to syntaxErrScore 
            lineStatusKnown = true;
            break;
          }
        }
  
        if (allOpening(line)) {
          const lineScore = addNeededClosingsScore(line);
          syntaxErrScore.push(lineScore);
          lineStatusKnown = true;
          break;
        }
      }
    }
  })

  syntaxErrScore.sort((a, b) => a - b);
  return syntaxErrScore[Math.floor(syntaxErrScore.length / 2)];
}

console.log(`Part Two Answer: ${getSyntaxErrorScore()}`);
