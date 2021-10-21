const formatter = require('../../shared/formatting/format-puzzle-input');
let towers = [];
let singles = [];
let originals = [];
new formatter.Formatter(__dirname)
  .get2DArrayOfStrings(' ')
  .map((subArr) => {
    if (subArr.length > 2) {
      let children = [];

      for (let i = 3; i < subArr.length; i++) children.push({ name: subArr[i].replace(/[,]/g, ''), weight: 0 })
      towers.push({ parent: subArr[0], weight: +subArr[1].replace(/[()]/g, ''), children: children })
      originals.push(subArr[0], +subArr[1].replace(/[()]/g, ''))
    }
    else {
      const name = subArr[0].replace(/[,]/g, '');
      const weight = +subArr[1].replace(/[()]/g, '');
      singles.push(name, weight)
      originals.push(name, weight)
    }
  })

let stillNeedWeights = true;
while (stillNeedWeights) {
  stillNeedWeights = false;
  towers.forEach(tower => {
    let towerHasWeights = true;
    for (let i = 0; i < tower.children.length; i++) {
      const child = tower.children[i];
      const ind = singles.findIndex(s => s === child.name);
      if (ind !== -1) child.weight = singles[ind + 1];
      if (child.weight === 0) towerHasWeights = false;  
    }

    if (!towerHasWeights) stillNeedWeights = true;
    else {
      if (!singles.includes(tower.parent)) {
        let newSingleWeight = tower.weight;
        tower.children.forEach(child => newSingleWeight += child.weight);
        singles.push(tower.parent, newSingleWeight);
      }
    }
  })
}

let haveAnswer = false;
towers.forEach(tower => {
  let firstChild = tower.children[0];
  let secondChild = tower.children[1];
  let possibleDifferentOne = null;
  let numberDifferent = 0;
  let consistentWeight = null;
  for (let i = 1; i < tower.children.length; i++) {
    const currentChild = tower.children[i];
    if (currentChild.weight !== firstChild.weight) {
      numberDifferent++;
      possibleDifferentOne = currentChild;
    }

    if (currentChild.weight === secondChild.weight || currentChild.weight === firstChild.weight) consistentWeight = currentChild.weight;
  }

  let wrongOne = numberDifferent > 1 ? firstChild : numberDifferent === 1 ? possibleDifferentOne : null;
  if (wrongOne && !haveAnswer) {
    const adjustBy = consistentWeight - wrongOne.weight;
    const toAdjustIndex = originals.findIndex(el => el === wrongOne.name);
    let weightToAdjust = originals[toAdjustIndex + 1];
    const newWeight = weightToAdjust += adjustBy;
    haveAnswer = true;
    console.log(`Part Two Answer: ${newWeight}`);
  }
})