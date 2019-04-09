let fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf-8');
let happinessLevels = input.replace(/\r/g, '').replace(/ would gain/g, '').replace(/ happiness units by sitting next to/g, '').replace(/would lose /g, '-').replace(/\./g, '').split('\n').map(e => e.split(' '));

let AllHappiness = [];
let people = ['Me'];
happinessLevels.forEach(h => { if (isNaN(h[0]) && people.indexOf(h[0]) === -1) people.push(h[0]) });
let used = [], permutations = [];

let getPermutations = (guests) => {
    for (let i = 0; i < guests.length; i++) {
        let guest = guests.splice(i, 1)[0];
        used.push(guest);
        if (guests.length == 0) permutations.push(used.slice());
        getPermutations(guests);
        guests.splice(i, 0, guest);
        used.pop();
    }

    return permutations;
}

getPermutations(people).forEach(seats => {
    let happiness = 0;

    for (let i = 0; i < happinessLevels.length; i++) {
        let p1 = happinessLevels[i][0];
        let p2 = happinessLevels[i][2];

        for (let j = 0; j < seats.length; j++) {
            switch (j) {
                case 0:
                    if (seats[j] === p1 && (seats[j + 1] === p2 || seats[seats.length - 1] === p2)) happiness += +happinessLevels[i][1]
                    break;
                case seats.length - 1:
                    if (seats[j] === p1 && (seats[j - 1] === p2 || seats[0] === p2)) happiness += +happinessLevels[i][1]
                    break;
                default:
                    if (seats[j] === p1 && (seats[j + 1] === p2 || seats[j - 1] === p2)) happiness += +happinessLevels[i][1]
                    break;
            }
        }
    }

    AllHappiness.push(happiness);
})

console.log(`Part Two Answer: ${AllHappiness.sort((a, b) => a - b)[AllHappiness.length - 1]}`)