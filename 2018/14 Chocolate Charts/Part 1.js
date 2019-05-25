const input = 505961; // ** YOUR PUZZLE INPUT HERE ** 
let elfOneIndex = 0; // current index
let elfTwoIndex = 1; // current index
let recipes = [3, 7];

for (let i = 0; i < 30000000; i++) {
  // get the next recipe(s)
  if (i === 0) {
    let next = (recipes[elfOneIndex] + recipes[elfTwoIndex]).toString();
    recipes.push(+next[0]); // push 1
    recipes.push(+next[1]); // push 0
  }
  else {
    // Add together the recipes of the two elves & push to recipes arr
    let next = (recipes[elfOneIndex] + recipes[elfTwoIndex]).toString();
    for (let i = 0; i < next.length; i++) {
      recipes.push(+next[i])
    }

    // Increment the elves indexes
    let elfOneMovesForward = recipes[elfOneIndex] + 1; // 3 + 1 = 4
    let elfTwoMovesForward = recipes[elfTwoIndex] + 1; // 7 + 1 = 8

    for (let i = 0; i < elfOneMovesForward; i++) {
      elfOneIndex++;
      if (recipes[elfOneIndex] == undefined) {
        elfOneIndex = 0;
      }
    }

    for (let i = 0; i < elfTwoMovesForward; i++) {
      elfTwoIndex++;
      if (recipes[elfTwoIndex] == undefined) elfTwoIndex = 0;
    }
  }
}

let nextTen = input + 10;
let answer = "";

for (let i = input; i < nextTen; i++) {
  answer += recipes[i]
}

console.log(`Part One Answer: ${answer}`);