let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let input = text.replace(/\r/g, "").split("\n");
let logs = [];
input.forEach(log => {
  newLog = log.replace("]", ",").replace(/#|Guard|begins|shift|\[/g, "").replace("falls asleep", "fallsAsleep").replace("wakes up", "wakesUp");
  logs.push(newLog.split(","));
})

// gets Date as string and returns date object.
let getDate = (s) => {
  let bits = s.split(/\D/);
  return new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
}

// Sort input in chronological order
logs.sort((a, b) => new Date(getDate(a[0])) - new Date(getDate(b[0])));

let guards = []; // [ { guard: 10, napTime: 30, minutesAsleep: [1, 2, 3, 45, 32 ] } ]

// add guards to array
logs.forEach((log) => {
  if (+log[1]) {
    // loop through guards and check if that guard is already in array
    let guardExists = guards.filter((guard) => guard.guard === +log[1]).length;
    // if not, add to guards
    if (!guardExists) guards.push({ guard: parseInt(log[1]), napTime: 0 });
  }
})

let currentGuard;
// get the guard with the most minutes spent asleep
for (let i = 0; i < logs.length; i++) {
  let command = logs[i][1].trim();

  // if command is a guard ID number, assign the currentGuard
  if (+command) currentGuard = logs[i][1];
  else if (command == "fallsAsleep") {
    // set the napTime of the current cycle (when the person, fell asleep and woke up, minutes between)
    let wokeUpTime = new Date(logs[i + 1][0]);
    let fellAsleepTime = new Date(logs[i][0]);
    let napTimeInMinutes = (wokeUpTime - fellAsleepTime) / 1000 / 60;
    addMinutesToGuard(currentGuard, napTimeInMinutes);
  }
}

function addMinutesToGuard(id, minutesToAdd) {
  guards.forEach(guard => {
    if (guard.guard == id) guard.napTime += minutesToAdd;
  })
}

/// Add minutes to guards minutes array. GETS STRING AS ID
function getSpecificMinutes(id) {
  let minutesAsleep = [];
  let current;
  for (let i = 0; i < logs.length; i++) {
    let commandOrId = logs[i][1].trim();

    // if commandOrId is a guard ID number, assign the current guard
    if (+commandOrId) current = logs[i][1].trim();
    if (current == id) {
      if (commandOrId == "fallsAsleep") {
        let fellAsleepTime = new Date(logs[i][0]);
        let wokeUpTime = new Date(logs[i + 1][0]);
        let start = fellAsleepTime.getMinutes();
        let stop = wokeUpTime.getMinutes();
        for (let i = start; i < stop; i++) minutesAsleep.push(i);
        // push each minute they are asleep into array
        // guards count as asleep on the minute they fall asleep
        // guards count as awake on the minute they wake up
      }
    }
  }

  return minutesAsleep;
}

function mode(array) {
  if (array.length == 0) return null;
  let modeMap = {};
  let maxEl = array[0], maxCount = 1;

  for (let i = 0; i < array.length; i++) {
    let el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }

  return maxEl;
}

let minutesAsleep = getSpecificMinutes("1823");
let guardWithMostMinutes = guards.sort((a, b) => b.napTime - a.napTime)[0];
let minuteMostAsleep = mode(minutesAsleep);
let partOneAnswer = parseInt(guardWithMostMinutes.guard) * +minuteMostAsleep;

console.log(`Part One Answer: ${partOneAnswer}`);