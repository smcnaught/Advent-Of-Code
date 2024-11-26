const fs = require('fs');

const nextYear = 2024;
const yearDir = `../../${nextYear}`;
fs.mkdirSync(yearDir); // create year folder

for (let i = 1; i < 26; i++) {
  const day = i < 10 ? `0${i}` : i;
  const dayDir = `${yearDir}/${day}`;
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