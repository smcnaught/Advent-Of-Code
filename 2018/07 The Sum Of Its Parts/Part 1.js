let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let preReqs = [];
let all = [];
let order = "";
text.replace(/\r|Step | must be finished before step | can begin./g, "").split("\n").map(setPreReqs);
let uniq = [...new Set(all)];
uniq.forEach(a => { if (preReqs.filter(r => r.step === a).length === 0) preReqs.push({ step: a, preReq: [] }) })

function setPreReqs(i) {
  all.push(i[0], i[1])
  let index = preReqs.findIndex(a => a.step === i[1]);
  if (index > -1) preReqs[index].preReq.push(i[0]);
  else preReqs.push({ step: i[1], preReq: [i[0]] });
}

function removeStepFromPreReqs(step) {
  for (let i = 0; i < preReqs.length; i++) {
    let index = preReqs[i].preReq.indexOf(step);
    if (index >= 0) preReqs[i].preReq.splice(index, 1);
  }
}

function getNextStep() {
  let next = [];
  // loop through preReqs to find step with no preReqs, if there's more than one, need alphabetical
  for (let i = 0; i < preReqs.length; i++) {
    if (preReqs[i].preReq.length == 0) next.push(preReqs[i].step);
  }

  next.sort();
  // once you find it, remove that step from all arrays of preReqs and add that step to order
  let nextStep = preReqs[preReqs.findIndex(a => a.step === next[0])].step;
  removeStepFromPreReqs(nextStep);
  order += nextStep;

  // remove step from array if it's already been used.
  preReqs = preReqs.filter(a => a.step != nextStep);
}

while (order.length < uniq.length) {
  getNextStep();
}

console.log(`Part One Answer: ${order}`);