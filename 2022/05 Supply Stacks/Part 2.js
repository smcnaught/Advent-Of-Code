const formatter = require('../../shared/formatting/format-puzzle-input');
let instructions = [];
let stacks = [null];
new formatter.Formatter(__dirname).getArrayOfStringsByLine().reverse()
  .map(line => {
    const stackCount = line.replace(/ /g,'');
    if (line.includes('move')) instructions.unshift(line.replace(/move/, '').replace(/from|to/g, ',').split(',').map(Number))
    else if (!isNaN(stackCount)) for (let i = 0; i < stackCount[stackCount.length - 1]; i++) stacks.push([]);
    else if (line !== '') {
      const stackItems = line.replace(/[\[\]']+/g, '').replace(/\s\s\s\s\s+/g, '  ').replace(/\s\s\s\s+/g, ' ').split(' ');
      for (let i = 0; i < stackItems.length; i++) if (i + 1 <= stacks.length && stackItems[i] !== '') stacks[i + 1].push(stackItems[i])
    }
  })

for (let i = 0; i < instructions.length; i++) {
  const [moveCount, moveFrom, moveTo] = instructions[i];
  let movedItems = [];
  for (let j = 0; j < moveCount; j++) {
    const movedItem = stacks[moveFrom].pop();
    movedItems.push(movedItem);
  }
  stacks[moveTo] = [...stacks[moveTo], ...movedItems.reverse()];
}

let message = "";
for (let i = 0; i < stacks.length; i++) if (stacks[i]) message += stacks[i][stacks[i].length - 1];
console.log(`Part Two Answer: ${message}`);