// let word = 'madam';
// let word = 'nurses run';
// let word = 'Mr. Owl Ate My Metal Worm';
// let word = 'A Santa Lived As a Devil At NASA';
// let word = 'Dammit, I\'m Mad!';
let word = 'Doc, Note: I Dissent. A Fast Never Prevents A Fatness. I Diet On Cod.';
// let word = 'not a paly';


let reverseWord = word.replace(/\W/g, '').split('').reverse().join('').toLowerCase();
wordNoSpaces = word.replace(/\W/g, '').toLowerCase();

if (wordNoSpaces === reverseWord) console.log(`found palindrome!`);
else console.log(`word is not a palindrome`);