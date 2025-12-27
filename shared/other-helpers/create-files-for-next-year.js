const fs = require('fs');

const nextYear = 2025;
const yearDir = `../../${nextYear}`;
fs.mkdirSync(yearDir); // create year folder

for (let i = 1; i < 13; i++) {
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
    fs.openSync(filePaths[j], 'w'); // create files
  }
}