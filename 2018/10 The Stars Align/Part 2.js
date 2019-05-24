let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let d = text.split('\n').map(str => (str.match(/-?[0-9]+/g) || []).map(Number))

function run() {
  for (let i = 0; i < 11000; i++) {
    showGraph(i);
    increment();
  }
}

function showGraph(sec) {
  let minY = [...d].sort((a, b) => (a[1] < b[1]) ? -1 : 1)[0][1];
  let maxY = [...d].sort((a, b) => (a[1] > b[1]) ? -1 : 1)[0][1];
  const numY = maxY - minY + 1;

  if (numY > 10) return;

  console.log(`Part Two Answer: ${sec}`)
}

function increment() {
  d.forEach((arr) => {
    arr[0] += arr[2];
    arr[1] += arr[3];
  })
}

run();