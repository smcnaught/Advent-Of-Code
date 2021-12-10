const formatter = require('../../shared/formatting/format-puzzle-input');
let nav = new formatter.Formatter(__dirname).get2DArrayOfStrings('');

const charIsClose = (char) => char === ')' || char === ']' || char === '}' || char === '>';
const curIsNextsOpen = (cur, next) => (cur === '(' && next === ')') || (cur === '[' && next === ']') || (cur === '{' && next === '}') || (cur === '<' && next === '>');

function allOpening(lineArr) {
  for (let i = 0; i < lineArr.length; i++) {
    if (charIsClose(lineArr[i])) return false;
  }
  return true;
}

function getSyntaxErrScore() {
  const illegalCharCost = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  let syntaxErrScore = 0;
  nav.forEach(line => {
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
            syntaxErrScore+= illegalCharCost[next];
            lineStatusKnown = true;
            break;
          }
        }
  
        if (allOpening(line)) {
          lineStatusKnown = true;
          break;
        }
      }
    }
  })

  return syntaxErrScore;
}

console.log(`Part One Answer: ${getSyntaxErrScore()}`)