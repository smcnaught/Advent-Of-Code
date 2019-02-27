let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let commands = input.replace(/\r/g, '').split('\n').map(e => {
  let newSingle = [];
  let single = e.split(' ');

  if (single[0] === 'turn') {
    newSingle.push(single[0] + single[1].charAt(0).toUpperCase() + single[1].slice(1))
    let num = single[2].split(',');
    let num2 = single[4].split(',');
    newSingle.push(+num[0], +num[1], +num2[0], +num2[1])
  }
  else if (single[0] === 'toggle') {
    newSingle.push(single[0]);
    let num = single[1].split(',');
    let num2 = single[3].split(',');
    newSingle.push(+num[0], +num[1], +num2[0], +num2[1])
  }

  return newSingle
})

let oneMilArr = [];

let generateGrid = () => {
  let status = false;
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      oneMilArr.push([x, y, status]);
    }
  }
}

let setStatus = (currentStatus, action) => {
  let on = true;

  if (action === "turnOn") on = true;
  else if (action === "turnOff") on = false;
  else if (action === "toggle") on = !currentStatus;

  return on;
}

let followInstructions = (action, xMin, xMax, yMin, yMax) => {
  oneMilArr.forEach((miniArr) => {
    let xAxis = miniArr[0], yAxis = miniArr[1], onOff = miniArr[2];

    if (xAxis >= xMin && xAxis <= xMax && yAxis >= yMin && yAxis <= yMax)
    {
      miniArr[2] = setStatus(onOff, action);
    }
  })

}

let runEachInstruction = () => {
  commands.forEach((command) => {
    let action = command[0];
    let xMin = command[1];
    let xMax = command[3];
    let yMin = command[2];
    let yMax = command[4];
  
    followInstructions(action, xMin, xMax, yMin, yMax);
  })

  // count how many are currently on
  let count = 0;
  oneMilArr.forEach((miniArr) => {
    count += miniArr[2];
  })
  
  console.log(`The total amount of lights that are lit is ${count}`);
}

generateGrid();
runEachInstruction();