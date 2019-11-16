/**
 * Used to store an x,y coordinate as one numeric value
 * **It's much faster to loop through an array of numbers than an array of objects with x and y properties**
 */

function createComplexCoordinate() {
  return x + y * i;
}

// Have to get Y coordinate first
function getYCoordinate() {
  return Math.floor(complexCoordinate / i);
}

function getXCoordinate() {
  return complexCoordinate - (getYCoordinate() * i);
}

let x = 5;
let y = 10;
let i = 2000; // **Important: Whatever value you use for "i" has to be bigger than your largest coordinate**

let complexCoordinate = createComplexCoordinate();
let originalY = getYCoordinate();
let originalX = getXCoordinate();

console.log(`Your complex coordinate is: ${complexCoordinate}`);
console.log(`Your original value for X was: ${originalX}`);
console.log(`Your original value for Y was ${originalY}`);

