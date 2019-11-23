let linkedList = require('./linked-list');
const myList = new linkedList.LinkedList();

const values = ['one', 'two', 'three', 'four', 'five'];
values.forEach(value => myList.push(value));

/**
 * PUSH Example
 */
myList.push('six');
myList.push('seven');
// myList.push('eight');
// let resultAfterPush = myList.printList();
// console.log(`PUSH results: ${resultAfterPush}`); // 'one -> two -> three -> six -> seven -> eight'


/**
 * POP Example
 */
// myList.pop();
// myList.pop();
// let resultAfterPop = myList.printList();
// console.log(`POP results: ${resultAfterPop}`); // 'one -> two -> three'


/**
 * GET Example
 */
// let getExample = myList.get(3);
// let itemAtIndex3 = myList.get(3).value;
// console.log(`GET returns: ${JSON.stringify(getExample)}`); // {"value":"four","next":{"value":"five","next":null}}
// console.log(`GET (only value of given index) returns: ${itemAtIndex3}`); // "four"


/**
 * DELETE Example
 * **Important - remember if you want to get the value of the deleted item, you have to use .value
 */
// let valueOfIndex0 = myList.delete(0).value;
// console.log(valueOfIndex0);
// myList.delete(3);
// let resultAfterDelete = myList.printList();
// console.log(`DELETE results: ${resultAfterDelete}`); // 'one -> two -> three -> five'


/**
 * ISEMPTY Example
 */
// let isEmpty = myList.isEmpty();
// console.log(`ISEMPTY results: ${isEmpty}`);


/**
 * PRINTLIST Example
 */
// let printedList = myList.printList();
// console.log(`PRINTLIST results: ${printedList}`); // 'one -> two -> three -> four -> five'