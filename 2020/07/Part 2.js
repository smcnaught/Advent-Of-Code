const formatter = require('../../shared/formatting/format-puzzle-input');
const lines = new formatter.Formatter(__dirname).getRaw()
  .replace(/ contain /g, ",")
  .replace(/\.|bags|bag/g, '')
  .split('\n')
  .map(e => e.split(','))

const map = new Map();

let setMap = function () {
  lines.forEach(l => {
    const bag = l[0].trim();
  
    for (let i = 1; i < l.length; i++) {
      l[i] = l[i].trim();
      const count = (l[i].substring(0, l[i].indexOf(" ")));
      const bags = (l[i].substring(l[i].indexOf(" ") + 1, l[i].length));
  
      if (!map.has(bag)) map.set(bag, []);
      const info = { count: count && count !== 'no' ? count : 0, bag: bags.trim() };


      map.set(bag, [...map.get(bag), info]);
    }
  })
}();

let recurCountBags = (toFind) => {
  if (toFind.count == 0) return 0;
  const bagsWithin = map.get(toFind.bag);
  let count = 1;
  for (const bag of bagsWithin) count += bag.count * recurCountBags(bag);
  return count;
}

console.log(`Part Two Answer: ${recurCountBags({ count: 1, bag: 'shiny gold' }) - 1}`);