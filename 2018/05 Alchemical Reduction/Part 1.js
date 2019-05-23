let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let input = text.replace(/\r/g, "").split("");
let reactionOccured = true;
let currentLength;
let react = (data) => {
  let reactor = false;

  for (let i = 0; i < data.length; i++) {
    let currentLetter = data[i];
    let nextLetter = data[i + 1];
    let previousLetter = data[i - 1];
    let currentUpper = currentLetter ? currentLetter.toUpperCase() : undefined;
    let nextUpper = nextLetter ? nextLetter.toUpperCase() : undefined;
    let previousUpper = previousLetter ? previousLetter.toUpperCase() : undefined;

    if (currentLetter == currentUpper) {
      if (nextLetter && nextLetter == nextLetter.toLowerCase() && nextUpper == currentUpper) {
        data.splice(i, 2);
        currentLength = data.length;
        reactor = true;
        break;
      }
      else if (previousLetter && previousLetter == previousLetter.toLowerCase() && previousUpper == currentUpper) {
        data.splice(i - 1, 2);
        currentLength = data.length;
        reactor = true;
        break;
      }
    }
    else if (currentLetter == currentLetter.toLowerCase()) {
      if (nextLetter && nextLetter == nextUpper && nextUpper == currentUpper) {
        data.splice(i, 2);
        currentLength = data.length;
        reactor = true;
        break;
      }

      else if (previousLetter && previousLetter == previousUpper && previousUpper == currentUpper) {
        data.splice(i - 1, 2);
        currentLength = data.length;
        reactor = true;
        break;
      }
    }
  }

  if (!reactor) reactionOccured = false;
}

while (reactionOccured) {
  react(input);
}

console.log(`Part One Answer: ${currentLength}`);