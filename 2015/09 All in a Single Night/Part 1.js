let fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");
let routeDist = input.replace(/\r/g, '').replace(/ to /g, '').replace(/ = /g, ',').split('\n').map(e => e.split(','));

input.replace(/\r/g, '').replace(/ to /g, ',').replace(/ = /g, ',').split('\n').map(e => {
    let r = e.split(',');
    let backWards = [r[1] + r[0], r[2]];
    routeDist.push(backWards);
});

let all = [], used = [], distance = [];
let allCities = ['Faerun', 'Tristram', 'Tambi', 'Norrath', 'Snowdin', 'Straylight', 'AlphaCentauri', 'Arbre'];

let getPermutations = (cities) => {
    for (let i = 0; i < cities.length; i++) {
        let city = cities.splice(i, 1)[0];
        used.push(city);
        if (cities.length == 0) all.push(used.slice());
        getPermutations(cities);
        cities.splice(i, 0, city);
        used.pop();
    }

    return all;
}

getPermutations(allCities).forEach(p => {
    let stops = [];
    for (let i = 0; i < allCities.length; i++) {
        let name;
        if (p[i + 1]) name = p[i] + p[i + 1];
        if (name) stops.push(name)
    }

    let num = 0;

    for (let i = 0; i < routeDist.length; i++) {
        let combinedRouteName = routeDist[i][0];
        for (let j = 0; j < stops.length; j++) {
            if (combinedRouteName == stops[j]) num += +routeDist[i][1];
        }
    }

    if (num !== 0) distance.push(num);
})

console.log(`Part One Answer: ${distance.sort()[0]}`);