const fs = require('fs');

const nextYear = 2023;
const yearDir = `../../${nextYear}`;
fs.mkdirSync(yearDir); // create year folder

for (let i = 1; i < 26; i++) {
  const dayDir = `${yearDir}/${i}`;
  fs.mkdirSync(dayDir); // create day folder

  const filePaths = [
    `${dayDir}/Part 1.js`,
    `${dayDir}/Part 2.js`,
    `${dayDir}/instructions.txt`,
    `${dayDir}/sampleInput.txt`,
    `${dayDir}/input.txt`
  ]

  for (let j = 0; j < filePaths.length; j++) {
    if (i === 25 && j === 1) continue; // no part 2 on day 25
    fs.openSync(filePaths[j], 'w'); // create files
  }
}