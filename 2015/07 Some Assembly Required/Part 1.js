let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let commands = input.replace(/\r/g, '').split('\n');
let wiresAndValues = [];
let cachedA = [];

commands.forEach(command => {
    let c = command.replace(/AND|LSHIFT|RSHIFT|NOT|OR|->/g, '').replace(/[0-9]/g, '').split(' ').filter(Boolean)
    c.forEach(i => {
        if (wiresAndValues.indexOf(i) === -1) wiresAndValues.push(i, 0)
    })
})

let get = (wire) => isNaN(wire) ? parseInt(wiresAndValues[wiresAndValues.indexOf(wire) + 1]) : parseInt(wire);
let set = (wire, value) => wiresAndValues[wiresAndValues.indexOf(wire) + 1] = value;
let checkRun = () => {
    let newA = wiresAndValues[wiresAndValues.indexOf('a') + 1];
    if (newA != 0) cachedA.push(newA);
    if (cachedA.length === 6) cachedA.shift();

    const allEqual = cachedA.every((val, i, arr) => val === arr[0]);

    if (!allEqual || cachedA.length < 5) run();
    else console.log(`Part One Answer: ${newA}`);
}

function run() {
    commands.forEach(command => {
        let [a, b, c, d, e] = command.split(' ');
        if (command.includes("OR")) set(e, get(a) | get(c));
        else if (command.includes("RSHIFT")) set(e, get(a) >> parseInt(c));
        else if (command.includes("LSHIFT")) set(e, get(a) << parseInt(c));
        else if (command.includes("AND")) set(e, get(a) & get(c));
        else if (command.includes("NOT")) set(d, get(b) ^ 65535);
        else set(c, get(a));
    })

    checkRun();
}

run();