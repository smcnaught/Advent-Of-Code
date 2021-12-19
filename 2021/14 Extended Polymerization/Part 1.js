const formatter = require('../../shared/formatting/format-puzzle-input');
const instructions = {}; // { 'CH': 'B' }
let template;
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(str => {
  if (!template) template = str.split('');
  else if (str !== '') {
    [p1, p2] = str.split(' -> ');
    instructions[p1] = p2;
  }
})

function oneStep() {
  let updatedTemplate = [];
  for (let i = 0; i < template.length - 1; i++) {
    let str = template[i] + template[i + 1];
    if (instructions.hasOwnProperty(str)) {
      updatedTemplate.push(template[i], instructions[str])
    }
    else updatedTemplate.push(template[i], template[i + 1])
  }

  updatedTemplate.push(template[template.length - 1])
  template = JSON.parse(JSON.stringify(updatedTemplate))
}

for (let i = 0; i < 10; i++) oneStep();

const counts = {};
for (const num of template) {
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}

const highest = counts[Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)]
const lowest = counts[Object.keys(counts).reduce((a, b) => counts[a] < counts[b] ? a : b)]
console.log(`Part One Answer: ${highest - lowest}`);