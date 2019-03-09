let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let strArr = input.replace(/\r/g, '').split('\n');
let partTwo = 0;

strArr.forEach(str => {
    partTwo += JSON.stringify(str).length - str.length;
})

console.log(`Part Two Answer ${partTwo}`);