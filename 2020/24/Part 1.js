const formatter = require('../../shared/formatting/format-puzzle-input');
let tilesToFlip = new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(el => {
  let subArr = [];
  let dirArr = el.split('');

  for (let i = 0; i < dirArr.length; i++) {
    const previous = dirArr[i - 1];
    const current = dirArr[i];
    const next = dirArr[i + 1];

    // e, se, sw, w, nw, ne
    if (current === 's' || current === 'n') {
      subArr.push(current + next);
    }
    else if (current === 'e' && previous !== 's' && previous !== 'n') {
      subArr.push(current);
    }
    else if (current === 'w' && previous !== 's' && previous !== 'n') {
      subArr.push(current);
    }
  }

  return subArr;
});

let coords = [ /** { x: 0, y: 0, color: "white" } */]
for (let i = 0; i < tilesToFlip.length; i++) {
  let currentCoords = { x: 0, y: 0 };
  const instructionSet = tilesToFlip[i];

  for (let j = 0; j < instructionSet.length; j++) {
    let instruction = instructionSet[j];
    switch (instruction) {
      case 'e':
        currentCoords.x++;
        break;

      case 'se':
        currentCoords.y++;
        break;

      case 'sw':
        currentCoords.x--;
        currentCoords.y++;
        break;

      case 'w':
        currentCoords.x--;
        break;

      case 'nw':
        currentCoords.y--;
        break;

      case 'ne':
        currentCoords.x++;
        currentCoords.y--;
        break;

      default: console.error(`Error in switch statement`);
    }
  }

  let flippedATile = false;
  coords.forEach(tile => {
    if (tile.x === currentCoords.x && tile.y === currentCoords.y) {
      flippedATile = true;
      tile.color = tile.color === "white" ? "black" : "white";
    }
  })

  if (!flippedATile) {
    currentCoords.color = "black";
    coords.push(currentCoords)
  }
}

console.log(`Part One Answer: ${coords.filter(m => m.color === 'black').length}`);