/**
 * Notes about graphing:
 * ---------------------
 * The coordinates for Part One will be written to "writeFile.txt". 
 * As soon as you run the program, you can open the newly created file and grab your coordinates.
 * Then you need to graph your coordinates to get the message.
 * I used this site to graph my coordinates : https://www.meta-chart.com/scatter#/data
 * Once you have them graphed, you can see the message, but it needs to be rotated & flipped.
 * Save the image from your graph, go into editor mode with paint or a similar program,
 * and rotate/flip it til your message appears.
 */

let fs = require("fs");
let text = fs.readFileSync("./input.txt", "utf-8");
let d = text.split('\n').map(str => (str.match(/-?[0-9]+/g) || []).map(Number))

function run() {
  for (let i = 0; i < 11000; i++) {
    showGraph();
    increment();
  }
}

function showGraph() {
  let minY = [...d].sort((a, b) => (a[1] < b[1]) ? -1 : 1)[0][1];
  let maxY = [...d].sort((a, b) => (a[1] > b[1]) ? -1 : 1)[0][1];
  const numY = maxY - minY + 1;

  if (numY > 10) return;

  getGraphData(d);
}

function getGraphData(d) {
  let dataForGraph = []
  d.forEach((i) => {
    dataForGraph.push(i[0], i[1])
  })

  fs.writeFile("./writeFile.txt", dataForGraph, (err) => {
    if (err) console.log(err);
    else console.log(`Part One Coordinates Written to writeFile.txt`);
  })
}

function increment() {
  d.forEach((arr) => {
    arr[0] += arr[2];
    arr[1] += arr[3];
  })
}

run();