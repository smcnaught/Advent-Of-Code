/**
 * Get all possible combinations / different order possibilities of a given list of items
 * 
 * All you need to do is change the items array to your items.
 *    * If you want to check that it's actually getting all the permutations, just use the doubleCheckNumberOfPossibiltiesIsCorrect() method.
 *    * Once you call the getPermutations(items) method with your items, you can just loop through all the possibilities and do whatever you need to do.
 *    * See 2015 Day 09 for an example
 */
let items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

let all = [], used = [];

function getPermutations(items) {
  for (let i = 0; i < items.length; i++) {
    let item = items.splice(i, 1)[0];
    used.push(item);
    if (items.length == 0) all.push(used.slice());
    getPermutations(items);
    items.splice(i, 0, item);
    used.pop();
  }

  return all;
}



// Loop through all possibilities and do whatever you need to do...
// getPermutations(items).forEach(item => console.log(item));



/**
 * Use this method to make sure the amount of permutations
 * calculated is correct. It checks the method above with
 * the math calculation for how many possibilities there should be.
 */
function doubleCheckNumberOfPossibiltiesIsCorrect() {
  let numberOfPossiblePermutations = getPermutations(items).length;
  let mathDeterminedPossibilities = checkTheMath();
  
  if (numberOfPossiblePermutations === mathDeterminedPossibilities)
  {
    console.log(`The number of possible combinations of the given list of items is: ${numberOfPossiblePermutations}`);
    console.log('\x1b[32m\x1b[7m', `Success: Math equation calculated the same number of possibilities as 'getPermutations' method`);
  }
  else
  {
    console.log('\x1b[31m\x1b[7m', `ERROR: The math equation did not calculate the same number of possibilities as the 'getPermutations' method. 
      
      getPermutations() calculated: ${numberOfPossiblePermutations} possibilities.
      checkTheMath() calculated: ${mathDeterminedPossibilities} possibilities.`)
  }
  
  function checkTheMath() {
    let possibilities = 1;

    function recursivelyGetPossibilities (count) {
      if (count > 0)
      {
        possibilities *= count;
        return recursivelyGetPossibilities(count - 1);
      }
      else
      {
        return count;
      }
    }

    recursivelyGetPossibilities(items.length);
    
    return possibilities;
  }
}

doubleCheckNumberOfPossibiltiesIsCorrect(); // Comment out if you don't need this extra check