let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let all = {};
text.replace(/\r|Step | must be finished before step | can begin./g, "").split("\n").map(setAll);
let total = 0;
let workers = Array(5).fill('');

function setAll(r) {
  const step = r[0];
  const preReq = r[1];
  all[step] = all[step] || { step: step, preReq: {}, seconds: 60 + step.charCodeAt(0) - 64 };
  all[preReq] = all[preReq] || { step: preReq, preReq: {}, seconds: 60 + preReq.charCodeAt(0) - 64 };
  all[preReq].preReq[step] = true;
}

function manageWorkers(workers) {
  workers.forEach((worker, i) => {
    if (!all[worker]) return; // Workers done with all steps
    all[worker].seconds--;

    // if that worker doesn't have time left, remove them from all
    if (!all[worker].seconds) {
      delete all[worker];
      workers[i] = '';

      // remove preReq we just completed
      Object.values(all).forEach(o => delete o.preReq[worker])
    }
  })
}

while (true) {
  // get steps with no pre-reqs
  let stepsReady = Object.values(all).filter(o => !Object.keys(o.preReq).length).sort((a, b) => a.step < b.step);
  if (!stepsReady[0]) break; // when all steps currently have preReqs, loop again
  let stepNeedsWorker = stepsReady.filter(o => !workers.includes(o.step));
  let i = 0;
  let assignedWorkers = workers.map(w => (stepNeedsWorker[i++] || {}).step);
  manageWorkers(assignedWorkers);
  total++;
}
console.log(`Part Two Answer: ${total}`);