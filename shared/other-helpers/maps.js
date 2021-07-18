/**
 * Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
// const map1 = new Map();

// map1.set('a', 1);
// map1.set('b', 2);
// map1.set('c', 3);

// console.log(map1.get('a')); // expected output: 1
// console.log(map1.has('a')); // expected output: true

// Note that setting a value that already exists overwrites the original (only unique keys).
// map1.set('a', 97);
// console.log(map1.get('a')); // expected output: 97

// console.log(map1.size); // expected output: 3
// map1.delete('b');
// console.log(map1.size); // expected output: 2


// Initialize a new Map with an array of key value pairs (has to be key/value pairs).
// const map2 = new Map([
//   [1, null],
//   [2, null]
// ]);
// console.log(map2)

/**
 * Looping
 */
// for (const element of map2) {
//   const key = element[0];
//   const val = element[1];
//   console.log('here in the loop: ', key, val);
// }


/**
 * Sorting
 */
// const map3 = new Map([
//   ["test", 'bbb'],
//   ["zzz", 'aaa'],
//   ["bbb", 'zzz'],
//   ["aaa", 'ddd'],
// ])

// const mapAscByKeys = new Map([...map3.entries()].sort());
// console.log("Map sorted by keys ", mapAscByKeys)

// const twoDArr = [...map3.entries()];
// const sortedByValues = twoDArr.sort((a,b) => a[1] > b[1] ? 1 : -1);
// console.log("Map sorted by values ", sortedByValues);