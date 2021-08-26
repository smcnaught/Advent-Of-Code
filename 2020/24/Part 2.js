const formatter = require('../../shared/formatting/format-puzzle-input');
let tilesToFlip = new formatter.Formatter(__dirname, true).getArrayOfStringsByLine().map(el => {
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

function getInitialSet() {
  let coords = [ /* { x: 0, y: 0, color: "white" } */];
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

        default: console.error(`The switch statement broke!!!`)
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
      currentCoords.needsFlip = false;
      coords.push(currentCoords)
    }
  }

  return coords;
}

function processDays(coords) {
  let days = 0;
  while (days <= 100) {
    days++;

    for (let i = 0; i < coords.length; i++) {
      let tile = coords[i];

      const n1 = coords.find(t => t.x === tile.x + 1 && t.y === tile.y);
      const n2 = coords.find(t => t.x === tile.x && t.y === tile.y + 1);
      const n3 = coords.find(t => t.x === tile.x - 1 && t.y === tile.y + 1);
      const n4 = coords.find(t => t.x === tile.x - 1 && t.y === tile.y);
      const n5 = coords.find(t => t.x === tile.x && t.y === tile.y - 1);
      const n6 = coords.find(t => t.x === tile.x + 1 && t.y === tile.y - 1);

      if (coords.length < 40000) {
        if (!n1) coords.push({ x: tile.x + 1, y: tile.y, color: "white", needsFlip: false })
        if (!n2) coords.push({ x: tile.x, y: tile.y + 1, color: "white", needsFlip: false })
        if (!n3) coords.push({ x: tile.x - 1, y: tile.y + 1, color: "white", needsFlip: false })
        if (!n4) coords.push({ x: tile.x - 1, y: tile.y, color: "white", needsFlip: false })
        if (!n5) coords.push({ x: tile.x, y: tile.y - 1, color: "white", needsFlip: false })
        if (!n6) coords.push({ x: tile.x + 1, y: tile.y - 1, color: "white", needsFlip: false })
      }

      const neighborColors = [
        n1?.color ?? "white",     // e
        n2?.color ?? "white",     // se
        n3?.color ?? "white",     // sw
        n4?.color ?? "white",     // w
        n5?.color ?? "white",     // nw
        n6?.color ?? "white",     // ne
      ]; // colors of all the current tiles neighbors

      const blackNeighbors = neighborColors.filter(el => el === "black").length;

      if (tile.color === "black" && (blackNeighbors === 0 || blackNeighbors > 2)) coords[i].needsFlip = true;
      else if (tile.color === "white" && blackNeighbors === 2) coords[i].needsFlip = true;
    }

    for (let i = 0; i < coords.length; i++) {
      if (coords[i].needsFlip) {
        coords[i].color = coords[i].color === "black" ? "white" : "black";
        coords[i].needsFlip = false;
      }
    }

    if (days === 100) console.log(`Part Two Answer: ${coords.filter(m => m.color === 'black').length}`);
  }
}

const initialSet = getInitialSet();
processDays(initialSet)