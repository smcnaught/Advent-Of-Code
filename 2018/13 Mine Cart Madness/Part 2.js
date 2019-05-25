let fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");
let tracks = input.replace(/\^|v/g, '|').replace(/<|>/g, '-').split('\n');
input = input.split('\n').map(l => l.split(''));
let intersectionState = {}; // left > straight > right
const carts = ['v', '^', '<', '>'];
let cartCount = 0;

for (let i = 0; i < input.length; ++i) {
  for (let j = 0; j < input[i].length; ++j) {
    let currentChar = input[i][j];
    if (!carts.includes(currentChar)) continue;
    ++cartCount;
  }
}

let haveNotCrashed = true;
while (true) {
  let done = [];
  let newStates = {};
  // loop through the input, then loop through each line of the input
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; ++j) {
      let currentChar = input[i][j];
      if (!carts.includes(currentChar) || done.includes(1000 * i + j)) continue;
      // characters is a cart
      let carX = j;
      let carY = i;

      if (currentChar == "v") carY++;
      else if (currentChar == "^") carY--;
      else if (currentChar == "<") carX--;
      else if (currentChar == ">") carX++;

      done.push(carY * 1000 + carX);
      input[i][j] = tracks[i][j];

      if (carts.includes(input[carY][carX])) {
        if (haveNotCrashed) {
          console.log(`Part One Answer: ${carX}, ${carY}`);
          haveNotCrashed = false;
        }

        input[carY][carX] = tracks[carY][carX];
        cartCount -= 2;
        continue;
      }

      input[carY][carX] = currentChar;
      newStates[1000 * carY + carX] = (intersectionState[1000 * i + j] || 0);
      let trackShape = tracks[carY][carX];

      if (trackShape == '-' || trackShape == '|') continue;
      if (trackShape == '/') {
        if (currentChar == 'v') currentChar = '<';
        else if (currentChar == '^') currentChar = '>';
        else if (currentChar == '<') currentChar = 'v';
        else if (currentChar == '>') currentChar = '^';
      }
      else if (trackShape == '\\') {
        if (currentChar == 'v') currentChar = '>';
        else if (currentChar == '^') currentChar = '<';
        else if (currentChar == '<') currentChar = '^';
        else if (currentChar == '>') currentChar = 'v';
      } else if (trackShape == '+') {
        let s = (intersectionState[1000 * i + j] || 0) % 3 + 3; // number of times to turn right
        for (let k = 0; k < s; ++k) {
          if (currentChar == 'v') currentChar = '<';
          else if (currentChar == '^') currentChar = '>';
          else if (currentChar == '<') currentChar = '^';
          else if (currentChar == '>') currentChar = 'v';
        }
        newStates[1000 * carY + carX] = (intersectionState[1000 * i + j] || 0) + 1;
      }

      input[carY][carX] = currentChar; // new direction
    }
  }
  intersectionState = newStates;
  if (cartCount == 1) {
    for (let i = 0; i < input.length; ++i) {
      for (let j = 0; j < input[i].length; ++j) {
        let currentChar = input[i][j];
        if (!carts.includes(currentChar)) continue;
        console.log(`Part Two Answer: ${j}, ${i}`);
        return;
      }
    }
  }
}