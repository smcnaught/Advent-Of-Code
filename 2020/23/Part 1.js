let cups = "135468729";
let currentCup = cups[0];

let moves = 100;
let debugCounty = 0;

while (moves > 0)
{
  moves--;
  debugCounty++;
  console.log(`-- move ${debugCounty} --`)
  console.log(`cups: ${cups}`);

  // Each move, the crab does the following actions:
  const removedCupsArr = step1();
  const destinationCup = step2(removedCupsArr);
  step3(removedCupsArr, destinationCup);
  step4();

  console.log(`pick up: ${removedCupsArr.join('')}`)
  console.log(`destination: ${destinationCup}`)
  console.log("                                ")
}

const inHalf = cups.split('1');
console.log(`Part One Answer: ${(inHalf[1] + inHalf[0])}`)

/**
 * Step 1 in a move.
 * @returns {Array<string>} An array of the three removed cups.
 */
function step1()
{
  // The crab picks up the three cups that are immediately clockwise of the current cup.
  const removedCupsArr = getNextThree();

  // They are removed from the circle; cup spacing is adjusted as necessary to maintain the circle.
  removeCups(removedCupsArr);

  return removedCupsArr; // Must be in order they were removed in.
}

/**
 * Step 2 in a move.
 * @param {Array<string>} removedCupsArr An array of the three removed cups. 
 * @returns {string} The destination cup.
 */
function step2(removedCupsArr)
{
  const destinationCupWasJustRemoved = (destinationCup) => removedCupsArr.includes(destinationCup.toString());
  const destinationCupTooLow = (destinationCup) => destinationCup < 1 ? true : false;
  let foundDestinationCup = false;
  let destinationCup = +currentCup - 1;
  
  while (!foundDestinationCup)
  {
    // The crab selects a destination cup: the cup equal to the current cup minus one.
    // If at any point in this process the value goes below the lowest value of any cup, it wraps around to the highest value cup.
    if (destinationCupTooLow(destinationCup))
    {
      destinationCup = 9;
    }

    // If this would select one of the cups that was just picked up, the crab will keep subtracting one until it finds a cup that wasn't just picked up. 
    if (!destinationCupWasJustRemoved(destinationCup))
    {
      foundDestinationCup = true;
    }
    else
    {
      destinationCup--;
    }
  }

  return destinationCup.toString();
}

/**
 * Step 3 in a move.
 * @param {Array<string>} removedCupsArr An array of the three removed cups. 
 * @param {string} destinationCup The destination cup.
 */
function step3(removedCupsArr, destinationCup)
{
  // The crab places the cups it just picked up so that they are immediately clockwise of the destination cup. 
  // They keep the same order as when they were picked up.
  addCups(destinationCup, removedCupsArr.join(''))
}

/**
 * step 4 in a move.
 *   ***Modifies the 'currentCup'.***
 */
function step4()
{
  // The crab selects a new current cup: the cup which is immediately clockwise of the current cup.
  let looped = cups + cups;
  currentCup = looped[looped.indexOf(currentCup) + 1];
}

/**
 * Modifies 'cups' by adding the cups passed in after the cup specified.
 * @param {string} insertAfterCup The cup we want new cups added after.
 * @param {string} cupsToInsert The cups to insert (Example: "123" will insert cups 1, 2 & 3).
 */
function addCups(insertAfterCup, cupsToInsert) {
  let indexToInsert = cups.indexOf(insertAfterCup) + 1;
  cups = cups.slice(0, indexToInsert) + cupsToInsert + cups.slice(indexToInsert);
}

/**
 * Modifies 'cups' by removing the cups passed in.
 * @param {Array<string>} cupsToRemove Array of cups to remove.
 */
function removeCups(cupsToRemove) {
  cupsToRemove.forEach(cup => {
    cups = cups.replace(cup, '')
  })
}

/**
 * Gets the next three cups.
 *   ***Does NOT modify 'cups'.***
 * @returns {Array<string>} An array of the three cups following the currentCup.
 */
function getNextThree() {
  let looped = cups + cups;

  return [
    looped[cups.indexOf(currentCup) + 1],
    looped[cups.indexOf(currentCup) + 2],
    looped[cups.indexOf(currentCup) + 3]
  ]
}