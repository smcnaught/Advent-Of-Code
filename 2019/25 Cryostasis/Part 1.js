const fs = require('fs');
let all = fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').replace(/\n/g, '').split(',').map(Number);
let relativeBase = ip = 0;

function getValWithMode(mode, index, type) {
  const positionMode = 0;
  const immediateMode = 1;
  const relativeMode = 2;
  if (type === 'value') {
    if (mode === positionMode) return +all[all[index]];
    else if (mode === immediateMode) return +all[index];
    else if (mode === relativeMode) return +all[all[index] + relativeBase];
  }
  else if (type === 'position') {
    if (mode === positionMode) return all[index];
    else if (mode === relativeMode) return all[index] + relativeBase;
  }
}

function runIntCodeComp(input) {
  let readableOutput = "";
  let opCode = null;

  while (opCode !== 99) {
    const str = all[ip].toString().padStart(5, '0');
    opCode = +str.slice(3);

    const mode1 = +str[2];
    const mode2 = +str[1];
    const mode3 = +str[0];

    let first = getValWithMode(mode1, ip + 1, 'value');
    const second = getValWithMode(mode2, ip + 2, 'value');
    const store = getValWithMode(mode3, ip + 3, 'position');

    if (opCode === 1) {
      all[store] = first + second;
      ip += 4;
    }
    else if (opCode === 2) {
      all[store] = first * second;
      ip += 4;
    }
    else if (opCode === 3) {
      first = getValWithMode(mode1, ip + 1, 'position');
      all[first] = input.shift();
      ip += 2;
    }
    else if (opCode === 4) {
      readableOutput += String.fromCharCode(first);
      ip += 2;
    }
    else if (opCode === 5) {
      if (first !== 0) ip = second;
      else ip += 3;
    }
    else if (opCode === 6) {
      if (first === 0) ip = second;
      else ip += 3;
    }
    else if (opCode === 7) {
      all[store] = first < second ? 1 : 0;
      ip += 4;
    }
    else if (opCode === 8) {
      all[store] = first === second ? 1 : 0;
      ip += 4;
    }
    else if (opCode === 9) {
      relativeBase += first;
      ip += 2;
    }
  }

  return readableOutput;
}

function getSubSets() {
  let subSets = [];
  const data = ['take cake', 'take prime number', 'take mutex', 'take dehydrated water', 'take coin', 'take manifold', 'take candy cane', 'take fuel cell'];
  const minimumSubsetLengthDesired = 1;

  const combine = (a, min) => {
    const fn = function (n, src, got, all) {
      if (n == 0) {
        if (got.length > 0) all[all.length] = got;
        return;
      }
      for (let j = 0; j < src.length; j++) {
        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
      }
      return;
    }
    let all = [];
    for (let i = min; i < a.length; i++) {
      fn(i, a, [], all);
    }
    all.push(a);
    return all;
  }

  let combos = combine(data, minimumSubsetLengthDesired);
  combos.forEach(c => {
    subSets.push(
      'drop cake',
      'drop prime number',
      'drop mutex',
      'drop dehydrated water',
      'drop coin',
      'drop manifold',
      'drop candy cane',
      'drop fuel cell',
      ...c,
      'inv',
      'west',
    )
  })

  return subSets;
}

let goToEveryRoomPickThingsUp = [
  // start at hull breach
  'north', // to navigation
  'take candy cane', // pick up candy cane from navigation
  'east', // to engineering
  'west', // back to navigation
  'south', // back to hull breach
  'south', // to sick bay
  'take fuel cell', // pick up fuel cell from sick bay
  'south', // to storage
  'take manifold', // pick up manifold from storage
  'north', // back to sick bay
  'north', // back to hull breach
  'west', // to hot chocolate fountain
  'take mutex', // pick up mutex
  'north', // to arcade
  'west', // to observatory
  'east', // back to arcade
  'south', // back to hot chocolate fountain
  'south', // to crew quarters
  'south', // to corridor
  'take coin', // pick up coin from corridor
  'west', // to hallway
  'take dehydrated water', // take dehydrated water from hallway
  'south', // to passages
  'take prime number', // take prime number from passages
  'north', // back to hallway
  'east', // back to corridor
  'east', // to Gift Wrapping Center
  // 'take infinite loop', // take infinite loop from Gift Wrapping Center (obviously dumb do not do!!!)
  'west', // back to corridor
  'north', // back to crew quarters
  'east', // to science lab
  'take cake', // pick up cake
  'east', // to Holodeck
  // 'take giant electromagnet', // pick up giant electromagnet ***This gets stuck to you and you can't move!!!***
  'north', // to Kitchen
  // 'take escape pod', // pick up escape pod ***DO NOT TAKE WILL LAUNCH INTO SPACE***
  'south', // back to Holodeck
  'west', // back to science lab
  'north', // to stables
  // 'take photons', // pick up photons from stables **DO NOT TAKE**
  'west', // to Warp Drive Maintenance
  // 'take molten lava', // pick up molten lava from warp drive maintenance ** DO NOT TAKE **
  'south' // to Security Checkpoint
  // 'inv', // all: cake, prime number, mutex, dehydrated water, coin, manifold, candy cane, fuel cell
]

let itemCombos = getSubSets();
let fullTextInstructions = [...goToEveryRoomPickThingsUp, ...itemCombos];
let asciiInput = [];
fullTextInstructions.forEach(item => {
  item.split('').forEach(char => asciiInput.push(char.charCodeAt(0)));
  asciiInput.push(10);
})

console.log(runIntCodeComp(asciiInput));
