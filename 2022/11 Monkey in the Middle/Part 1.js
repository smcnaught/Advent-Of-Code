const formatter = require('../../shared/formatting/format-puzzle-input');
let monkeys = [];
let currentMonkey = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  if (line.includes('Monkey') && !line.includes('0')) currentMonkey++;
  
  let lineItems = line.split(' ');
  if (line.includes('Starting items:')) {
    const numsOnly = line.replace(/Starting items|:|\s/g, '').split(',').map(Number);
    monkeys[currentMonkey] = { items: numsOnly, totalItemsInspected: 0 }
  }
  else if (line.includes('Operation')) monkeys[currentMonkey].operation = [lineItems[6], lineItems[7]];
  else if (line.includes('Test')) monkeys[currentMonkey].test = +lineItems[5];
  else if (line.includes('true')) monkeys[currentMonkey].passTest = +lineItems[9];
  else if (line.includes('false')) monkeys[currentMonkey].failTest = +lineItems[9];
})

function singleRound() {
  for (let i = 0; i < monkeys.length; i++) {
    let monkey = monkeys[i];
    for (let j = 0; j < monkey.items.length; j++) {
      let worryLevel = monkey.items[j];
      monkey.totalItemsInspected++;

      // run operation
      [operation, amount] = monkey.operation;
      if (amount === 'old') amount = worryLevel;
      switch (operation) {
        case '*': worryLevel *= +amount; break;
        case '+': worryLevel += +amount; break;
      }

      // monkey gets bored
      worryLevel = Math.floor(worryLevel / 3);

      // check test
      if (worryLevel % monkey.test === 0) monkeys[monkey.passTest].items.push(worryLevel);
      else monkeys[monkey.failTest].items.push(worryLevel);

    }
    monkey.items = [];
  }
}

for (let i = 0; i < 20; i++) singleRound();
let inspectedItemCount = [];
monkeys.forEach(m => inspectedItemCount.push(m.totalItemsInspected))
let sorted = inspectedItemCount.sort((a, b) => b - a);
console.log(`Part One Answer: ${sorted[0] * sorted[1]}`);