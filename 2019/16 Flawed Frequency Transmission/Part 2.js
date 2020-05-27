let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
let signal = input.split("").map(Number);
const messageOffset = +input.slice(0, 7);

// Repeat signal 10000 times
for (let i = 1; i < 10000; i++) {
    for (let n = 0; n < input.length; n++) signal.push(signal[n]);
}

signal = signal.slice(messageOffset);

// run 100 phases of fft
for (let phase = 1; phase <= 100; phase++) {
    for (let i = signal.length - 1; i >= 0; i--) {
        signal[i] = Math.abs((signal[i + 1] || 0) + signal[i]) % 10;
    }
}

const eightDigitMessage = signal.slice(0, 8).join("");
console.log(`Part Two Answer: ${eightDigitMessage}`);
