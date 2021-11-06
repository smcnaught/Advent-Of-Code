const formatter = require('../../shared/formatting/format-puzzle-input');
const links = {};
let allPrograms = [];
let groupCount = 0;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(el => {
  const sub = el.replace(/<-> |,/g, '').split(' ').map(Number);
  sub.forEach(s => { if(!allPrograms.includes(s)) allPrograms.push(s)})
  links[sub.shift()] = [...sub];
})

function findGroup(lookFor) {
  groupCount++;
  let allLinks = [lookFor];
  let neededLinks = [...links[lookFor]];
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

  return allLinks;
}

function findNext() {
  for (let i = 0; i < allPrograms.length; i++) {
    if (!previousGroups.includes(allPrograms[i])) return allPrograms[i];
  }
}

let previousGroups = [];
function run(start) {
  const groupLinks = findGroup(start);
  previousGroups = [...previousGroups, ...groupLinks];
  const next = findNext();
  if (next) run(next);
  else console.log(`Part Two Answer: ${groupCount}`)
}

run(0);