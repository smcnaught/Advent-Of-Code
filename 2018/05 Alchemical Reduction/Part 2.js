let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
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

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let answer = []; // { letterRemoved: "a", polymerLength: 0 }
let partTwo = () => {
  for (let i = 0; i < alphabet.length; i++)
  {
    let letter = alphabet[i];
    reactionOccured = true;
    let upper = letter.toUpperCase();
    let current = text.replace(new RegExp(letter, "g"), "").replace(new RegExp(upper, "g"), "");
    // convert the text to an array
    let newArr = current.replace(/\r/g, "").split("");

    // run array through react method until there are no more reactions. 
    while (reactionOccured) {
      react(newArr);
    }

    // push the letter removed and the current length of the polymer to answers array
    answer.push({ letterRemoved: letter, polymerLength: currentLength });
  }
}

partTwo();

let getShortest = () => {
  let shortest;

  answer.forEach(a => {
    if (!shortest || shortest > a.polymerLength) shortest = a.polymerLength;
  })

  return shortest;
}

let partTwoAnswer = getShortest();
console.log(`Part Two Answer: ${partTwoAnswer}`);