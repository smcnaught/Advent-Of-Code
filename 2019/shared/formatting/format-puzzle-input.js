let fs = require('fs');

let source = './input.txt';
// let source = './sampleInput.txt';

let exampleData = 
`
  123 456 789
  333
  hello world
  {first, second, third}
`

// type: string
// data: '123 456 789 \r\n333\r\nhello world\r\n{first, second, third}'
let entireInputIsString = fs.readFileSync(source).toString('utf-8');

// type: string
// data: '123 456 789   333  hello world  {first, second, third}'
let cleanedUpString = entireInputIsString.replace(/\r|\n/g, ' ')


// type: array of strings (each line a string)
// data: [ '123 456 789', '333', 'hello world', '{first, second, third}' ]
let arrayOfStrings = entireInputIsString.replace(/\r/g, '').split('\n');

// type: Array of Arrays - Space Separated
// data: 
// [ 
//   [ '123', '456', '789' ],
//   [ '333' ],
//   [ 'hello', 'world' ],
//   [ '{first,', 'second,', 'third}' ] 
// ]
let arrayOfArraysSpaceSeparated = entireInputIsString.replace(/\r/g, '').split('\n').map(e => e.split(' '))


// type: Array of Arrays - Comma Separated
// data: 
// [ 
//   [ '123 456 789' ],
//   [ '333' ],
//   [ 'hello world' ],
//   [ '{first', ' second', ' third}' ] 
// ]
let arrayOfArraysCommaSeparated = entireInputIsString.replace(/\r/g, '').split('\n').map(e => e.split(','));


// type: object
// data: { one: 1, two: 2 }
// !important - need to create a json file for this one
let readJsonInput = JSON.parse(fs.readFileSync('./input.json'))

// type: array of numbers
// data: [ NaN, 333, NaN, NaN ] - will put NaN when the line is not a number
let arrayOfNumbers = entireInputIsString.replace(/\r/g, '').split('\n').map(Number);


// type: array of arrays of only numbers
// data: 
// [ 
//   [ 123, 456, 789 ], 
//   [ 333 ], 
//   [], // if there are no numbers on a line, it prints an empty array
//   []
// ]
let arrayOfArraysOfNumbers = entireInputIsString.split('\n').map(str => (str.match(/-?[0-9]+/g) || []).map(Number))


// type: array of numbers - writes NaN if not a number (has to have space on the end of it to be included)
// data: [ 123, 456, 789, NaN, NaN, NaN ] ** notice there is no 333 because there was no space after 333 in the input
const arrayOfNumbersSeparatedBySpace = entireInputIsString.split(' ').map(Number);


// example of how to chain replace statements
let chainingReplaceStatementsExample = entireInputIsString.replace(/\r|Butterscotch|Cinnamon|Sprinkles|Chocolate|Candy|:|, | capacity |durability|flavor|texture|calories/g, '').split('\n').map(r => r.split(' '));


let types = [
  { name: 'entireInputIsString', data: JSON.stringify(entireInputIsString) },
  { name: 'cleanedUpString', data: JSON.stringify(cleanedUpString) },
  { name: 'arrayOfStrings', data: arrayOfStrings },
  { name: 'arrayOfArraysSpaceSeparated', data: arrayOfArraysSpaceSeparated },
  { name: 'arrayOfArraysCommaSeparated', data: arrayOfArraysCommaSeparated },
  { name: 'readJsonInput', data: readJsonInput },
  { name: 'arrayOfNumbers', data: arrayOfNumbers },
  { name: 'arrayOfArraysOfNumbers', data: arrayOfArraysOfNumbers },
  { name: 'arrayOfNumbersSeparatedBySpace', data: arrayOfNumbersSeparatedBySpace }
]
types.forEach(t => {
  console.log('\x1b[36m%s\x1b[0m', t.name);
  console.log(t.data);
  console.log("=============================================")
})