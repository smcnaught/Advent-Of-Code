let fs = require('fs');
let input = JSON.parse(fs.readFileSync('./input.json'))

function add(input) {
    if (!Array.isArray(input)) {
        for (key in input) {
            if (input[key] === 'red') return 0;
        }
    }

    let total = 0;
    for (key in input) {
        if (typeof input[key] === 'object') total += add(input[key]);
        else if (typeof input[key] === 'number') total += input[key];
    }

    return total;
}

console.log(`Part Two Answer: ${add(input)}`)