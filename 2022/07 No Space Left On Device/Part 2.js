const formatter = require('../../shared/formatting/format-puzzle-input');
const totalSpace = 70000000;
const requiredUnused = 30000000;
let currentDir = [];
let system = {};

new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  const newDir = line.substring(5);
  if (line.includes('$ cd')) {
    if (line.includes('..')) currentDir.pop();
    else currentDir.push(newDir);
    const fullPath = currentDir.join('/');
    if (!system.hasOwnProperty(fullPath)) system[fullPath] = { isDir: true, contains: [], size: 0 };
  }
  else if (!line.includes('$ ls')) {
    const fullPath = currentDir.join('/');
    if (line.includes('dir')) {
      const dirName = line.substring(4);
      const fullDirPath = fullPath + '/' + dirName;
      system[fullPath].contains.push(fullDirPath);
      if (!system.hasOwnProperty(fullDirPath)) system[fullDirPath] = { isDir: true, contains: [], size: 0 };
    }
    else if (/\d/.test(line)) {
      [size, fileNamePlusExt] = line.split(' ');
      const fullFilePath = fullPath + '/' + fileNamePlusExt;
      if (!system.hasOwnProperty(fullFilePath)) system[fullFilePath] = { isDir: false, contains: [], size: +size };
      if (!system[fullFilePath].tooBig) system[fullPath].contains.push(fullFilePath);
    }
  }
})

let keepGoing = true;
while (keepGoing) {
  keepGoing = false;
  Object.values(system).forEach(value => {
    let newContains = [];
    for (let i = 0; i < value.contains.length; i++) {
      const fileOrDirToCheck = value.contains[i];
      const fileOrDirSize = system[fileOrDirToCheck].size;
      if (fileOrDirSize !== 0 && system[fileOrDirToCheck].contains.length === 0) {
        value.size += fileOrDirSize;
      }
      else newContains.push(fileOrDirToCheck)
    }
    value.contains = newContains;
    if (newContains.length > 0) keepGoing = true;
  })
}

const usedSpace = system['/'].size;
const unusedSpace = totalSpace - usedSpace;
const spaceNeeded = requiredUnused - unusedSpace;

let smallestSpaceToDelete = Number.MAX_VALUE;
Object.values(system).forEach(value => {
  if (value.isDir && value.size >= spaceNeeded && value.size < smallestSpaceToDelete) smallestSpaceToDelete = value.size;
})

console.log(`Part Two Answer: ${smallestSpaceToDelete}`);