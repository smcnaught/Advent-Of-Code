// Example 1
function howLong() {
  let start = new Date;

  for (let i = 0; i < 15143543; i++) { /*do something*/ }
  
  let timeInMilliseconds = new Date - start;
  console.log(`howLong() took ${timeInMilliseconds} milliseconds to run`);
}
howLong();


// Example 2
function letsTimeThis() {
  let start = new Date().getTime();
  
  for (let i = 0; i < 15143543; i++) { /*do something*/ }
  
  let timeInMilliseconds = new Date().getTime() - start;
  console.log(`letsTimeThis() took ${timeInMilliseconds} milliseconds to run`);
}
letsTimeThis();