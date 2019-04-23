/**
 * ... 4598026 more items ]
Solution 1: 21367368
Solution 2: 1766400
 */

let fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf-8');
let ingredients = input.replace(/\r|Butterscotch|Cinnamon|Sprinkles|Chocolate|Candy|:|, | capacity |durability|flavor|texture|calories/g, '').split('\n').map(r => r.split(' '));

let combos = [], totalScore = [];

function allCombos(tsp)
{
  for (let i = 0; i < tsp; i++)
    for (let j = 0; j < tsp; j++)
      for (let k = 0; k < tsp; k++)
        for (let l = 0; l < tsp; l++)
          if (i + j + k + l == tsp) combos.push([i, j, k, l])
}

function calculateTotals(ing)
{
  for (let i = 0; i < combos.length; i++)
  {
    let capacity = durability = flavor = texture = calories = 0;

    for (let j = 0; j < combos[i].length; j++)
    {
      capacity += combos[i][j] * +ing[j][0];
      durability += combos[i][j] * +ing[j][1];
      flavor += combos[i][j] * +ing[j][2];
      texture += combos[i][j] * +ing[j][3];
      calories += combos[i][j] * +ing[j][4];
    }

    if (calories === 500) 
    {
      totalScore.push((Math.max(0,capacity) * Math.max(0,durability) * Math.max(0,flavor) * Math.max(0,texture)));
    }
  }
}

allCombos(100);
calculateTotals(ingredients);
console.log(`Part Two Answer: ${totalScore.sort((a, b) => b - a)[0]}`);