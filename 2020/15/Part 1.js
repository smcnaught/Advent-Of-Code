const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfNumbers(',');
let info = {}; // number: { turnBefore: null, turnLastSaid: 4, timesSpoken: 1 };
let turnCount = 0;
let timesToRun = 2020;

for (let i = 0; i < data.length; i++) {
  turnCount++;
  info[data[i]] = { turnBefore: null, turnLastSaid: i + 1, timesSpoken: 1};

  if (i === data.length - 1) run2020Turns(data[i]);
}

function run2020Turns(lastSpoken) {
  while (turnCount < timesToRun) {
    let nextSpoken = info[lastSpoken].timesSpoken > 1 ? (turnCount - info[lastSpoken].turnBefore) : 0;
    turnCount++;
    
    if (info.hasOwnProperty(nextSpoken)) {
      info[nextSpoken].turnBefore = info[nextSpoken].turnLastSaid;
      info[nextSpoken].turnLastSaid = turnCount;
      info[nextSpoken].timesSpoken++;
    }
    else {
      info[nextSpoken] = { turnBefore: null, turnLastSaid: turnCount, timesSpoken: 1 };
    }

    if (turnCount === 2020) {
      console.log(`Part One Answer: ${nextSpoken}`);
    }

    lastSpoken = nextSpoken;
  }
}