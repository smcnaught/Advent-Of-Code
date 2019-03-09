let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let strArr = input.replace(/\r/g, '').split('\n');

let partOne = 0;
let getTotalCharacters = (input) => input.length;
let getCharactersInMemoryONLY = (input) => eval(input).length

strArr.forEach(str => {
    partOne += getTotalCharacters(str) - getCharactersInMemoryONLY(str);
})

console.log(`Part One Answer: ${partOne}`);