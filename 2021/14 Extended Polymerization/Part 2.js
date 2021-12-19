const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = {}; // { 'CH': 'B' }
let template; // { 'CH': 55 }
let lastChar = "";
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(str => {
  if (!template) {
    template = {};
    let t = str.split('');
    lastChar = t[t.length - 1]
    for (let i = 0; i < t.length - 1; i++) {
      const s = t[i] + t[i+1];
      if (template.hasOwnProperty(s)) template[s]++;
      else template[s] = 1;
    }
  }
  else if (str !== '') {
    [p1, p2] = str.split(' -> ');
    instructions[p1] = p2;
    if (!template.hasOwnProperty(p1[0] + p2)) template[p1[0] + p2] = 0;
    if (!template.hasOwnProperty(p2 + p1[1])) template[p2 + p1[1]] = 0;
  }
})

function oneStep(temp) {
  const clone = JSON.parse(JSON.stringify(temp));
  Object.entries(temp).forEach(([pair, count]) => {
    if (count > 0) {
      if (instructions.hasOwnProperty(pair)) {
          [p1, p2] = [pair[0] + instructions[pair], instructions[pair] + pair[1]];
          clone[p1]+=count;
          clone[p2]+=count;
          clone[pair]-=count;
      }
    }
  })

  return clone;
}

let result;
for (let i = 0; i < 40; i++) {
  if (i === 0) result = oneStep(template);
  else result = oneStep(result);
}

let counts = {};
Object.entries(result).forEach(([pair, count]) => {
  if (count > 0) {
    if (counts.hasOwnProperty(pair[0])) counts[pair[0]] += count;
    else counts[pair[0]] = count;
  }
})

counts[lastChar]++;

const highest = counts[Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)]
const lowest = counts[Object.keys(counts).reduce((a, b) => counts[a] < counts[b] ? a : b)]
console.log(`Part Two Answer: ${highest - lowest}`);