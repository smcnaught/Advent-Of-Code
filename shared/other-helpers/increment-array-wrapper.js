let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function move(currentPosition, stepsToMove) {
  return (currentPosition + stepsToMove) % arr.length;
}

let newIndex = move(0, 12);

console.log(newIndex, arr[newIndex]);