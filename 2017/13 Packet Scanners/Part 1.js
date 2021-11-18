const formatter = require('../../shared/formatting/format-puzzle-input');
let firewall = {};
let maxDepth = 0;
let packetLocation = null;
let severity = 0;
new formatter.Formatter(__dirname).get2DArrayOfStringsSpacesRemoved(":").map(subArr => {
  maxDepth = +subArr[0] > maxDepth ? +subArr[0] : maxDepth;
  firewall[subArr[0]] = {
    scanner: null, // the range the scanner is currently at (ex: 0)
    range: +subArr[1],
    direction: "plus" // or "minus"
  };
})

function moveScanners(layer, state) {
  if (state.scanner === null) return firewall[layer].scanner = 0;
  else 
  {
    switch (state.direction) {
      case 'plus':
        if (state.scanner + 1 <= (state.range - 1)) firewall[layer].scanner++;
        else {
          firewall[layer].scanner--;
          firewall[layer].direction = 'minus';
        }
        break;
      case 'minus':
        if (state.scanner - 1 >= 0) firewall[layer].scanner--;
        else {
          firewall[layer].scanner++;
          firewall[layer].direction = 'plus';
        }
        break;
    }
  }
}

function movePacket() {
  if (packetLocation === null) return packetLocation = 0;
  else packetLocation++;
}

function runPicoseconds(picoSeconds) {
  for (let i = 0; i <= picoSeconds; i++) {
    movePacket();
    
    Object.entries(firewall).forEach(([key, value]) => {
      moveScanners(key, value);
    })

    if (firewall[packetLocation]?.scanner === 0) {
      severity += (packetLocation * firewall[packetLocation].range);
    }
  }
}

runPicoseconds(maxDepth);
console.log(`Part One Answer: ${severity}`);