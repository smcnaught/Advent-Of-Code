const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getRaw()
  .replace(/contain no other bags.|\r|/g, '')
  .replace(/ contain /g, ",")
  .replace(/bags/g, 'bag')
  .split('\n')
  .map(e => e.split(','))

let queue = ["shiny gold"];
let bagsContainingGold = [];

while (queue.length != 0) {
  data.forEach(bags => {
    bags.forEach(b => {
      queue.forEach(q => {
        if (b.includes(q) && 
            bags[0] !== "shiny gold bag" && 
            !bagsContainingGold.includes(bags[0])) {
          bagsContainingGold.push(bags[0])
          queue.push(bags[0]);
        }
      })
    })
  })
  queue.shift();
}
console.log(`Part One Answer: ${bagsContainingGold.length}`);