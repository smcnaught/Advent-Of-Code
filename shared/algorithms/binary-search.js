/**
 * Notes on binary search:
 *   - Must be an array of numbers.
 *   - Must be sorted low to high.
 *   - Can greatly reduce the number of searches / complexity.
 *      - Binary Search: O(log n) -VS- Linear Search: O(n)
 *      - For example, if we have 4 billion elements to search through,
 *        linear search (searching through each number) will take 4 billion operations to complete. 
 *        Binary search will complete this task in just 32 operations.
 *        In real time, if one operation takes 1 ms to complete:
 *         - Binary search = 32ms 
 *         - Linear search = 4 billion ms (that is approx. 46 days).
 */
const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const searchFor = 10;
let inc = 0; // To show you how many times the loop is run.

function binarySearch(arr, toFind)
{
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high)
  {
    console.log(++inc);
    const mid = Math.floor((low + high) / 2);
    const guess = arr[mid];
    
    if (guess === toFind) return mid;
    if (guess > toFind) high = mid - 1;
    else low = mid + 1;
  }
  
  console.log(`Item not found.`);
  return null;
}

binarySearch(sortedArr, searchFor);