const formatter = require('../../shared/formatting/format-puzzle-input');
const links = {};
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(el => {
  const sub = el.replace(/<-> |,/g, '').split(' ').map(Number);
  links[sub.shift()] = [...sub];
})

let allLinks = [0];
let neededLinks = [...links[0]];
let alreadyDone = [];
while (neededLinks.length > 0) {
  const current = neededLinks.shift();
  if (!allLinks.includes(current)) allLinks.push(current);
  links[current].forEach(link => {
    if (!neededLinks.includes(link) && !alreadyDone.includes(link)) {
      neededLinks.push(link);
      alreadyDone.push(link);
    }
  })
}
console.log(`Part One Answer: ${allLinks.length}`);