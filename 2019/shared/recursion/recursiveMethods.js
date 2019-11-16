/**
 *  Recursion is a method of solving a problem where the solution
 *  depends on solutions to smaller instances of the same problem. 
 */

// Example one
function recur(data) {
  // console.log('here')
  data = data + 1;
  let nothing = () => recur(data);
  nothing();
}
// recur(32)


// Example two
function countdown(value) {
  if (value > 0) {
    console.log(value);
    return countdown(value - 1);
  } else {
    return value;
  }
}
// countdown(10);


// Example three
let list = [...Array(10000).keys()]; // fill array with 0 through 10,000
let start = new Date;

function nextListItem() {
  let item = list.pop();
  
  if (item) {
    console.log(item);
    
    /**
     * setTimeout prevents a stack overflow,
     * but doing it on every loop will slow things down too much, 
     * instead we do it on every 100 loops.
     */
    if (item % 100) nextListItem(); 
    else setTimeout(nextListItem, 0);
  } 
  else
  {
    console.log(`Method Took ${new Date - start} milliseconds`);
  }
}
// nextListItem();