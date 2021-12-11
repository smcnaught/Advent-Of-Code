let outputSum = 0;
let displays = { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
const formatter = require('../../shared/formatting/format-puzzle-input');
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  let [wires, output] = line.split(' | ');
  getOutputValues(wires.split(' '), output.split(' '));
})

function getOutputValues(wires, output) {
  [lengthFives, lengthSixes] = setUniquesFivesSixes(wires);
  setSixValues(lengthSixes);
  setFiveValues(lengthFives);
  outputSum += getSingleSum(output);
}

function setUniquesFivesSixes(wires) {
  let lengthFives = [];
  let lengthSixes = [];

  for (let i = 0; i < wires.length; i++) {
    const wireSet = new Set(wires[i]);
    const len = wires[i].length;

    if (len == 2) displays[1] = wireSet;
    else if (len == 3) displays[7] = wireSet;
    else if (len == 4) displays[4] = wireSet;
    else if (len == 5) lengthFives.push(wireSet);
    else if (len == 6) lengthSixes.push(wireSet);
    else if (len == 7) displays[8] = wireSet;
  }

  return [lengthFives, lengthSixes]
}

function setSixValues(lengthSixes) {
  for (let i = 0; i < lengthSixes.length; i++) {
    const sixSet = new Set(lengthSixes[i]);
    if (isSuperset(sixSet, displays[4])) displays[9] = sixSet;
    else if (isSuperset(sixSet, displays[7])) displays[0] = sixSet;
    else displays[6] = sixSet;
  }
}

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) return false;
  }
  return true
}

function setFiveValues(lengthFives) {
  for (let i = 0; i < lengthFives.length; i++) {
    const fiveSet = new Set(lengthFives[i]);
    if (isSuperset(fiveSet, displays[7])) displays[3] = fiveSet;
    else if (countSimilarities(fiveSet, displays[4]) === 3) displays[5] = fiveSet;
    else displays[2] = fiveSet;
  }
}

function countSimilarities(set1, set2) {
  let matches = 0;
  for (const element of set1) {
    if (set2.has(element)) matches++;
  }
  return matches;
}

function getSingleSum(output) {
  let outputVal = "";
  for (let i = 0; i < output.length; i++) {
    const outputSet = new Set(output[i]);
    Object.entries(displays).forEach(([key, value], index) => {
      if (setsAreEqual(outputSet, displays[key])) {
        outputVal += index.toString();
      }
    })
  }

  return +outputVal;
}

function setsAreEqual(set1, set2) {
  const getStrSorted = set => JSON.stringify([...set].sort());
  return getStrSorted(set1) === getStrSorted(set2)
}

console.log(`Part Two Answer: ${outputSum}`);