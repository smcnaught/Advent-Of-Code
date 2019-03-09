let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let password = input.split('');
let alphabet = [];

for (let n = 0; n < 26; n++) {
    alphabet.push(String.fromCharCode(97 + n))
}

let nextChar = (c) => String.fromCharCode(c.charCodeAt(0) + 1);

function increasePass(pass) {
    for (var i = pass.length - 1; i >= 0; i--) {
        if (pass[i] == 'z') {
            pass[i] = 'a';
        }
        else {
            pass[i] = nextChar(pass[i]);
            break;
        }
    };
}

// takes in array of new password digits
function newPassContainsStraight(newPassword) {
    for (let i = 0; i < newPassword.length; i++) {
        let currentLetter = newPassword[i];
        let secondLetter = newPassword[i + 1];
        let thirdLetter = newPassword[i + 2];

        let posInAlph = alphabet.indexOf(currentLetter);
        let secondPos = posInAlph + 1;
        let thirdPos = posInAlph + 2;

        if (currentLetter !== undefined && secondLetter !== undefined && thirdLetter !== undefined) {
            if (secondLetter === alphabet[secondPos] && thirdLetter === alphabet[thirdPos]) {
                return true;
            }
        }
    }
    return false;
}

// must NOT contain the letters i, o, l
function hasOnlyGoodLetters(newPassword) {
    let containsI = newPassword.includes("i");
    let containsO = newPassword.includes("o");
    let containsL = newPassword.includes("l");

    if (containsI || containsO || containsL) return false;
    else return true;
}

// must contain at least 2 pairs - aa & bb, yy & zz
function hasTwoPairs(newPassword) {
    let count = 0;

    for (let i = 0; i < newPassword.length; i++) {
        if (newPassword[i] === newPassword[i + 1]) {
            count++;
            i++; // to skip so a triple isn't considered two doubles
        }
    }

    return count === 2;
}

let passesAllTests = (password) => newPassContainsStraight(password) && hasOnlyGoodLetters(password) && hasTwoPairs(password);

while (!passesAllTests(password)) {
    increasePass(password);
}

console.log(`Part One Answer: ${password.join('')}`)