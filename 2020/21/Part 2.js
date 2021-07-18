const formatter = require('../../shared/formatting/format-puzzle-input');
const allAllergens = ['dairy', 'fish', 'soy', 'wheat', 'shellfish', 'eggs', 'sesame', 'nuts']; 
let data = new formatter.Formatter(__dirname)
                        .get2DArrayOfStrings(' ')
                        .map((arr) => {
                          let ingredients = [];
                          let allergens = [];

                          for (let i = 0; i < arr.length; i++)
                          {
                            const updatedStr = arr[i].replace(/,|\(contains|\)/gi, '')
                            if (allAllergens.includes(updatedStr)) allergens.push(updatedStr);
                            else if (updatedStr !== "") ingredients.push(updatedStr)
                          }

                          return { ingredients: ingredients, allergens: allergens };
                        })

function assignAllergens()
{
  let assignedAllergens = new Map();

  // loop through all possible allergens to assign each allergen to their ingredient.
  while (assignedAllergens.size != allAllergens.length)
  {
    allAllergens.forEach(allergen => {
      let possibleIngredients = new Map();
  
      // loop through the data and check if each allergens contains the allergen we're looking for.
      data.forEach(d /** d = { ingredients: [], allergens: [] } */=> {
        // if that data set has the given allergen, 
        if (d.allergens.includes(allergen))
        {
          // if the possibilities are empty, then the possibilities should be set to that data sets ingredients (on the first one we check)
          if (possibleIngredients.size === 0) {
            d.ingredients.forEach(dataSetIng => {
              // if ingredient is not already assigned to an allergen, then add to possible
              const ingredientAlreadyAssigned = Array.from(assignedAllergens.values()).includes(dataSetIng)
              if (!ingredientAlreadyAssigned) possibleIngredients.set(dataSetIng, null)
            })
          }
          else // if the dataset doesn't have one of the possible ingredients, we move that ingredient from possible ingredients.
          {
            for (const el of possibleIngredients) {
              const ingredientName = el[0];
              if (!d.ingredients.includes(ingredientName)) possibleIngredients.delete(ingredientName)
            }
          }
        }
      })
  
      if (possibleIngredients.size === 1) assignedAllergens.set(allergen, Array.from(possibleIngredients)[0][0])
    })
  }

  return assignedAllergens;
}

function getCanonicalDangerList(assignedAllergens) {
  const mapAscByKeys = new Map([...assignedAllergens.entries()].sort());
  let canonDangerList = "";

  let ind = 0;
  for (const el of mapAscByKeys)
  {
    ind++;
    canonDangerList += el[1];
    if (ind != mapAscByKeys.size) canonDangerList += ","
  }

  return canonDangerList;
}

const assignedAllergens = assignAllergens();
const dangerousIngredientList = getCanonicalDangerList(assignedAllergens);
console.log(`Part Two Answer: ${dangerousIngredientList}`);