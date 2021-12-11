/**
 * Sets automatically filter duplicates.
 */

/**
 * *** 3 different ways to create a new set ***
 */
// let set = new Set(['banana', 'apple', 'banana', 'pear', 'orange', 'pear']); // initialize with an array
// let set = new Set('aabbcc'); // initialize with a string
// let set = new Set(); // Without initializing

/**
 * *** Add elements to your set ***
 */
// set.add('hippo');
// let newElements = ['dog', 'cat', 'bird'];
// newElements.forEach(newEl => set.add(newEl));


/**
 * *** Remove elements from your set ***
 */
// set.delete('hippo');


/**
 * *** Get your set ***
 */
// console.log(`Get your set: `, set);


/**
 * *** Get your set as a string ***
 */
// console.log('Get your set as a string: ', ...set);


/**
 * *** Check length / size ***
 */
// console.log(`Get the size of your set: ${set.size}`);


/**
 * *** Check if your set contains an element ***
 */
// console.log(`Check if your set contains an element. Contains 'bird': ${set.has('bird')}`)


/**
 * *** Loop through a set ***
 */
// for (const element of set) {
//   console.log(element);
// }
// set.forEach(i => console.log(i));


/**
 * *** Clear your set ***
 */
// set.clear();


/**
 * *** Method to count similarities between sets ***
 */
// function countSimilarities(set1, set2) {
//   let matches = 0;
//   for (const element of set1) {
//     if (set2.has(element)) matches++;
//   }
//   return matches;
// }


/**
 * *** Method to check if two sets equal each other ***
 */
// function setsAreEqual(set1, set2) {
//   const getStrSorted = set => JSON.stringify([...set].sort());
//   return getStrSorted(set1) === getStrSorted(set2)
// }


/**
 * *** Method to check if one set contains another set ***
 */
// function isSuperset(set, subset) {
//   for (let elem of subset) {
//     if (!set.has(elem)) return false;
//   }
//   return true
// }