const formatter = require('../../shared/formatting/format-puzzle-input');
let monkeys = [];
let currentMonkey = 0;
let totalForAll = 1;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  if (line.includes('Monkey') && !line.includes('0')) currentMonkey++;
  
  let lineItems = line.split(' ');
  if (line.includes('Starting items:')) {
    const numsOnly = line.replace(/Starting items|:|\s/g, '').split(',').map(Number);
    monkeys[currentMonkey] = { items: numsOnly, totalItemsInspected: 0 }
  }
  else if (line.includes('Operation')) monkeys[currentMonkey].operation = [lineItems[6], lineItems[7]];
  else if (line.includes('Test')) {
    const divBy = +lineItems[5];
    monkeys[currentMonkey].test = divBy;
    totalForAll *= divBy; // this works because all these numbers are prime
  }
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

      // keep things small
      worryLevel = worryLevel % totalForAll; // the remainer will always be unique since all are prime

      // check test
      if (worryLevel % monkey.test === 0) monkeys[monkey.passTest].items.push(worryLevel);
      else monkeys[monkey.failTest].items.push(worryLevel);

    }
    monkey.items = [];
  }
}

for (let i = 0; i < 10000; i++) singleRound();
let inspectedItemCount = [];
monkeys.forEach(m => inspectedItemCount.push(m.totalItemsInspected))
const sorted = inspectedItemCount.sort((a, b) => b - a);
console.log(`Part Two Answer: ${sorted[0] * sorted[1]}`);